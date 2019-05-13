const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/auth_config');
const sql = require('mysql')
//Create connection
const db = sql.createConnection({
    host : 'localhost',
    user : 'rental',
    password : 'localpassword',
    database: 'rental'
});

module.exports = {
    list() {
        let sql = 'SELECT * FROM users'
        db.query(sql, (err, result) => {
            if(err) throw (err)
            else {
                res.statusCode(200).send(result)
            }
        })
    },
    single() {

    },
    create(req,res) {
        var user = {
            email : req.body.email,
            password : req.body.password,
            phonenumber : req.body.phonenumber,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            city : req.body.city,
            address : req.body.address,
            postalcode : req.body.postalcode

        }
        let sql = 'INSERT INTO users(email, password, phonenumber, firstname, lastname, city, address, postalcode) VALUES ("' + user.email + '", "' + user.password + '", "' + user.phonenumber + '", "' + user.firstname + '", "' + user.lastname + '", "' +  user.city + '", "' + user.address + '", "'  + user.postalcode + '")'
        db.query(sql, (err, result) => {
            if(err) {
                if(err.errno === 1062) {
                    res.send('This email is already in use', (401))
                }
            }
            else {
                res.send(result, 'User created', (200))             
            }
        })
    },
    edit() {

    },
    delete() {
        
    }

}