//imports
//here
const sql = require('mysql')
//Create connection
const db = sql.createConnection({
    host: 'localhost',
    user: 'rental',
    password: 'localpassword',
    database: 'rental'
});

module.exports = {
    list(req, res) {
        let sql = 'SELECT * FROM appartments'
        db.query(sql, (err, result) => {
            if (err) throw (err)
            else {
                res.send(result)
            }
        })
    },
    single(req) {
        let sql = 'SELECT * FROM appartments WHERE id=' + req.params.id
        db.query(sql, (err, result) => {
            if (err) throw err
            else {
                res.send(result)
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
                    res.send('This appartment already exists', (401))
                }
            }
            else {
                res.send(result, 'Appartment created', (200))
            }
        })
    },
    edit(req, res) {
        var appartment = {
            title: req.body.title,
            city: req.body.city,
            address: req.body.address,
            postalcode: req.body.postalcode,
            owner: req.body.owner
        }

        let sql = 'UPDATE appartments SET city = "' + appartment.city + '", address = "' + appartment.address + '", postalcode = "' + appartment.postalcode + '" WHERE title = "' + appartment.title + '"'
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result, 'Appartment edited', (200))
            }
        })

    },

    delete(req, res) {
        var id = req.params.id
        let sql = 'DELETE FROM appartments WHERE appartmentid= ' + id
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result, 'Appartment deleted', (200))
            }
        })
    }

}