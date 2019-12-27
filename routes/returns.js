const {Rental} = require('../models/rental');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/',auth, async (req, res) => {
  if(!req.body.customerId) return res.status(400).send('The customerId is not defined');
  if(!req.body.movieId) return res.status(400).send('The movieId is not defined');
  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId
  });
  if(!rental) return res.status(404).send('There is no rental with such MovieId and CustomerId combination');

  if(rental.dateReturned) return res.status(400).send('The chosen rental was already processed');

  return res.status(200).send();
});

module.exports = router;
