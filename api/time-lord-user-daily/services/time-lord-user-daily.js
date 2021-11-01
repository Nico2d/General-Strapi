"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async getDaily(date, userId) {
    return strapi
      .query("time-lord-user-daily")
      .findOne({ date: date, user: userId });
  },
};
