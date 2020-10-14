/** @format */

module.exports = class Job {
	constructor(name, client) {
		this.name = name;
		this.client = client;
		this.description = "Job";
		this.cron = require("node-cron");
		this.request = require("request");
	}

	job(schedule) {}

	run() {}
};
