/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "100 Skill meme";
		this.aliases = ["skill"];
	}

	async run(parsed_message) {
		this.client.runImageDraw(parsed_message, "100", 6, 0.0);
	}
};
