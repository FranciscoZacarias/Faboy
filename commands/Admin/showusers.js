/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.public = false;
		this.description = "Shows every user that shares a server with Faboy";
	}

	async run(parsed_message) {
		let message = "";
		this.client.users.forEach((user) => {
			if (!user.bot)
				message += `<@${user.id}> ${user.username}#${user.discriminator}\n`;
		});
		return parsed_message.message.channel.send(message);
	}
};
