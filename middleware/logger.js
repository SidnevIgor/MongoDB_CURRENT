function log(req,res,next){
  console.log('Getting request');
  next(); //we move the control to the next middleware function
}
module.exports=log;
