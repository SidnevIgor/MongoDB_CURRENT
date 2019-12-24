const request = require('supertest'); //here we add a linrary to build http requests
const {Genre} = require('../../models/genre');
let server;

describe('api/genres', function(){
  beforeEach(function(){
    server = require('../../index.js');
    console.log(server);
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
});
