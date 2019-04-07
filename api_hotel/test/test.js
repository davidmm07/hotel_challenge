let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const db = require('../config/keys');
let url = db.url + db.port;
let assert = require('assert');

chai.use(chaiHttp);

describe('get all hotels: ', () => {
  it('should get all hotels', done => {
    chai
      .request(url)
      .get('/api/hotel')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('get hotels by search of property name by word: ', () => {
  var nameHotel = 'lima';
  it('should get hotels by name', done => {
    chai
      .request(url)
      .get('/api/hotel/')
      .query({ name: nameHotel, limit: 10 })
      .end(function(err, res) {
        console.log(res.body.hotels[0].name);
        expect(res.body.hotels[0].name.toLowerCase()).to.include(nameHotel);
        done();
      });
  });
  var nameHotelError = '$dass#';

  it('should not get hotels by name', done => {
    chai
      .request(url)
      .get('/api/hotel/')
      .query({ name: nameHotelError, limit: 10 })
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('get hotels by search of property name by query: ', () => {
  var nameHotel = 'Royal Inca Hotel';
  it('should get hotels by name', done => {
    chai
      .request(url)
      .get('/api/hotel')
      .query({ name: nameHotel, limit: 10 })
      .end(function(err, res) {
        console.log(res.body.hotels[0].name);
        expect(res.body.hotels[0].name).to.include(nameHotel);
        done();
      });
  });
});

describe('get hotels by search of property starts: ', () => {
  it('should get same stars', done => {
    chai
      .request(url)
      .get('/api/hotel')
      .query({ stars: 4, limit: 5 })
      .end(function(err, res) {
        console.log(res.body);
        expect(res.body.hotels[0].stars).to.equal(4);
        done();
      });
  });
});

describe('get hotels by search of filters starts and  name together: ', () => {
  var nameFilter = 'miraflores';
  it('should get same stars by array of filter name', done => {
    chai
      .request(url)
      .get('/api/hotel/')
      .query({ name: nameFilter, stars: 5, limit: 5 })
      .end(function(err, res) {
        console.log(res.body.hotels[0].name + ' with ' + res.body.hotels[0].stars, ' stars');
        expect(res.body.hotels[0].name.toLowerCase()).to.include(nameFilter);
        expect(res.body.hotels[0].stars).to.equal(5);
        done();
      });
  });
});
describe('not get hotels by search of filters starts and  name together: ', () => {
  var nameFilter = 'royal';
  it('should not get same stars', done => {
    chai
      .request(url)
      .get('/api/hotel/')
      .query({ name: nameFilter, stars: 3, limit: 3 })
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });
});
describe('not get hotels by start param bad defined: ', () => {
  var nameFilter = 'Hotel';
  it('should not get same stars', done => {
    chai
      .request(url)
      .get('/api/hotel/?&start=&start=')
      .query({ name: nameFilter, limit: 3 })
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });
});
