const sql = require('mysql')
const app = require('../index')
    const test_db = sql.createConnection({
        host : 'localhost',
        user : 'rental',
        password : 'localpassword',
        database: 'testrental'
    });
    
    //Connect to the db
    test_db.connect((err) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log('MySql Connected on test db')
            done()
        }
    })

//Create connection
