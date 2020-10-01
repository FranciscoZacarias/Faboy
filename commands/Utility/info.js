/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Bot Information";
		this.aliases = [
			"src",
			"code",
			"git",
			"github",
			"js",
			"info",
			"source",
			"repository",
		];
	}

	async run(parsed_message) {
		return parsed_message.message.channel.send(
			"https://github.com/FranciscoZacarias/Faboy"
		);
	}
};
