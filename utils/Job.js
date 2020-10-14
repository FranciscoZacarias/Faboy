/** @format */

module.exports = class Job {
	constructor(name, client) {
		this.name = name;
		this.client = client;
		this.description = "Job";
		this.schedule = "0 0 * * * *";
		this.cron = require("node-cron");
		this.request = require("request");
	}

	job() {}

	createTweet(content) {
		return `[${this.description}]: ${content}`;
	}

	run() {
		this.cron.schedule(this.schedule, function () {
			job();
		});
	}
};
