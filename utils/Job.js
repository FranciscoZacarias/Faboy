/** @format */

module.exports = class Job {
	constructor(name, client) {
		this.name = name;
		this.client = client;
		this.description = "Job";
		this.schedule = "0 0 * * * *";
		this.cron = require("node-cron");
		this.request = require("request");
		this.self = this;
	}

	job() {
		console.log("function not overriden");
	}

	createTweet(content) {
		return `[${this.description}]: ${content}`;
	}

	run() {
		var method = this.self.job;
		this.cron.schedule(this.schedule, function () {
			method();
		});
	}
};
