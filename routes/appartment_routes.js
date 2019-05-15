const AppartmentController = require('../src/controllers/appartment_controller')
const AuthController = require('../src/controllers/auth_controller')

module.exports = (app) => {

    //get a list of appartments that are for rent
    app.get('/api/appartments', AppartmentController.list)
    //get data of a single appartment
    app.get('/api/appartments/id=:id', AppartmentController.single)
    //post an appartment while logged in
    app.post('/api/appartments', AuthController.validateToken, AppartmentController.create) 
    //edit and appartment while logged in
    app.put('/api/appartments/id=:id', AuthController.validateToken, AppartmentController.edit) 
    //delete an existing appartment
    app.delete('/api/appartments/id=:id', AuthController.validateToken, AppartmentController.delete) 
}