"use strict";
const { isDraft } = require("strapi-utils").contentTypes;
const moment = require("moment");

module.exports = {
  async updateTaskAndUserDaily(params, data) {
    const { taskId, userId } = params;

    const existingEntry = await strapi
      .query("time-lord-task")
      .findOne({ id: taskId });

    const validData = await strapi.entityValidator.validateEntityUpdate(
      strapi.models["time-lord-task"],
      data,
      { isDraft: isDraft(existingEntry, strapi.models["time-lord-task"]) }
    );

    let daily = await strapi
      .query("time-lord-user-daily")
      .findOne({ date: new Date(), user: userId });

    const oldTime = moment(existingEntry.time, "hh:mm:ss");
    const newTime = moment(data.time, "hh:mm:ss");
    const taskTime = moment.duration(newTime.diff(oldTime)).asSeconds();

    if (!daily) {
      strapi.services["time-lord-user-daily"].create({
        date: moment().format(),
        dailyTimer: taskTime,
        user: userId,
      });
    } else {
      strapi.services["time-lord-user-daily"].update(
        { id: daily.id },
        { dailyTimer: daily.dailyTimer + taskTime }
      );
    }

    const entry = await strapi
      .query("time-lord-task")
      .update({ id: taskId }, validData);

    return entry;
  },
};
