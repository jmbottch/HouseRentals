const AppartmentController = require('../src/controllers/appartment_controller')
const AuthController = require('../src/controllers/auth_controller')

module.exports = (app) => {

    //get a list of appartments that are for rent
    app.get('/api/appartments', AppartmentController.list)
    //get data of a single appartment
    app.get('/api/appartments/id=:id', AppartmentController.single)
    //post an appartment while logged in
    app.post('/api/appartments', AppartmentController.create) // AuthController.validateToken
    //edit and appartment while logged in
    app.put('/api/appartments/id=:id', AppartmentController.edit) //AuthController.validateToken
    //delete an existing appartment
    app.delete('/api/appartments/id=:id', AppartmentController.delete) //AuthController.validateToken,
}