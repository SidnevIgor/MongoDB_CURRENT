const request = require('supertest'); //here we add a linrary to build http requests
let server;

describe('api/genres', function(){
  beforeEach(function(){
    server = require('../../index.js');
    console.log(server);
  });
  afterEach(function(){
    server.close();
  });
  describe('GET', function(){
    it('Should return all genres', async function(){
      const res = await request(server).get('/api/genres'); //we replace the request normally done through Postman
      expect(res.status).toBe(200);
    });
  });
});
