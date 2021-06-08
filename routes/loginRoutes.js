const { login } = require('../controllers/loginController');
const prefix = "/auth"

module.exports = function (router) {
    router.route(prefix + '/login').post(login)
}