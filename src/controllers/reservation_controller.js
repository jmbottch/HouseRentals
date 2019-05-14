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
    list(req, res) {
        let sql = 'SELECT * FROM reservations'
        db.query(sql, (err, result) => {
            if (err) throw (err)
            else {
                res.send(result)
            }
        })
    },
    single(req, res) {
        var id = req.params.reservationid
        let sql = 'SELECT * FROM reservations WHERE reservationid = "'  + id + '"'
        db.query(sql, (err, result) => {
            if (err) throw err
            else {
                res.send(result)
            }
        })
    },
    create(req,res) {
        var reservation = {
            userid : req.body.userid,
            startDate : req.body.startdate, //DATES AS YYY-MM-DD
            endDate : req.body.enddate,
            appartmentid : req.body.appartmentid
        }
        let sql = 'INSERT INTO reservations(userid, start_date, end_date, appertmentId) VALUES ("' + reservation.userid + '", "' + reservation.startDate + '", "' + reservation.endDate + '", "' + reservation.appartmentid + '")'
        db.query(sql, (err,result) => {
            if(err) {
                console.log(err)
            }
            else {
                res.send(result, 'Reservation created', (200))
            }
        })
        },
    edit(req, res) {
        var id = req.params.reservationid
        var reservation = {
            startDate : req.body.startdate,
            endDate : req.body.enddate,
            appartmentid : req.body.appartmentid
        }
        let sql = 'UPDATE reservations SET start_date = "' + reservation.startDate + + '", end_date = "' + reservation.end + '", appertmentId = "' + reservation.appartmentid + '" WHERE reservationid = "'  + id + '"'
        db.query(sql, (err,result) => {
            if(err) {
                console.log(err)
            }
            else {
                res.send(result, 'Reservation created', (200))
            }
        })

    },
    delete(req, res) {
        var id = req.params.reservationid
        let sql = 'DELETE FROM reservations WHERE reservationid= ' + id
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result, 'Appartment deleted', (200))
            }
        })
    }

}