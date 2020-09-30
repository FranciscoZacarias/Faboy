/** @format */

require("dotenv").config();

const Faboy = require("./Faboy"),
	client = new Faboy({
		autoReconnect: true,
		messageCacheMaxSize: 2024,
		fetchAllMembers: true,
		messageCacheLifetime: 1680,
		disableEveryone: false,
		messageSweepInterval: 1680,
	});

client.login(process.env.BOT_TOKEN);
