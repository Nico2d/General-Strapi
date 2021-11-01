"use strict";
const { sanitizeEntity } = require("strapi-utils");
const moment = require("moment");

module.exports = {
  async findOneByDate(ctx) {
    const { date } = ctx.params;
    const today = moment().format("YYYY-MM-DD");

    let entity = await strapi.services["time-lord-user-daily"].getDaily(
      date ?? today,
      ctx.state.user.id
    );

    if (!entity) {
      entity = { date: date ?? today, dailyTimer: 0, user: ctx.state.user };
    }

    return sanitizeEntity(entity, {
      model: strapi.models["time-lord-user-daily"],
    });
  },
};
