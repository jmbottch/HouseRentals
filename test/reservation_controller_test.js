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

describe('the reservation_controller ', () => {
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
        phonenumber: "12345678",
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

    var reservation = {
        userid: "1",
        startdate: "2018-04-20",
        enddate: "2018-05-31"
    }

    var editedReservation = {
        userid: "2",
        startdate: "2018-04-28",
        enddate: "2018-05-14"
    }

    it('can get a list of reservations', (done) => {
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                var token = 'Bearer ' + res.body.token
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
                                .get('/api/appartments/id=' + id + '/reservations')
                                .end((err, res) => {
                                    expect(res.body).to.be.an('Array')
                                    expect(res.body).to.be.empty
                                    done()
                                })
                        })

                    })
            })
    })
    it('can post a new reservation', (done) => {
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                var token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/appartments')
                    .set({ 'Authorization': token })
                    .send(appartment)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Appartment created')
                        let sql = 'SELECT appartmentid FROM appartments WHERE title="Test Appartment"'
                        db.query(sql, (err, result) => {
                            var appartmentid = result[0].appartmentid
                            request(app)
                                .post('/api/appartments/id=' + appartmentid + '/reservations')
                                .set({ 'Authorization': token })
                                .send(reservation)
                                .end((err, res) => {
                                    expect(res.statusCode).to.equal(200)
                                    expect(res.body.Message).to.equal('Reservation created')
                                    //to check if the appartmentid was saved into the reservation, we need to do another request:
                                    var sql = 'SELECT reservationid FROM reservations WHERE userid = 1'
                                    db.query(sql, (err, result) => {
                                        var reservationid = result[0].reservationid
                                        request(app)
                                            .get('/api/appartments/id=' + appartmentid + '/reservations/reservationid=' + reservationid)
                                            .end((err, res) => {
                                                expect(res.statusCode).to.equal(200)
                                                expect(res.body).to.be.an('Array')
                                                expect(res.body[0].appertmentId).to.equal(appartmentid) //yep it is saved
                                                done()
                                            })

                                    })
                                })
                        })

                    })
            })
    })
    it('can get a single reservation', (done) => {
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                var token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/appartments')
                    .set({ 'Authorization': token })
                    .send(appartment)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Appartment created')
                        let sql = 'SELECT appartmentid FROM appartments WHERE title="Test Appartment"'
                        db.query(sql, (err, result) => {
                            var appartmentid = result[0].appartmentid
                            request(app)
                                .post('/api/appartments/id=' + appartmentid + '/reservations')
                                .set({ 'Authorization': token })
                                .send(reservation)
                                .end((err, res) => {
                                    expect(res.statusCode).to.equal(200)
                                    expect(res.body.Message).to.equal('Reservation created')
                                    var sql = 'SELECT reservationid FROM reservations WHERE userid = 1'
                                    db.query(sql, (err, result) => {
                                        var reservationid = result[0].reservationid
                                        request(app)
                                            .get('/api/appartments/id=' + appartmentid + '/reservations/reservationid=' + reservationid)
                                            .end((err, res) => {
                                                expect(res.statusCode).to.equal(200)
                                                expect(res.body).to.be.an('Array')
                                                expect(res.body[0].appertmentId).to.equal(appartmentid)
                                                done()
                                            })

                                    })
                                })
                        })

                    })
            })
    })
    it('can edit an existing reservation', (done) => {
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                var token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/appartments')
                    .set({ 'Authorization': token })
                    .send(appartment)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Appartment created')
                        let sql = 'SELECT appartmentid FROM appartments WHERE title="Test Appartment"'
                        db.query(sql, (err, result) => {
                            var appartmentid = result[0].appartmentid
                            request(app)
                                .post('/api/appartments/id=' + appartmentid + '/reservations')
                                .set({ 'Authorization': token })
                                .send(reservation)
                                .end((err, res) => {
                                    expect(res.statusCode).to.equal(200)
                                    expect(res.body.Message).to.equal('Reservation created')
                                    var sql = 'SELECT reservationid FROM reservations WHERE userid = 1'
                                    db.query(sql, (err, result) => {
                                        var reservationid = result[0].reservationid
                                        request(app)
                                            .put('/api/appartments/id=' + appartmentid + '/reservations/reservationid=' + reservationid)
                                            .set({ 'Authorization': token })
                                            .send(editedReservation)
                                            .end((err, res) => {
                                                expect(res.statusCode).to.equal(200)
                                                expect(res.body.Message).to.equal('Reservation edited')
                                                //Double check for records to be updated
                                                request(app)
                                                    .get('/api/appartments/id=' + appartmentid + '/reservations/reservationid=' + reservationid)
                                                    .end((err, res) => {
                                                        expect(res.statusCode).to.equal(200)
                                                        expect(res.body).to.be.an('Array')
                                                        expect(res.body[0].appertmentId).to.equal(appartmentid)
                                                        done()
                                                    })

                                            })

                                    })
                                })
                        })

                    })
            })
    })

    it('can delete an existing reservation', (done) => {
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                var token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/appartments')
                    .set({ 'Authorization': token })
                    .send(appartment)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Appartment created')
                        let sql = 'SELECT appartmentid FROM appartments WHERE title="Test Appartment"'
                        db.query(sql, (err, result) => {
                            var appartmentid = result[0].appartmentid
                            request(app)
                                .post('/api/appartments/id=' + appartmentid + '/reservations')
                                .set({ 'Authorization': token })
                                .send(reservation)
                                .end((err, res) => {
                                    expect(res.statusCode).to.equal(200)
                                    expect(res.body.Message).to.equal('Reservation created')
                                    let sql = 'SELECT reservationid FROM reservations WHERE userid=1'
                                    db.query(sql, (err, result) => {
                                        var reservationid = result[0].reservationid
                                        request(app)
                                            .get('/api/appartments/id=' + appartmentid + '/reservations/reservationid=' + reservationid)
                                            .end((err, res) => {
                                                expect(res.statusCode).to.equal(200)
                                                expect(res.body[0].appertmentId).to.equal(appartmentid)
                                                expect(res.body[0].start_date).to.equal('2018-04-20T00:00:00.000Z')
                                                request(app)
                                                    .delete('/api/appartments/id=' + appartmentid + '/reservations/reservationid=' + reservationid)
                                                    .set({ 'Authorization': token })
                                                    .end((err, res) => {
                                                        expect(res.statusCode).to.equal(200)
                                                        expect(res.body.Message).to.equal('Reservation deleted')
                                                        request(app)
                                                        .get('/api/appartments/id=' + appartmentid + '/reservations')
                                                        .end((err,res) => {
                                                            expect(res.statusCode).to.equal(200)
                                                            expect(res.body).to.be.empty
                                                            expect(res.body).to.be.an('Array')
                                                            done()
                                                        })
                                                        
                                                    })

                                            })
                                    })

                                })

                        })
                    })

            })
    })


})