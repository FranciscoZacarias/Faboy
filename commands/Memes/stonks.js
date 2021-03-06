/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Meme man speaks";
		this.aliases = ["stonk", "mememan"];
	}

	async run(parsed_message) {
		const module_run = this.client.getModule("drawImage");
		return module_run(parsed_message, "stonks", 3, 0.8, 2);
	}
};
