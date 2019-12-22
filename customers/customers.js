const mongoose = require('mongoose');
const auth = require('../middleware/auth.js'); //this will check if user is authorised
const adminAuth = require('../middleware/admin.js');
const express = require('express');
const router = express.Router();
//we add module for checking values
const Joi = require('joi');
const customerSchema = new mongoose.Schema({
  isGold:{
    type: Boolean,
    required: true
  },
  name:{
    type:String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  } 
});
//we create a class Customer with a scheme customerSchema
const Customer = mongoose.model('Customer',customerSchema);
//different examples how we can GET all the genres or specific genre
router.get('/', async function(req,res,next){
  try{
    let customer = await Customer.find().sort('name');
    return res.send(customer);
  }
  catch (ex) {
    next(ex);
  }
});
router.get('/:id', async function(req,res,next){
  try{
    let customer = await Customer.find({_id:req.params.id});
    if(!customer){
      return res.status(404).send('The genre with such ID does not exist');
    }
    else return res.send(customer);
  }
  catch (ex) {
    next(ex);
  }
});
//example, how we can add a new genre
router.post('/', auth, async function(req,res,next){
  try{
    let result = validateCustomer(req.body);
    if(result.error){
      return res.status(400).send(result.error.details[0].message);
    }
    let customer = new Customer({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    });
    customer = await customer.save();
    return res.send(customer);
  }
  catch (ex) {
    next(ex);
  }
});
// example how we can change a genre
router.put('/:id', auth, async function(req,res,next){
  try{
    //Look up the genre
    //If the genre doesnt exists, we return 404
    let customer = await Customer.findById(req.params.id);
    if(!customer){
      return res.status(404).send('The genre with such ID does not exist');
    }
    else{
      let result = validateCustomer(req.body);
      if(result.error){
        return res.status(400).send(result.error.details[0].message);
      }
      else{
        //Update the genre and return it back to the client
        customer.isGold = req.body.isGold;
        customer.name = req.body.name;
        customer.phone = req.body.phone;
        customer = await customer.save();
        return res.send(customer);
      }
    }
  }
  catch (ex) {
    next(ex);
  }
});
function validateCustomer(customer){
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(3).required(),
    phone: Joi.number()
  };
  let result = Joi.validate(customer,schema);
  return result;
}
//example how we can delete objects
router.delete('/:id', [auth,adminAuth], async function(req,res,next){
  try{
    let customer = await Customer.find({_id:req.params.id});
    if(!customer){
      return res.status(404).send('The genre with such ID does not exist');
    }
    else{
      let result = await Customer.deleteMany({_id:req.params.id});
      return res.send(result);
    }
  }
  catch (ex) {
    next(ex);
  }
});

module.exports = router;
module.exports.Customer = Customer;
