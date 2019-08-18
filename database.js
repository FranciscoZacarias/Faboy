require('dotenv').config();
const logger = require('./utils/Logger');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB,{ useNewUrlParser: true }, (err) => 
{
	if(err)
	{
		logger.log(`Error connecting to DB:\n${err}`, 'error');
	}
});
mongoose.connection.on('connected', () => 
{
    logger.log('Connected to database', 'ready');
});

mongoose.connection.on('disconnected', () => 
{
    logger.log('Disconnected from database', 'warn');
});

mongoose.connection.on('error', (err) =>
{
    logger.log('Error: ' + err, 'error');
});

process.on('SIGINT', function() 
{  
 	mongoose.connection.close( () =>
 	{ 
    	logger.log('Mongoose default connection disconnected through app termination', 'warn');
    	process.exit(0); 
  	}); 
}); 

mongoose.Promise = global.Promise;
