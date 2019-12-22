function error(err,req,res,next){
  res.status(500).send('The server is not accessible at the moment');
}
module.exports = error;
