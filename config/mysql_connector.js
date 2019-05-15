var config = require('./mysql_config')
var sql = require('mysql')

module.exports = {
    db() {
        const db = sql.createConnection({
            host : 'localhost',
            user : 'rental',
            password : 'localpassword',
            database: 'rental'
        });
        db.connect((err) => {
            if(err) console.log(err)
            else {
                console.log('connected to db')
            }
        })
    },
    
    test_db() {
        const test_db = sql.createConnection({
            host : 'localhost',
            user : 'rental',
            password : 'localpassword',
            database: 'testrental'
        });
    
        test_db.connect((err) => {
            if(err) console.log(err)
            else {
                console.log('connected to test_db')
            }
        })
    }

}
