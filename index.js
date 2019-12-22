//we connect to a database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/genres',{
  bufferMaxEntries: 0,
  bufferCommands: false
})
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.error('Could not connect to MongoDB...',err));

const express = require('express');
const app = express();
const router = express.Router();

//we create a custom middleware function that will be added to the processing pipeline
const logger = require('./middleware/logger.js');
const genres = require('./genres/genres.js');
const customers = require('./customers/customers.js');
const movies = require('./movies/movies.js');
const rentals = require('./rentals/rentals.js');
const users = require('./users/users.js');
const auth = require('./auth/auth.js');
const error = require('./middleware/error.js');
//enable JSON parsing option
app.use(express.json());
//app.use(logger);
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals)
app.use('/api/users',users);
app.use('/api/auth',auth);
//we create a middleware function for checking the database accessibility
app.use(error);

//we connect to a database


//we add the configuration of the program
const config = require('config');
if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey value is not defined');
  process.exit(1);
}
//we add 2 validation packages: Joi and Joi-id to validate the schema of created object
//we add module for checking values
const Joi = require('joi');
//we add a module for checking IDs. This is an extension for Joi
Joi.objectId = require('joi-objectid')(Joi);

const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on port '+port);
});
