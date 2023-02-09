const Controller = require('../controllers/controller')
const ControllerUser = require('../controllers/controllerUser')
const {isLogin} = require("../midleware/auth")

const router = require('express').Router()
const seller = require('./seller')
const admin = require('./admin')
const customer = require('./customer')
const register = require("./user")

router.get('/', Controller.home)
router.get('/detailStoreProduct/:Storeid',isLogin, Controller.findProductStore)
router.get("/login", ControllerUser.login)
router.post("/login",ControllerUser.postlogin)

router.get("/detailUser" , ControllerUser.DetailUser)

router.get("/logout",ControllerUser.logout)

router.use("/register",register)

router.use('/admin', admin)
router.use('/seller', seller)
router.use("/product", customer)



module.exports = router