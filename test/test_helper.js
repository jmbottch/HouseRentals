const sql = require('mysql')
const app = require('../index')
//Create connection
const db = sql.createConnection({
    host: 'localhost',
    user: 'rental',
    password: 'localpassword',
    database: 'testrental'
});

beforeEach((done) => {
    let usersdelete = 'DELETE FROM users'
    db.query(usersdelete, (err, result) => {
        if (err) throw err
        else {

            let appartmentsdelete = 'DELETE FROM appartments'
            db.query(appartmentsdelete, (err, result) => {
                if (err) throw err
                else {

                    let reservationsdelete = 'DELETE FROM reservations'
                    db.query(reservationsdelete, (err, result) => {
                        if (err) throw err
                        else {

                            done()
                        }
                    })
                }
            })

        }
    })
})