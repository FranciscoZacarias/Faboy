/** @format */

const swearjar = require("swearjar");
const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Sends a tweet";
		this.aliases = [];
	}

	async run(parsed_message) {
		let message = swearjar.censor(parsed_message.clean_message);

		this.client.twitterClient.post(
			"statuses/update",
			{
				status: `[${parsed_message.discord_alias}]: ${message}`,
			},
			function (error, tweet, response) {
				if (!error) {
					console.log(tweet);
					parsed_message.message.react("✅");
					return parsed_message.message.channel.send(
						`https://twitter.com/faboy14438099/status/${tweet.id_str}`
					);
				} else {
					parsed_message.message.react("❌");
					return parsed_message.message.channel.send("Something went wrong!");
				}
			}
		);
	}
};
