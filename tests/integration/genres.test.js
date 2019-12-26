const request = require('supertest'); //here we add a linrary to build http requests
const {Genre} = require('../../models/genre');
let server;

describe('api/genres', function(){
  beforeEach(function(){
    server = require('../../index.js');
  });
  afterEach(async function(){
    server.close();
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
});
