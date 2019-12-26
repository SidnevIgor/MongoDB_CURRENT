const request = require('supertest'); //here we add a linrary to build http requests
const {User} = require('../../models/user');
const {Genre} = require('../../models/genre');

 describe('authorisation middleware', function(){
   beforeEach(function(){
     server = require('../../index.js');
   });
   afterEach(async function(){
     await Genre.remove({});
     server.close();
   });
   let token;

   const exec = function(){
     return request(server)
     .post('/api/genres')
     .set('x-auth-token',token)
     .send({name:"valid"});
   };
   beforeEach(function(){
     token = new User().generateAuthToken();
   });
   it('should return 401 if no token is provided', async function(){
     token = '';
     const res = await exec();
     expect(res.status).toBe(401);
   });
   it('should return 400 if token is invalid', async function(){
     token = 'wrongFormat';
     const res = await exec();
     expect(res.status).toBe(400);
   });
   it('should return 200 if the token is valid', async function(){
     const res = await exec();
     expect(res.status).toBe(200);
   });
 });
