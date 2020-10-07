/** @format */

const Command = require("../../utils/Command");
const swearjar = require("swearjar");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Sends a tweet";
		this.aliases = [];
	}

	async run(parsed_message) {
		const module_run = this.client.getModule("tweetStatus");

		let message = swearjar
			.censor(parsed_message.clean_message)
			.substring(0, 239);
		let content = `[${parsed_message.discord_alias}]: ${message}`;
		module_run(this.client, content, (error, tweet, response) => {
			if (!error) {
				parsed_message.message.react("✅");
				return parsed_message.message.channel.send(
					`https://twitter.com/faboy14438099/status/${tweet.id_str}`
				);
			} else {
				parsed_message.message.react("❌");
				return parsed_message.message.channel.send("Something went wrong!");
			}
		});
	}
};
