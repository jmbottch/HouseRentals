const UserController = require('../src/controllers/user_controller')
const AuthController = require('../src/controllers/auth_controller')

module.exports = (app) => {

      //register with 'email' and 'password'
      app.post('/api/users/register', UserController.create)
      //login with 'email' and 'password'
      app.post('/api/users/login', AuthController.login)

      //get a list of all users
      app.get('/api/users' , UserController.list)
      //get the data of a single user
      app.get('/api/users/id=:id' , UserController.single)

      //edit an existing user while logged in
      app.put('/api/users/id=:id', AuthController.validateToken, UserController.edit)
      //delete an existing user while logged in
      app.delete('/api/users/id=:id', AuthController.validateToken,  UserController.delete)
}

// AuthController.validateToken,