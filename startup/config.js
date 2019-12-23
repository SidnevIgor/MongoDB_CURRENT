const config = require('config');

module.exports = function() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    //after the error is thrown the process will be automatically terminated
  }
}
