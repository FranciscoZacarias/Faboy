/** @format */

var Job = require("../utils/Job");

module.exports = class extends Job {
	constructor(name, client) {
		super(name, client);
		this.description = "Dad Joke";
		this.schedule = "5 * * * * *";
	}

	job() {
		console.log("1234");
	}
};
