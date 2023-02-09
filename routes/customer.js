const Controller = require('../controllers/controller')

const router = require('express').Router()

router.get('/:idCustomer/:id/:idProduct/buy', Controller.buyProduct)

module.exports = router