/** @format */

var Job = require("../utils/Job");

module.exports = class extends Job {
	constructor(name, client) {
		super(name, client);
		this.description = "Number Fact";
		this.schedule = "0 0 */4 * * *";
	}

	job(self) {
		const client = self.client;

		const options = {
			method: "GET",
			url: "https://rapidapi.p.rapidapi.com/random/trivia",
			qs: { fragment: "true", json: "true" },
			headers: {
				"x-rapidapi-host": "numbersapi.p.rapidapi.com",
				"x-rapidapi-key": process.env.NUMBER_FACT_KEY,
				useQueryString: true,
			},
		};

		self.request(options, function (error, response, body) {
			if (error) throw new Error(error);

			let jsonres = JSON.parse(body);
			let fact = self.createTweet(`${jsonres.number} - ${jsonres.text}`);
			let module_run = client.getModule("tweetStatus");

			module_run(client, fact, (error, tweet, response) => {});
		});
	}
};
