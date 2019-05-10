const UserModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const User = sequelize.define('User', {
        userId:{type:INTEGER, primaryKey: true, autoIncrement:true},
        email:{type:STRING, allowNull: false},
        password:{type:STRING, allowNull: false},
        firstname:{type:STRING, allowNull: false},
        lastname:{type:STRING, allowNull: false},
        phonenumber:{type:STRING, allowNull: false},
        city:{type:STRING,allowNull:false},
        street:{type:STRING,allowNull:false},
        housenumber:{type:STRING,allowNull:false},
        postalcode:{type:STRING,allowNull:false},
        reservations:[{type:STRING}],
    })
    return User
}
module.exports = UserModel