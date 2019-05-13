const app = require('../index')
const request = require('supertest')
const chai = require('chai')
expect = chai.expect;
const AppartmentModel = require('../src/models/appartment')
const UserModel = require('../src/models/user')

const Appartment = AppartmentModel.AppartmentModel
const User = UserModel.UserModel

describe('the appartmentController ', () => {
    // testUser = new User ({
    //     username: 'testUser',
    //     password: 'testPassword',
    //     firstname: 'John',
    //     lastname: 'Doe',
    //     phonenumber:'06-37322184',
    //     city:'Los Angeles',
    //     street:'Bandini Boulevard',
    //     housenumber:'69',
    //     postalcode:'4200DC',
    //     reservations: []

    // })

    testAppartment = new Appartment ({
        title : 'Test Appartment',
        city : 'New York City',
        address: 'Wall Street 420',
        postalcode: '1940NC',
        owner : testUser
    })
    const sql = require('mysql')
    //Create connection
    const db = sql.createConnection({
        host: 'localhost',
        user: 'rental',
        password: 'localpassword',
        database: 'testrental'
    });

    it('can get a list of appartments', function(done) {
        done()
    })

    it('can create a new appartment', function(done) {
        request(app)
        .post('testAppartment')
    })

})