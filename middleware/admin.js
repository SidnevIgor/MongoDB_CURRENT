function adminAuth(req,res,next){
  if(!req.user.isAdmin) return res.status(403).send('Access denied');
  else{
    next();
  }
}
module.exports = adminAuth;
