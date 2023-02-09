const Controller = require('../controllers/controller')

const router = require('express').Router()

const {isLogin,Admin} = require("../midleware/auth")

router.use(isLogin)
router.use(Admin)


router.get('/', (req,res) =>{
    res.send("hallo")
})

module.exports = router