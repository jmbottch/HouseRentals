//Initiallising node modules
var express = require("express")
var bodyParser = require("body-parser")
var sql = require("mysql")

//import route files
const appartmentRoutes = require('./routes/appartment_routes')
const reservationRoutes = require('./routes/reservation_routes')
const userRoutes = require('./routes/user_routes')

//import connections
connectionconfig = require('./config/mysql_connector')

// var env = process.argv[2] || 'dev';

// switch(env) {
//     case 'start' : 
//         connectionconfig.db()
//         break
//     case 'test' :
//         connectionconfig.test_db()
//         break   
    
// }

const db = sql.createConnection({
    host : 'localhost',
    user : 'rental',
    password : 'localpassword',
    database: 'testrental'
});
db.connect((err) => {
    if(err) console.log(err)
    else {
        console.log('connected to db')
    }
})
//Set app variable
var app = express();

//create Database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE rental'
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send('database created')
        console.log(result)
    })
})

//create users Table
app.get('/createUsersTable', (req, res) => {
    let sql = 'CREATE TABLE users(userid INT AUTO_INCREMENT PRIMARY KEY UNIQUE, email VARCHAR(255) UNIQUE, password VARCHAR(255), phonenumber VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255), city VARCHAR(255), address VARCHAR(255), postalcode VARCHAR (255))'
    db.query(sql, (err, result) => {
        if(err) throw err
        res.send('users table created')
    })
})

app.get('/createAppartmentsTable', (req, res) => {
    let sql = 'CREATE TABLE appartments(appartmentid INT AUTO_INCREMENT PRIMARY KEY UNIQUE, title VARCHAR(255) UNIQUE, city VARCHAR(255), address VARCHAR(255), postalcode VARCHAR(255), owner_userid INTEGER)'
    db.query(sql, (err, result) => {
        if(err) throw err
        res.send('appartments table created')
    })
})

app.get('/createReservationTable', (req, res) => {
    let sql = 'CREATE TABLE reservations(reservationid INT AUTO_INCREMENT PRIMARY KEY UNIQUE, appertmentId INTEGER, userid INTEGER, start_date DATETIME, end_date DATETIME)'
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send('reservations table created')
    })
} )

//Body parser middleware
app.use(bodyParser.json()); 

appartmentRoutes(app)
reservationRoutes(app)
userRoutes(app)

app.listen('3000', () => {
    console.log('Server started on port 3000')
})

module.exports = app