const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); //this will check if user is authorised
const {Customer} = require('../customers/customers.js');
const {Movie} = require('../movies/movies.js');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
  customer:{
    type: new mongoose.Schema({
      name:{
        type:String,
        required: true,
        minlength:2,
        maxlength:255
      },
      phone:{
        type: Number,
        required: true,
        min: 5,
        max: 99999999
      }
    }),
    required: true
  },
  movie:{
  type: new mongoose.Schema({
    title:{
      type: String,
      required: true,
      minlength:2,
      maxlength:255
    },
    dailyRentalRent:{
      type: Number,
      required: true,
      min: 5,
      max: 100
    }
  }),
  required: true
},
dateOut:{
  type: Date,
  required: true,
  default: Date.now
},
dateReturned:{
  type: Date
},
rentalFee:{
  type: Number,
  min: 0
}
});
//we create a class Rental with a scheme rentalSchema
const Rental = mongoose.model('Rental',rentalSchema);

//different examples how we can GET all the Rentals or specific Rental
router.get('/', async function(req,res,next){
  try{
    let rentals = await Rental.find().sort('customer');
    return res.send(rentals);
  }
  catch (ex) {
    next(ex);
  }
});
router.get('/:id',async function(req,res,next){
  try{
    let rental = await Rental.find({_id:req.params.id});
    if(!rental){
      return res.status(404).send('The Rental with such ID does not exist');
    }
    else return res.send(rental);
  }
  catch (ex) {
    next(ex);
  }
});
//example, how we can add a new Rental
router.post('/',auth, async function(req,res,next){
  try{
    let result = validateRental(req.body);
    if(result.error){
      return res.status(400).send(result.error.details[0].message);
    }
    else{
      let customer = await Customer.findById(req.body.customerId);
      if(!customer) {return res.status(404).send('There is no customer with sich ID');}
      else{
        let movie = await Movie.findById(req.body.movieId);
        if(!movie){return res.status(404).send('There is no movie with such ID');}
        else{
          let rental = new Rental({
            customer:{
              _id: customer._id,
              name: customer.name,
              phone: customer.phone
            },
            movie:{
              _id: movie._id,
              title: movie.title,
              dailyRentalRent: movie.dailyRentalRent
            }
          });
          rental = await rental.save();
          movie.numberInStock--;
          movie.save();
          return res.send(rental);
        }
      }
    }
  }
  catch (ex) {
    next(ex);
  }
});
function validateRental(rental){
  const schema = {
    //here we use an extension of Joi - objectId
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  let result = Joi.validate(rental,schema);
  return result;
}

module.exports = router;
