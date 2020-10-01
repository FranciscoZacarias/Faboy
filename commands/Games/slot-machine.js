/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "3-Fruits Machine";
		this.alias = ["slot", "gamble", "jackpot"];
	}

	async run(parsed_message) {
		const react_array = ["🍉", "🍓", "🍆"];

		let msg = "";
		for (let i = 0; i < 3; i++) {
			msg += " " + react_array[Math.floor(Math.random() * react_array.length)];
		}
		parsed_message.message.channel.send(msg).then(async (msg_send) => {
			let content = msg_send.content.split(" ");

			let stack = [];
			await content.forEach((emoji, index) => {
				if (stack.length == 0) {
					stack.push(emoji);
				} else {
					if (stack[index - 1] != emoji) {
						return parsed_message.message.react("💢");
					} else if (index == react_array.length - 1) {
						return parsed_message.message.react("🏆");
					}
					stack.push(emoji);
				}
			});
		});
	}
};
