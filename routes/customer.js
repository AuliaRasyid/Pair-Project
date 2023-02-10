const Controller = require('../controllers/controller')
const ControllerUser = require('../controllers/controllerUser')

const router = require('express').Router()
const {isLogin} = require("../midleware/auth")


router.use(isLogin)

router.get('/', ControllerUser.homeLogin)
router.get('/:idCustomer/:id/:idProduct/buy', Controller.buyProduct)
router.get('/:idCustomer/order', Controller.showOrder)

module.exports = router