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
    validateToken() {

    }
}