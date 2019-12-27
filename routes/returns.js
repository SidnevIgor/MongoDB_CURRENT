const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const moment = require('moment');
const Joi = require('joi');

router.post('/',auth, async (req, res) => {
  const { error } = validateReturn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rental = await Rental.lookup(req.body.customerId,req.body.movieId); //this is a static method (available on the class level) added in the rental.js
  if(!rental) return res.status(404).send('There is no rental with such MovieId and CustomerId combination');

  if(rental.dateReturned) return res.status(400).send('The chosen rental was already processed');
  rental.return(); //this is an instance method (related to the specific object)
  await rental.save();
  await Movie.update({
    _id: rental.movie._id
  },
  {
    $inc:{numberInStock: 1}
  });


  return res.status(200).send(rental);
});
function validateReturn(req){
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(req, schema);
}

module.exports = router;
