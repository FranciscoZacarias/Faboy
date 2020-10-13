/** @format */

var request = require("request");
var cron = require("node-cron");

module.exports = function (client) {
	cron.schedule("0 0 */8 * * *", function () {
		var joke;
		var options = {
			method: "GET",
			url: "https://joke3.p.rapidapi.com/v1/joke",
			headers: {
				"x-rapidapi-host": "joke3.p.rapidapi.com",
				"x-rapidapi-key": process.env.DAD_JOKE_KEY,
				useQueryString: true,
			},
		};

		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			joke = "[Dad Joke]:" + JSON.parse(body).content;
			let module_run = client.getModule("tweetStatus");
			module_run(client, joke, (error, tweet, response) => {
				if (!error) client.logger.log("tweet sent!", "log");
				else client.logger.log("tweet not sent!", "error");
			});
		});
	});
};
