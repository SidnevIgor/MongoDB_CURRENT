const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next){
  let token = req.header('x-auth-token'); //we check if the user is authorised
  if(!token) return res.status(401).send('Access denied, provide token');
  else{
    try{
      let decoded = jwt.verify(token,config.get('jwtPrivateKey'));
      req.user = decoded;
      next();
    }
    catch (ex){
      res.status(400).send('Invalid token');
    }
  }
}
module.exports = auth;
