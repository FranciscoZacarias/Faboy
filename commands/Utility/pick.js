/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Pick comma separated values";
		this.aliases = ["choose"];
	}

	async run(parsed_message) {
		return parsed_message.message.channel.send(
			arr[Math.floor(Math.random() * arr.length)]
		);
	}
};
