/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Retweets a tweet";
		this.aliases = [];
	}

	async run(parsed_message) {
		let rt = parsed_message.clean_message;
		if (validURL(parsed_message.clean_message)) {
			rt = rt.substring(rt.lastIndexOf("/") + 1);
		} else {
			return parsed_message.message.channel.send(
				"Invalid tweeet. Please provide a valid tweet link"
			);
		}

		console.log(rt);

		this.client.twitterClient.post(`statuses/retweet/${rt}`, function (
			error,
			tweet,
			response
		) {
			if (!error) {
				return parsed_message.message.react("✅");
			} else {
				parsed_message.message.react("❌");
				return parsed_message.message.channel.send("Something went wrong!");
			}
		});
	}
};

function validURL(str) {
	var pattern = new RegExp(
		"^(https?:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	); // fragment locator
	return !!pattern.test(str);
}
