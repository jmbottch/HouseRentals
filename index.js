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
    database: 'verhuur'
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
    let sql = 'CREATE DATABASE verhuur'
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send('database created')
        console.log(result)
    })
})

//create users Table
app.get('/createTable', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(255), phonenumber VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255), city VARCHAR(255), street VARCHAR(255), housenumber VARCHAR(255), postalcode VARCHAR(255), )'
    db.query(sql, (err, result) => {
        if(err) throw (err)
        res.send('users table created')
    })
})

//Body parser middleware
app.use(bodyParser.json()); 

appartmentRoutes(app)
reservationRoutes(app)
userRoutes(app)

app.listen('3000', () => {
    console.log('Server started on port 3000')
})