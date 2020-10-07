/** @format */

module.exports = function tweetStatus(client, content, callback) {
	client.twitterClient.post(
		"statuses/update",
		{
			status: content,
		},
		function (error, tweet, response) {
			callback(error, tweet, response);
		}
	);
};
