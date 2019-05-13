const AppartmentController = require('src/controllers/appartment-controller')
const AuthController = require('src/controllers/auth_controller')
const ReservationController = require('ser/controllers/reservation_controller')

module.exports = (app) => {

    //get a list of reservations per appartment
    app.get('/api/appartments/id=:id/reservations', ReservationController.list)
    //get the data of a single reservation
    app.get('/api/appartments/id=:id/reservations/id=:id')
    //create a reservation while logged in
    app.post('/api/appartments/id=:id/reservations', AuthController.validateToken, ReservationController.create)
    //edit an existing reservation while logged in
    app.put('/api/appartments/id=:id/reservations/id=:id', AuthController.validateToken, ReservationController.edit)
    //delete an existing reservation while logged in
    app.delete('/api/appartments/id=:id/reservations/id=:id', AuthController.validateToken, ReservationController.delete)
}