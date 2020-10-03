/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.public = false;
		this.description = "Shows every guild Faboy is in";
	}

	async run(parsed_message) {
		let message = "";
		this.client.guilds.forEach((guild) => {
			message += `${guild.id} ${guild.name}\n`;
		});
		return parsed_message.message.channel.send(message);
	}
};
