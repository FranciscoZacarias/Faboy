/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.public = false;
		this.description = "Sends dm to user by ID";
	}

	//TODO: check if user id is valid and confirm message sent
	async run(parsed_message) {
		return this.client.users
			.get(parsed_message.args[0].substring(1))
			.send(parsed_message.clean_message);
	}
};
