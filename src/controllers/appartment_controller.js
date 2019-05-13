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
    list() { //deze werkt
        let sql = 'SELECT * FROM appartments'
        db.query(sql, (err, result) => {
            if(err) throw (err)
            else {
                res.statusCode(200).send('Appartments returned')
            }
        })

    },
    single(req) { //deze geen idee
        let sql = 'select * FROM appartments WHERE id=' + req.params.id
        db.query(sql, (err, result) => {
            if(err) throw err
            else{
                console.log(result)
            }
        })
    },
    create(req,res) {
        var appartment = {
            title : req.body.title,
            city : req.body.city,
            street : req.body.street,
            housenumber : req.body.housenumber,
            postalcode: req.body.postalcode,
            reservations : [req.body.reservation]
        }
        db.query()
    },
    edit() {

    },
    delete() {
        
    }

}