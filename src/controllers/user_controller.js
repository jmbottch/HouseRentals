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
    list() {
        let sql = 'SELECT * FROM users'
        db.query(sql, (err, result) => {
            if(err) throw (err)
            else {
                res.statusCode(200).send(result)
            }
        })
    },
    single() {

    },
    create(req,res) {

    },
    edit() {

    },
    delete() {
        
    }

}