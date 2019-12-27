const request = require('supertest'); //here we add a linrary to build http requests
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');
const mongoose = require('mongoose');
let server;

describe('api/genres', function(){
  beforeEach(function(){
    server = require('../../index.js');
  });
  afterEach(async function(){
    await server.close();
    await Genre.remove({});
  });
  describe('GET', function(){
    it('Should return all genres', async function(){
      await Genre.collection.insertMany([
        {name:"romance"},
        {name:"horror"}
      ]);
      const res = await request(server).get('/api/genres'); //we replace the request normally done through Postman
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(val=>val.name==="romance")).toBeTruthy();
    });
  });
  describe('GET_by_id', function(){
    it('Should return a specific genre', async function(){
      const genre = new Genre({
        name: "specific"
      });
      await genre.save();
      const res = await request(server).get('/api/genres/'+genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name',genre.name);
    });
    it('Should return 404', async function(){
      const res = await request(server).get('/api/genres/1234');
      expect(res.status).toBe(404);
    });
  });
  describe('POST new genre', function(){
    let token;
    let name;

    let exec = async function(){
      const res = await request(server)
      .post('/api/genres')
      .set('x-auth-token',token)
      .send({name: name});
      return res;
    };
    beforeEach(function(){
      token = new User().generateAuthToken();
      name = "valid";
    });
    it('Should return 401 error if client is not authorised', async function(){
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it('Should return 404 error if invalid ID is passed', async function(){
      const res = await request(server).get('/api/genres/1');
      expect(res.status).toBe(404);
    });
    it('Should return 404 error if no genres with such ID exists', async function(){
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/genres/'+id);
      expect(res.status).toBe(404);
    });
    it('should return 400 error if genre is less than 5 characters', async function(){
      name = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return a new valid genre', async function(){
      //const token = new User().generateAuthToken();
      const res = await exec();
      const genre = await Genre.find({name:"valid"});
      expect(genre).not.toBeNull();
      expect(res.body).toHaveProperty('name','valid');
    });
  });
});
