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

	job(self) {
		console.log("method not overridden");
	}

	createTweet(content) {
		return `[${this.description}]: ${content}`;
	}

	run() {
		var self = this;
		this.cron.schedule(this.schedule, function () {
			self.job(self);
		});
	}
};
