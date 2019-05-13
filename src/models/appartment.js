const AppartmentModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const Appartment = sequelize.define('Appartment', {
        appartmentId:{type:INTEGER, primaryKey: true, autoIncrement:true, unique: true},
        title:{type:STRING, allowNull: false},
        city:{type:STRING,allowNull:false},
        street:{type:STRING,allowNull:false},
        housenumber:{type:STRING,allowNull:false},
        postalcode:{type:STRING,allowNull:false},
        reservations:[{type:STRING}],
    })
    return Appartment
}
module.exports = AppartmentModel