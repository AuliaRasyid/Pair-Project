const Controller = require('../controllers/controller')

const router = require('express').Router()
const seller = require('./seller')
const admin = require('./admin')
const customer = require('./customer')

router.get('/', Controller.home)
router.get('/detailStoreProduct/:id', Controller.findProductStore)
router.use('/admin', admin)
router.use('/seller', seller)
router.use("/customer", customer)

module.exports = router