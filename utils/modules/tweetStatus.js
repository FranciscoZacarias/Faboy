/** @format */

module.exports = function tweetStatus(client, content, callback) {
	client.twitterClient.post(
		"statuses/update",
		{
			status: content,
		},
		function (error, tweet, response) {
			if (!error) client.logger.log("tweet sent!", "log");
			else client.logger.log("tweet not sent!  " + error, "error");
			callback(error, tweet, response);
		}
	);
};
