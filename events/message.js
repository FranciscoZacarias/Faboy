/** @format */

// yes this is a big function and does 3 or 4 things that i could separate into 3 or 4 functions
// but tell me, is that really worth it? Life is about two simple things:
// Taking risks and writing bad code, and i don't ever take risks!
module.exports = async function (message) {
	// Log dm's to webhook
	if ((await message.channel.type) == "dm") {
		if (message.author.bot == true) return;
		const webhook = new this.Discord.WebhookClient(
			process.env.DM_WEBHOOK_ID,
			process.env.DM_WEBHOOK_TOKEN
		);

		const embed = new this.Discord.RichEmbed()
			.setTitle("Direct Message")
			.setDescription(`DM from <@${message.author.id}>`)
			.setThumbnail(
				`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`
			)
			.addField("Content:", message.content)
			.addField(
				`Message Author: ${message.author.username}#${message.author.discriminator}`,
				`ID:${message.author.id}\nTYPE:${message.type}`
			)
			.setTimestamp();

		return webhook.send(embed);
	}

	const msg = message_parser(message);

	if (msg.perfix != process.env.BOT_PERFIX) return;
	this.logger.log(
		`[${msg.discord_alias} in ${msg.guild_name}: ${msg.perfix} ${msg.command} ${msg.clean_message} ${msg.args}]`,
		"log"
	);

	try {
		const command_run = this.commands.find(
			(c) => c.name === msg.command || c.aliases.includes(msg.command)
		);
		if (!command_run)
			return message.channel.send(
				"Thou who do not possess the knowledge, shan't drink from my wisdom."
			);
		command_run.process(msg);
	} catch (error) {
		this.logger.log(`${error}`, "error");
	}
};

/**
 * DICT KEYS
 *
 * content
 * perfix
 * command
 * args
 * clean_message
 * discord_alias
 * discord_id
 * discord_isBot
 * guild_name
 * guild_id
 * message
 */

function message_parser(message) {
	let parsed_message = {};
	parsed_message["content"] = message.content;

	let args = message.content.toLowerCase().split(" ");
	parsed_message["perfix"] = args.shift();
	parsed_message["command"] = args.shift() || "";

	let clean_message = [];
	for (let i = 0; i < args.length; i++) {
		if (args[i][0] != "-") clean_message.push(args.splice(i--, 1));
	}

	parsed_message["args"] = args;
	parsed_message["clean_message"] = clean_message.join(" ");
	parsed_message["discord_alias"] = message.author.username;
	parsed_message["discord_id"] = message.author.id;
	parsed_message["discord_isBot"] = message.author.bot;
	parsed_message["guild_name"] = message.guild.name;
	parsed_message["guild_id"] = message.guild.id;
	parsed_message["message"] = message;

	return parsed_message;
}

function logToWebhook(content) {
	const Discord = require("discord.js");
	const webhook = new Discord.WebhookClient(
		process.env.DM_WEBHOOK_ID,
		process.env.DM_WEBHOOK_TOKEN
	);
	webhook.send(content);
}
