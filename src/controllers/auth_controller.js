const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const config = require('../../config/mongodb_config');

module.exports = {
    login() {

    },
    validateToken(req, res, next) {
        if(!req.headers.authorization) {
            return res.status(401).send({Error : 'No Authorization provided'})
        }
        let token = req.headers.authorization.split(' ')[1]
        if(token === null) {
            return res.status(401).send({Error : 'No token provided'})
        }
        jwt.verify(token, config.secret, function(err, decoded) {
            if(err) return res.status(401).send({Error : 'Token is invalid'})
            if(decoded) next();
        })
    }
}