/** @format */

var request = require("request");
var cron = require("node-cron");

module.exports = function (client) {
	cron.schedule("0 0 */4 * * *", function () {
		var fact;
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

		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			let jsonres = JSON.parse(body);
			fact = `[Daily Number Fact] ${jsonres.number}:` + jsonres.text;
			let module_run = client.getModule("tweetStatus");

			module_run(client, fact, (error, tweet, response) => {
				if (!error) client.logger.log("tweet sent!", "log");
				else client.logger.log("tweet not sent!", "error");
			});
		});
	});
};
