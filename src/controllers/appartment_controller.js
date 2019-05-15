//imports
//here
const sql = require('mysql')
//Create connection
const db = sql.createConnection({
    host: 'localhost',
    user: 'rental',
    password: 'localpassword',
    database: 'testrental'
});

module.exports = {
    list(req, res) {
        let sql = 'SELECT * FROM appartments'
        db.query(sql, (err, result) => {
            if (err) {
                res.status(401).send({Error:'An error has occured'})
            }
            else {
                res.status(200).send(result)
            }
        })
    },
    single(req,res) {
        let sql = 'SELECT * FROM appartments WHERE appartmentid=' + req.params.id
        db.query(sql, (err, result) => {
            if (err) throw err
            else {
                res.status(200).send(result)
            }
        })
    },
    create(req, res) {
        var appartment = {
            title: req.body.title,
            city: req.body.city,
            address: req.body.address,
            postalcode: req.body.postalcode,
            owner: req.body.owner
        }
        let sql = 'INSERT INTO appartments(title, city, address, postalcode, owner_userid) VALUES ( "' + appartment.title + '", "' + appartment.city + '", "' + appartment.address + '", "' + appartment.postalcode + '", "' + appartment.owner + '")'
        db.query(sql, (err, result) => {
            if (err) {
                if (err.errno === 1062) {
                    res.status(401).send({Message:'This appartment already exists'})
                }
            }
            else {
                res.status(200).send({Message:'Appartment created'})
                
            }
        })
    },
    edit(req, res) {
        var id = req.params.id
        var appartment = {
            city: req.body.city,
            address: req.body.address,
            postalcode: req.body.postalcode,
            owner: req.body.owner
        }

        let sql = 'UPDATE appartments SET city = "' + appartment.city + '", address = "' + appartment.address + '", postalcode = "' + appartment.postalcode + '" WHERE appartmentid = "' + id + '"'
        db.query(sql, (err, result) => {
            if (err) {
                res.status(401).send({Error: 'Something went wrong'})
            } else {
                res.status(200).send({Message : 'Appartment edited'})
            }
        })

    },

    delete(req, res) {
        var id = req.params.id
        let sql = 'DELETE FROM appartments WHERE appartmentid= ' + id
        db.query(sql, (err, result) => {
            if (err) {
               res.status(401).send({Error: 'Something went wrong'})
            } else {
                res.status(200).send({Message: 'Appartment deleted'})
            }
        })
    }

}