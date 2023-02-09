const AdminController = require('../controllers/adminController')


const router = require('express').Router()

router.get('/',AdminController.homeAdmin)
router.get('/:idStore/delete', AdminController.destroyStore)
router.get('/add',AdminController.addStore)
router.post('/add',AdminController.createStore)


module.exports = router

