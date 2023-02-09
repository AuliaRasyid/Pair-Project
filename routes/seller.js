const Controller = require('../controllers/controller')

const router = require('express').Router()

const {isLogin,penjual} = require("../midleware/auth")

router.use(isLogin)
router.use(penjual)

router.get('/:id', Controller.productSeller)
router.get('/:id/add', Controller.showAddProduct)
router.post('/:id/add', Controller.createProduct)
router.get('/:id/:idProduct/delete', Controller.destroyStoreProduct)
router.get('/:id/:idProduct/edit', Controller.showEditProduct)
router.post('/:id/:idProduct/edit', Controller.updateProduct)
router.get('/:id/:idProduct/restock',Controller.showEditStock)
router.post('/:id/:idProduct/restock', Controller.updateStockProduct)
router.get('/:id/order', Controller.listOrder)

module.exports = router