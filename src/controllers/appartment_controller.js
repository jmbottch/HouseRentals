//imports
//here
const sql = require('mysql')
//Create connection
const db = sql.createConnection({
    host : 'localhost',
    user : 'rental',
    password : 'localpassword',
    database: 'rental'
});

module.exports = {
    list(req, res) { //deze werkt
        let sql = 'SELECT * FROM appartments'
        db.query(sql, (err, result) => {
            if(err) throw (err)
            else {
                res.send(result)
            }
        })

    },
    single(req) { //deze geen idee
        let sql = 'SELECT * FROM appartments WHERE id=' + req.params.id
        db.query(sql, (err, result) => {
            if(err) throw err
            else{
                res.send(result)
            }
        })
    },
    create(req,res) { //hier klopt waarschijnlijk geen hol van
        var appartment = {
            title : req.body.title,
            city : req.body.city,
            address: req.body.address,
            postalcode: req.body.postalcode,
            owner: req.body.owner
        }
        let sql = 'INSERT INTO appartments(title, city, address, postalcode, owner_userid) VALUES ( "' + appartment.title + '", "' + appartment.city + '", "' +appartment.address + '", "'  + appartment.postalcode + '", "' + appartment.owner + '")'
        db.query(sql, (err, result) => {
            if(err) {
                if(err.errno === 1062) {
                    res.send('This appartment already exists', (401))
                }
            }
            else {
                res.send(result, 'Appartment created', (200))
            }
        })
    },
    edit() {
        var appartment = {
            title: req.body.title,
            city: req.body.city,
            address: req.body.address,
            postalcode: req.body.postalcode,
            owner : req.body.owner
        }

        let sql = ''
    },
    delete() {
        
    }

}