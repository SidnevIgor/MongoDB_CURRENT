const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth.js'); //this will check if user is authorised
const jwt = require('jsonwebtoken'); //this module will allow us to generate
const config = require('config'); //we will need this to hide variables, like jwtPassword
const bcrypt = require('bcryptjs'); //this is a module for decoding passwords
const router = express.Router();
//we add module for checking values
const Joi = require('joi');
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength:2,
    maxlength:50
  },
  email:{
    type:String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024
  },
  isAdmin: Boolean
});
userSchema.methods.generateAuthToken = function(){
  //now lets set what fields will be inside web token and mix it based on private key
  let token = jwt.sign({_id:this._id, isAdmin:this.isAdmin}, config.get('jwtPrivateKey'));
  return token;
};
//we create a class User with a scheme userSchema
const User = mongoose.model('User',userSchema);
//we add a function for generating authentication token for a users

router.get('/me',auth, async function(req,res){
  let user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
//different examples how we can GET all the genres or specific genre
router.get('/', async function(req,res){
  let user = await User.find().sort('name');
  return res.send(user);
});
router.get('/:id', async function(req,res){
  let user = await User.find({_id:req.params.id});
  if(!user){
    return res.status(404).send('The user with such ID does not exist');
  }
  else return res.send(user);
});
//example, how we can add a new genre
router.post('/', async function(req,res){
//we validate the schema
  let result = validateUser(req.body);
  if(result.error){
    return res.status(400).send(result.error.details[0].message);
  }
  else {
    //then we validate that the user is not already regsitered
    let user = await User.findOne({
      email: req.body.email
    });
    if(user) return res.status(400).send('The user with such email is already registered');
    else{
        user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await genPass(req.body.password),
        isAdmin: req.body.isAdmin
        });
        user = await user.save();
        let token = user.generateAuthToken(); //here we generate the token for a user
        return res.header('x-auth-token',token).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        });
      }
    }
  });
// example how we can change a genre
function validateUser(user){
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(3).max(20).required(),
    isAdmin: Joi.boolean()
  };
  let result = Joi.validate(user,schema);
  return result;
}
async function genPass(initPass){
  //salt is a string we add to the real password to mix things up
  let salt = await bcrypt.genSalt(10);
  //then we generate the hashed version of the password
  let hashed = await bcrypt.hash(initPass,salt);
  return hashed;
}

module.exports = router;
module.exports.User = User;
module.exports.validate = validateUser;
