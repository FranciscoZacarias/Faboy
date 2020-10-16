/** @format */

var Job = require("../utils/Job");

module.exports = class extends Job {
	constructor(name, client) {
		super(name, client);
		this.description = "Dad Joke";
		this.schedule = "0 0 */6 * * *";
	}

	job(self) {
		const client = self.client;

		const options = {
			method: "GET",
			url: "https://joke3.p.rapidapi.com/v1/joke",
			headers: {
				"x-rapidapi-host": "joke3.p.rapidapi.com",
				"x-rapidapi-key": process.env.DAD_JOKE_KEY,
				useQueryString: true,
			},
		};

		self.request(options, function (error, response, body) {
			if (error) throw new Error(error);

			let joke = self.createTweet(`${JSON.parse(body).content}`);
			let module_run = client.getModule("tweetStatus");

			module_run(client, joke, (error, tweet, response) => {});
		});
	}
};
