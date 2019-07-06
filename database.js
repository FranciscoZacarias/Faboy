require('dotenv').config();
const logger = require('./utils/Logger');
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@faboy-7astz.azure.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

mongoose.connect(uri,{ useNewUrlParser: true });
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
