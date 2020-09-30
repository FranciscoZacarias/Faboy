/** @format */

const activities = require("../activity.json");

module.exports = function () {
	this.logger.log(`Logged in as ${this.user.tag}`, "ready");
};
