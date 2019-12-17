const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const genres = require('./genres/genres.js');
const customers = require('./customers/customers.js');
const movies = require('./movies/movies.js');
const rentals = require('./rentals/rentals.js');
const users = require('./users/users.js');
const auth = require('./auth/auth.js');
//we create a custom middleware function that will be added to the processing pipeline
const logger = require('./middleware/logger.js');
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

//we connect to a database
mongoose.connect('mongodb://localhost/genres')
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.error('Could not connect to MongoDB...',err));
//we create a schema for a future class

// we add a custom middleware for logging entries
app.use(logger);
//enable JSON parsing option
app.use(express.json());
//we add joi module for an easy validation
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on port '+port);
});
