//imports
//here
const sql = require('mysql')
//Create connection
const db = sql.createConnection({
    host : 'localhost',
    user : 'rental',
    password : 'localpassword',
    database: 'testrental'
});
module.exports = {
    list(req, res) {
        var id = req.params.id
        let sql = 'SELECT * FROM reservations WHERE appertmentId = "'  + id + '"'
        db.query(sql, (err, result) => {
            if (err) throw (err)
            else {
                res.status(200).send(result)
            }
        })
    },
    single(req, res) {
        let sql = 'SELECT * FROM reservations WHERE reservationid="' + req.params.id + '"'
        console.log(req.params.id)
        db.query(sql, (err, result) => {
            if (err) throw err
            else {
                res.status(200).send(result)
            }
        })
    },
    create(req,res) {
        var appartmentid = req.params.id
        var reservation = {
            userid : req.body.userid,
            startDate : req.body.startdate + "T02:00:00.000Z", //DATES AS YYY-MM-DD
            endDate : req.body.enddate +"T02:00:00.000Z"
        }
        let sql = 'INSERT INTO reservations(userid, start_date, end_date, appertmentId) VALUES ("' + reservation.userid + '", "' + reservation.startDate + '", "' + reservation.endDate + '", "' + appartmentid + '")'
        db.query(sql, (err,result) => {
            if(err) {
                console.log(err)
                res.status(401).send({Error:'Something went wrong'})
            }
            else {
                res.status(200).send({Message:'Reservation created'})
            }
        })
        },
    edit(req, res) {
        var id = req.params.id
        var reservation = {
            startDate : req.body.startdate  + "T02:00:00.000Z",
            endDate : req.body.enddate  + "T02:00:00.000Z"
        }
        let sql = 'UPDATE reservations SET start_date = "' + reservation.startDate + '", end_date = "' + reservation.endDate + '" WHERE reservationid = "'  + id + '"'
      
        db.query(sql, (err,result) => {
            if(err) {
                res.status(401).send({Error: 'Something went wrong'})
            }
            else {
                res.status(200).send({Message:'Reservation edited'})
            }
        })

    },
    delete(req, res) {
        var id = req.params.id
        let sql = 'DELETE FROM reservations WHERE reservationid= ' + id
        db.query(sql, (err, result) => {
            if (err) {
                res.status(401).send({Error: 'Something went wrong'})
            } else {
                res.status(200).send({Message: 'Reservation deleted'})
            }
        })
    }

}