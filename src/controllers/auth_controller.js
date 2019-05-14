const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/auth_config');
const sql = require('mysql')
//Create connection
const db = sql.createConnection({
    host: 'localhost',
    user: 'rental',
    password: 'localpassword',
    database: 'rental'
});
module.exports = {
    login(req, res) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        let sql = 'SELECT * FROM users WHERE email = "' + user.email + '"'
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                var passwordisValid = bcrypt.compareSync(req.body.password, user.password)
                if (passwordisValid) {
    
                    var token = jwt.sign({ id: result.userid }, config.secretkey, {
                        expiresIn: 86400
                    })
                    res.send('Logged in', { auth: true, token: token }, (200))
                    console.log('Kech')
                }
                if (!passwordisValid) {
                    res.send('Password does not match', (401))
                    console.log(user)
                    console.log(result)
                    console.log(passwordisValid)
                }
    
            }
        })
    },
    
     validateToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send({ Error: 'No token provided.' })
    
        }
        let token = req.headers.authorization.split(' ')[1]
        if (token === 'null') {
            return res.status(401).send({ Error: 'No token provided.' })
        }
        jwt.verify(token, config.secret, function (err, decoded) {
            console.log(decoded)
            if (err) return res.status(401).send({ Error: 'Token is invalid.' })
            if (decoded) next();
        });
    }
}
 
