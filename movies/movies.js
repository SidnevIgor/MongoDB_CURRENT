const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth.js'); //this will check if user is authorised
const adminAuth = require('../middleware/admin.js'); //allow deletion for admin only
const {genreSchema} = require('../genres/genres.js');
const {Genre} = require('../genres/genres.js');
const router = express.Router();
//we add module for checking values
const Joi = require('joi');
const movieSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    minlength:2,
    maxlength:255
  },
  genre:{
    type:genreSchema,
    required: true
  },
  numberInStock:{
    type: Number,
    required: true,
    min: 0,
    max: 10000
  },
  dailyRentalRent:{
    type: Number,
    required: true,
    min: 5,
    max: 100
  }
});
//we create a class Movie with a scheme movieSchema
const Movie = mongoose.model('Movie',movieSchema);
//different examples how we can GET all the genres or specific genre
router.get('/', async function(req,res,next){
  try{
    let movie = await Movie.find().sort('title');
    return res.send(movie);
  }
  catch (ex) {
    next(ex);
  }
});
router.get('/:id', async function(req,res,next){
  try{
    let movie = await Movie.find({_id:req.params.id});
    if(!movie){
      return res.status(404).send('The genre with such ID does not exist');
    }
    else return res.send(movie);
  }
  catch (ex) {
    next(ex);
  }
});
//example, how we can add a new genre
router.post('/', auth, async function(req,res,next){
  try{
    let result = validateMovie(req.body);
    if(result.error){
      return res.status(400).send(result.error.details[0].message);
    }
    else {
        let genre = await Genre.findById(req.body.genreId);
        if(!genre){ return res.status(400).send('Invalid genre'); }
        else{
          let movie = new Movie({
          title: req.body.title,
          genre: {
            _id: genre._id,
            name: genre.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRent: req.body.dailyRentalRent
          });
          movie = await movie.save();
          return res.send(movie);
        }
    }
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
    let movie = await Movie.findById(req.params.id);
    if(!movie){
      return res.status(404).send('The movie with such ID does not exist');
    }
    else{
      let result = validateMovie(req.body);
      if(result.error){
        return res.status(400).send(result.error.details[0].message);
      }
      else{
        let genre = await Genre.findById(req.body.genreId);
        if(!genre){ return res.status(400).send('Invalid genre'); }
        else{
          //Update the genre and return it back to the client
          movie.title = req.body.title;
          movie.genre = genre;
          movie.numberInStock = req.body.numberInStock;
          movie.dailyRentalRent = req.body.dailyRentalRent;
          movie = await movie.save();
          return res.send(movie);
        }
      }
    }
  }
  catch (ex) {
    next(ex);
  }
});
function validateMovie(Movie){
  const schema = {
    title: Joi.string().min(2).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(10000).required(),
    dailyRentalRent: Joi.number().min(5).max(100).required()
  };
  let result = Joi.validate(Movie,schema);
  return result;
}
//example how we can delete objects
router.delete('/:id',[auth,adminAuth], async function(req,res,next){
  try{
    let movie = await Movie.find({_id:req.params.id});
    if(!movie){
      return res.status(404).send('The movie with such ID does not exist');
    }
    else{
      let result = await Movie.deleteMany({_id:req.params.id});
      return res.send(result);
    }
  }
  catch (ex) {
    next(ex);
  }
});

module.exports = router;
module.exports.Movie = Movie;
