/** @format */

module.exports = class Command {
	constructor(name, client, locale) {
		this.name = name;
		this.client = client;
		this.locale = locale;
		this.description = "Command";
		this.public = true;
		this.aliases = [];
	}

	process(parsed_message) {
		if (parsed_message.discord_id == process.env.BOT_ADMIN || this.public)
			return this.run(parsed_message);
	}

	run() {}
};
