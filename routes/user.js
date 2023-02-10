const ControllerUser = require('../controllers/controllerUser')
const router = require('express').Router()


router.get('/', ControllerUser.register)
router.post('/', ControllerUser.createUser)




module.exports = router