/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "lmao";
		this.aliases = ["?", "commands", "911"];
	}

	async run(parsed_message) {
		const showPrivateCommands =
			parsed_message.args.includes("-all") &&
			parsed_message.discord_id == process.env.BOT_ADMIN
				? true
				: false;

		let command_str = "";
		this.client.commands.forEach((cmd) => {
			if (cmd.public || showPrivateCommands)
				command_str +=
					(!cmd.public ? "**ADMIN** " : "") +
					`**${cmd.name}**: ${cmd.description}` +
					"\n";
		});
		const embed = new this.client.Discord.RichEmbed()
			.setTitle("Helper")
			.setDescription("faboy <command> <arguments>")
			.setColor("#0000FF")
			.addField("Commands", command_str);
		return parsed_message.message.channel.send(embed);
	}
};
