//Initiallising node modules
var express = require("express")
var bodyParser = require("body-parser")
var sql = require("mysql")
//import route files
const appartmentRoutes = require('./routes/appartment_routes')
const reservationRoutes = require('./routes/appartment_routes')
const userRoutes = require('./routes/appartment_routes')

//Create connection
const db = sql.createConnection({
    host : 'localhost',
    user : 'rental',
    password : 'localpassword',
    database: 'rental'
});

//Connect to the db
db.connect((err) => {
    if(err) {
        console.log(err)
    }
    else {
        console.log('MySql Connected')
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
    let sql = 'CREATE TABLE users(userid INT AUTO_INCREMENT UNIQUE, email VARCHAR(255) UNIQUE, password VARCHAR(255), phonenumber VARCHAR, firstname VARCHAR(255), lastname VARCHAR(255), city VARCHAR(255), address VARCHAR(255), postalcode VARCHAR (255), CONSTRAINT PK_userid PRIMARY KEY CLUSTERED)'
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
    let sql = 'CREATE TABLE reservations(reservationid INTEGER AUTO_INCREMENT UNIQUE, appertmentId INTEGER(20), userid INTEGER(20), start_date DATETIME, end_date DATETIME, CONSTRAINT PK_reservationid PRIMARY KEY CLUSTERED)'
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