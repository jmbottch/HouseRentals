const settings = requier('../../config/config.js')
const moment = require('moment')
const jwt = require('jwt-simple')


//encode
function encodeToken(username) {
    const playLoad = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: username
    }
    return jwt.encode(playload, settings.secretKey)
}
//decode
function decodeToken(token, callback) {

    try{
        const payload = jwt.decode(token, settings.secretKey)
        
        //is it expired?
        const now = moment().unix()
        if (now > payload.exp) {
            callback('token has expired!', null)
        } else {
            callback(null, payload)
        }
        
    }catch (err) {
        callback(err,null)
    }
}