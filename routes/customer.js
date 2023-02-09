const Controller = require('../controllers/controller')

const router = require('express').Router()

router.get('/:idCustomer/:id/:idProduct/buy', Controller.buyProduct)
router.get('/:idCustomer/order', Controller.showOrder)

module.exports = router