/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.public = false;
		this.description = "Sends dm to user by ID";
	}

	async run(parsed_message) {
		let user = this.client.users.get(parsed_message.args[0].substring(1));
		if (!user) return parsed_message.message.channel.send("Bad user ID");
		return user.send(parsed_message.clean_message);
	}
};
