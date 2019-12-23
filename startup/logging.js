const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: 'logfile.log' }); //we write error in the log file
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly',
    level: 'error'
  }); //we write errors in the database
}
