const Controller = require('../controllers/controller')
const router = require('express').Router()
const customer= require("./customer")


router.get('/', Controller.home)

router.use("/product", customer)

module.exports = router