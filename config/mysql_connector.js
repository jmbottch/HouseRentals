var config = require('./mysql_config')
var mySql = require('mysql')

var connection = mySql.createConnection(config.env)

connection.connect(function(err) {
    if(err) throw(err)
    console.log("connected to database")
})
module.exports ={ 
    connection
}