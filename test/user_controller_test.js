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

describe('the user_controller ', () => {
    var user = {
        email: "test@registerTest.com",
        password: "testpassword",
        phonenumber: "0637322184",
        firstname: "test",
        lastname: "user",
        city: "Rotterdam",
        address: "TestStraat 2",
        postalcode: "4055TE"
    }
    var edited = {
        email: "test@registerTest.com",
        password: "testpassword",
        phonenumber: "578946578",
        firstname: "edited",
        lastname: "user",
        city: "Breda",
        address: "TestStraat 2",
        postalcode: "4055TE"
    }

    var login = {
        email: "test@registerTest.com",
        password: "testpassword"
    }

    it('can get a list of users', (done) => {
        request(app)
            .get('/api/users')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.body).to.be.an('Array')
                    expect(res.statusCode).to.equal(200)
                    done()
                }
            })
    })

    it('can register a new user', (done) => {
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.Message).to.equal('User created')
                    let sql = 'SELECT userid FROM users WHERE email= "test@registerTest.com"'
                    db.query(sql, (err, result) => {
                        var id = result[0].userid
                        request(app)
                            .get('/api/users/id=' + id)
                            .end((err, res) => {
                                expect(res.statusCode).to.equal(200)
                                expect(res.body[0].email).to.equal('test@registerTest.com')
                                done()
                            })
                    })
                }
            })
    })

    it('can get a single user', (done) => {
        request(app)
            .get('/api/users/id=' + 34)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body).to.be.an('Array')
                    done()
                }
            })
    })

    it('can edit an existing user', (done) => {
        var token = 'Bearer '
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.Message).to.equal('User created')
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                let sql = 'SELECT userid FROM users WHERE email= "test@registerTest.com"'
                db.query(sql, (err, result) => {
                    var id = result[0].userid
                    request(app)
                        .put('/api/users/id=' + id)
                        .set({ 'Authorization': token })
                        .send(edited)
                        .end((err, res) => {
                            expect(res.statusCode).to.equal(200)
                            expect(res.body.Message).to.equal('User edited')
                            done()
                        })

                })

            })
    })

    it('can delete an existing user', (done) => {
        var token = 'Bearer '
        request(app)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.Message).to.equal('User created')
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                let sql = 'SELECT userid FROM users WHERE email= "test@registerTest.com"'
                db.query(sql, (err,result) => {
                    var id = result[0].userid
                    request(app)
                    .delete('/api/users/id=' + id)
                    .set({ 'Authorization': token })
                    .end((err,res) => {
                        expect(res.statusCode).to.equal(200)
                        request(app)
                        .get('/api/users')
                        .end((err,res) => {
                            expect(res.body).to.be.empty
                            done()
                        })
                    })
                })
                
            })

    })
})