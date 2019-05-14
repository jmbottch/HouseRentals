const AppartmentController = require('../src/controllers/appartment_controller')
const AuthController = require('../src/controllers/auth_controller')
const ReservationController = require('../src/controllers/reservation_controller')

module.exports = (app) => {

    //get a list of reservations per appartment
    app.get('/api/appartments/id=:id/reservations', ReservationController.list)
    //get the data of a single reservation
    app.get('/api/appartments/id=:id/reservations/reservationid=:id', ReservationController.single)
    //create a reservation while logged in
    app.post('/api/appartments/id=:id/reservations', ReservationController.create)
    //edit an existing reservation while logged in
    app.put('/api/appartments/id=:id/reservations/reservationid=:id', ReservationController.edit)
    //delete an existing reservation while logged in
    app.delete('/api/appartments/id=:id/reservations/reservationid=:id', ReservationController.delete)
}

// AuthController.validateToken, 