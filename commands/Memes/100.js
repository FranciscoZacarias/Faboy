/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "100 Skill meme";
		this.aliases = ["skill"];
	}

	async run(parsed_message) {
		const module_run = this.client.getModule("drawImage");
		return module_run(parsed_message, "100", 3, 0.0);
	}
};
