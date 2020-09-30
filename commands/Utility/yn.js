/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Yes or no";
		this.aliases = ["yesno", "bool", "isittrue"];
	}

	async run(parsed_message) {
		return parsed_message.message.channel.send(
			Math.random() < 0.5 ? "yes" : "no"
		);
	}
};
