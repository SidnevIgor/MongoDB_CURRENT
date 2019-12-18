const mongoose = require('mongoose');
const auth = require('../middleware/auth.js'); //this will check if user is authorised
const express = require('express');
const router = express.Router();
//we add module for checking values
const Joi = require('joi');
const genreSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  }
});
//we create a class Genre with a scheme genreSchema
const Genre = mongoose.model('Genre',genreSchema);

//different examples how we can GET all the genres or specific genre
router.get('/', async function(req,res){
  let genres = await Genre.find().sort('name');
  return res.send(genres);
});
router.get('/:id',async function(req,res){
  let genre = await Genre.find({_id:req.params.id});
  if(!genre){
    return res.status(404).send('The genre with such ID does not exist');
  }
  else return res.send(genre);
});
//example, how we can add a new genre
router.post('/',auth, async function(req,res){
  let result = validateGenre(req.body);
  if(result.error){
    return res.status(400).send(result.error.details[0].message);
  }
  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  return res.send(genre);
});
// example how we can change a genre
router.put('/:id',auth, async function(req,res){
  //Look up the genre
  //If the genre doesnt exists, we return 404
  let genre = await Genre.findById(req.params.id);
  if(!genre){
    return res.status(404).send('The genre with such ID does not exist');
  }
  else{
    let result = validateGenre(req.body);
    if(result.error){
      return res.status(400).send(result.error.details[0].message);
    }
    else{
      //Update the genre and return it back to the client
      genre.name = req.body.name;
      genre = await genre.save();
      return res.send(genre);
    }
  }
});
function validateGenre(genre){
  const schema = {
    name: Joi.string().min(3).required()
  };
  let result = Joi.validate(genre,schema);
  return result;
}
//example how we can delete objects
router.delete('/:id', auth, async function(req,res){
  let genre = await Genre.find({_id:req.params.id});
  if(!genre){
    return res.status(404).send('The genre with such ID does not exist');
  }
  else{
    let result = await Genre.deleteMany({_id:req.params.id});
    return res.send(result);
  }
});

module.exports = router;
module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
