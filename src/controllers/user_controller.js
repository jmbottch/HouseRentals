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
    database: 'testrental'
});

module.exports = {
    list(req, res) {
        let sql = 'SELECT * FROM users'
        db.query(sql, (err, result) => {
            if(err) throw (err)
            else {
                res.send(result, 'User has been returned',(200))
            }
        })
    },
    single(req, res) {
        var id = req.params.id
        let sql = 'SELECT * FROM users WHERE userid = ' + id
        db.query(sql, (err, result) => {
            if(err) {
                res.status(401).send({Error:'an error has occured'})
            } else {
                res.status(200).send(result)
            }
        })

    },
    create(req,res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        var user = {
            email : req.body.email,
            password : hashedPassword,
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
                    res.status(401).send({Error:'This email is already in use'})
                } else {
                    console.log(err)
                }
            }
            else {
                var token = jwt.sign({user}, config.secretkey, {
                    expiresIn: 86400
                })
                res.status(200).send({Message:'User created', auth:true, token:token})            
            }
        })
    },
    edit(req, res) {
        var id = req.params.id
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        var user = {
            email : req.body.email,
            password : hashedPassword,
            phonenumber : req.body.phonenumber,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            city : req.body.city,
            address : req.body.address,
            postalcode : req.body.postalcode

        }
        let sql = 'UPDATE users SET email = "' + user.email + '", password = "' + user.password + '", phonenumber = "' + user.phonenumber + '", firstname = "' + user.firstname + '", lastname = "' + user.lastname + '", city = "' + user.city + '", address = "' + user.address + '", postalcode = "' + user.postalcode + '" WHERE userid=' + id 
        db.query(sql, (err, result) => {
            if(err) {
              res.status(401).send({Error:'Something went wrong'})
            }
            else {
                res.status(200).send({Message: 'User edited'})            
            }
        })

    },
    delete(req, res) {
        var id = req.params.id
        let sql = 'DELETE FROM users WHERE userid= ' + id
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send({Message:'User deleted'})
            }
        })
    }

}