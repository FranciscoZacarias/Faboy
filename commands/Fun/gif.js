/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Show Gif";
		this.aliases = ["tenor"];
	}

	async run(parsed_message) {
		const url = `https://api.tenor.com/v1/search?tag="${parsed_message.clean_message}&key=${process.env.TENOR_API_KEY}`;
		return this.client.fetch(url).then((response) => {
			response.json().then((data) => {
				let response;
				if (data.results[Math.floor(Math.random() * data.results.length)].url) {
					response = data.results[0].url;
				} else {
					resposne = "Gif Not Found!";
				}
				parsed_message.message.channel.send(response);
			});
		});
	}
};
