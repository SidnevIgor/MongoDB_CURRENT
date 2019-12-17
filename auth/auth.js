const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs'); //this is a module for decoding passwords
const jwt = require('jsonwebtoken'); //this module will allow us to generate
const config = require('config'); //we will need this to hide variables, like jwtPassword
const router = express.Router();
const {User} = require('../users/users.js');
//we add module for checking values
const Joi = require('joi');
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
  let result = validate(req.body);
  if(result.error){
    return res.status(400).send(result.error.details[0].message);
  }
  else {
    //then we validate that the user is not already regsitered
    let user = await User.findOne({
      email: req.body.email
    });
    if(!user) return res.status(400).send('Invalid email or password');
    else{
        let validPass = await bcrypt.compare(req.body.password,user.password);
        if(!validPass) return res.status(400).send('Invalid email or password');
        else{
          let token = user.generateAuthToken(); //here we generate the token for a user
          //the jwtPrivateKey is a protection key stored on the server
          res.send(token);
        }
      }
    }
  });
// example how we can change a genre
function validate(req){
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(3).max(20).required()
  };
  let result = Joi.validate(req,schema);
  return result;
}

module.exports = router;
