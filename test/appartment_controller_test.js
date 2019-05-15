const app = require('../index')
const request = require('supertest')
const chai = require('chai')
expect = chai.expect;
const sql = require('mysql')

const db = sql.createConnection({
    host: 'localhost',
    user: 'rental',
    password: 'localpassword',
    database: 'testrental'
});

describe('the appartmentController ', () => {

    var user = {
        email: "test@registerTest.com",
        password: "testpassword",
        phonenumber: "37322184",
        firstname: "test",
        lastname: "user",
        city: "Rotterdam",
        address: "TestStraat 2",
        postalcode: "4055TE"
    }
    var edited = {
        email: "test@registerTest.com",
        password: "testpassword",
        phonenumber: "14589674",
        firstname: "edited",
        lastname: "user",
        city: "Breda",
        address: "TestStraat 2",
        postalcode: "4055TE"
    }

    var appartment = {
        title: "Test Appartment",
        city: "Rotterdam",
        address: "Beukelsdijk 136",
        postalcode: "3022DL",
        owner: "3"
    }
    var editedAppartment = {
        title: "Edited Appartment",
        city: "Breda",
        address: "Lovensdijkstraat 69",
        postalcode: "3022DL",
        owner: "3"
    }

    it('can get a list of appartments', (done) => {
        request(app)
            .get('/api/appartments')
            .end((err, res) => {
                expect(res.body).to.be.an('Array')
                expect(res.statusCode).to.equal(200)
                done()
            })
    })

    it('can create a new appartment', (done) => {
        var token = 'Bearer '
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/appartments')
                    .set({ 'Authorization': token })
                    .send(appartment)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Appartment created')
                        done()
                    })

            })
    })

    it('can get a single appartment', (done) => {
        var token = 'Bearer '
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/appartments')
                    .set({ 'Authorization': token })
                    .send(appartment)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Appartment created')
                        let sql = 'SELECT appartmentid FROM appartments WHERE title= "Test Appartment"'
                        db.query(sql, (err, result) => {
                            var id = result[0].appartmentid
                            request(app)
                                .get('/api/appartments/id=' + id)
                                .end((err, res) => {
                                    expect(res.statusCode).to.equal(200)
                                    expect(res.body[0].city).to.equal('Rotterdam')
                                    done()
                                })

                        })

                    })

            })

    })

    it('can edit an existing appartment', (done) => {
        var token = 'Bearer '
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/appartments')
                    .set({ 'Authorization': token })
                    .send(appartment)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        let sql = 'SELECT appartmentid FROM appartments WHERE title = "Test Appartment"'
                        db.query(sql, (err, result) => {
                            var id = result[0].appartmentid
                            request(app)
                                .put('/api/appartments/id=' + id)
                                .set({ 'Authorization': token })
                                .send(editedAppartment)
                                .end((err, res) => {
                                    expect(res.statusCode).to.equal(200)
                                    expect(res.body.Message).to.equal('Appartment edited')
                                    request(app)
                                        .get('/api/appartments/id=' + id)
                                        .end((err, res) => {
                                            expect(res.body[0].city).to.equal('Breda')
                                            expect(res.body[0].address).to.equal('Lovensdijkstraat 69')
                                            done()
                                        })

                                })

                        })

                    })

            })
    })
    it('can delete an existing appartment', (done) => {
        var token = 'Bearer '
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/appartments')
                    .set({ 'Authorization': token })
                    .send(appartment)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Appartment created')
                        let sql = 'SELECT appartmentid FROM appartments WHERE title="Test Appartment"'
                        db.query(sql, (err, result) => {
                            var id = result[0].appartmentid
                            request(app)
                                .delete('/api/appartments/id=' + id)
                                .set({ 'Authorization': token })
                                .end((err, res) => {
                                    expect(res.statusCode).to.equal(200)
                                    expect(res.body.Message).to.equal('Appartment deleted')
                                    done()
                                })
                        })


                    })

            })
    })

})