"use strict";

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async updateTaskAndUserDaily(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services[
      "time-lord-task"
    ].updateTaskAndUserDaily(
      { taskId: id, userId: ctx.state.user.id },
      //   { taskId: id },
      ctx.request.body
    );

    return sanitizeEntity(entity, { model: strapi.models["time-lord-task"] });
  },
};
