/** @format */

var job = require("../utils/Job");

module.exports = class extends Job {
	constructor(name, client) {
		super(name, client);
		this.description = "Dad Joke";
		this.schedule = "0 0 */6 * * *";
	}

	job() {
		const options = {
			method: "GET",
			url: "https://joke3.p.rapidapi.com/v1/joke",
			headers: {
				"x-rapidapi-host": "joke3.p.rapidapi.com",
				"x-rapidapi-key": process.env.DAD_JOKE_KEY,
				useQueryString: true,
			},
		};

		this.request(options, function (error, response, body) {
			if (error) throw new Error(error);

			let joke = this.createTweet(`${JSON.parse(body).content}`);
			let module_run = client.getModule("tweetStatus");

			module_run(client, joke, (error, tweet, response) => {
				if (!error) client.logger.log("tweet sent!", "log");
				else client.logger.log("tweet not sent!", "error");
			});
		});
	}
};
