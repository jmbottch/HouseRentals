const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/auth_config');
const sql = require('mysql')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const moment = require('moment')


//Create connection
const db = sql.createConnection({
    host: 'localhost',
    user: 'rental',
    password: 'localpassword',
    database: 'testrental'
});
module.exports = {
    login(req, res) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        let sql = 'SELECT password FROM users WHERE email = "' + user.email + '"'
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                var passwordisValid = bcrypt.compareSync(req.body.password, result[0].password)
                if (passwordisValid) {
    
                    var token = jwt.sign({user}, config.secretkey, {
                        expiresIn: 86400
                    })
                    res.status(200).send({ auth: true, token: token });
                   
                }
                if (!passwordisValid) {
                    res.status(401).send({Message: 'Password does not match'})
                
                }
    
            }
        })
    },
    
    validateToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send({ Error :'No token provided.'})
        }
        let token = req.headers.authorization.split(' ')[1]
        if (token === 'null') {
            return res.status(401).send({ Error :'No token provided.'})
        }
        jwt.verify(token, config.secretkey, function(err, decoded) {            
            if (err) return res.status(401).send({ Error :'Token is invalid.'})
            if (decoded) next();          
        });
    },
   
}
 
