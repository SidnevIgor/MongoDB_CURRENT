const winston = require('winston');

module.exports = function(err, req, res, next){
  winston.error(err.message, err);
 //winston can log the following levels of errors
  // error
  // warn
  // info
  // verbose
  // debug
  // silly
//winston can send the error message to the console, separate file or Database
  res.status(500).send('The connection to the database has been disrupted.');
}
