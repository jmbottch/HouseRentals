//imports
//here
const sql = require('mysql')
//Create connection
const db = sql.createConnection({
    host : 'localhost',
    user : 'rental',
    password : 'localpassword',
    database: 'verhuur'
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
            street : req.body.street,
            housenumber : req.body.housenumber,
            postalcode: req.body.postalcode,
            owner: req.body.owner
        }
        let sql = 'INSERT INTO appartments ( `' + appartment.title + '`, `' + appartment.city + '`, `' + appartment.street + '`, `' + appartment.housenumber + '`, `' + appartment.postalcode + '`, `' + appartment.owner + '`)'
        db.query(sql, (err, result) => {
            if(err) throw err
            else {
                res.send(result, 'Appartment created')
            }
        })
    },
    edit() {

    },
    delete() {
        
    }

}