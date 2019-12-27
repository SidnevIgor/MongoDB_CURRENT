const {Rental} = require('../../models/rental');
const {User} = require('../../models/user');
const mongoose = require('mongoose');
const request = require('supertest');

describe('/api/returns',function(){
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;
  const exec = function(){
    const res = request(server)
    .post('/api/returns')
    .set('x-auth-token', token)
    .send({
        customerId: customerId,
        movieId: movieId
      });
      return res;
  };

  beforeEach(async function(){
    server = require('../../index.js');
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();
    rental = new Rental({
      customer:{
        _id: customerId,
        name:"12345",
        phone: "12345"
      },
      movie:{
        _id:movieId,
        title: "12345",
        dailyRentalRate:2
      }
    });
    await rental.save();
  });
  afterEach(async function(){
    await server.close();
    await Rental.remove({});
  });

  it('Should return 401 if client is not logged in', async function(){
    token='';
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it('Should return 400 if customerId is not provided', async function(){
    customerId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('Should return 400 if movieId is not provided', async function(){
    movieId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('Should return 404 if no rental found for the chosen customer/movie', async function(){
    await Rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
  });
  it('Should return 400 if rental is already processed', async function(){
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('Should return 200 if rental is valid', async function(){
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
