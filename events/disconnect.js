module.exports = function () 
{
    logger.warn(`Disconnected with code ${event.code}.`);
	process.exit(0);
}