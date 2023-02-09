const formatCurrency = require("../helpers")
const { Order, OrderItem, Product, Store, User, UserDetail } = require("../models")
const { Op } = require("sequelize");
class Controller {

    static home(req, res) {
        Store.findAll()
            .then(stores => {
                // res.send(stores)
                res.render('home', { stores })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static findProductStore(req, res) {
        const { id } = req.params
        let dataStore
        Store.findByPk(id)
            .then(store => {
                dataStore = store
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.findAll({
                    where: {
                        StoreId: id,
                        stock: {
                            [Op.gt]: 0
                        }
                    }
                })
            })
            .then(products => {
                res.render('products', { products, dataStore, formatCurrency })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static mainProduct(req, res) {
        Product.findAll({
            include: [Order]
        })
            .then(User => {
                res.send(User)
            })
            .catch(err => res.send(err))
    }

    static productSeller(req, res) {
        const { id } = req.params
        let dataStore
        Store.findByPk(id)
            .then(store => {
                dataStore = store
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.findAll({
                    where: {
                        StoreId: id
                    }
                })
            })
            .then(products => {
                res.render('products-seller', { products, dataStore, formatCurrency })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static showEditStock(req, res) {
        const { id, idProduct } = req.params
        let dataStore
        Store.findByPk(id)
            .then(store => {
                dataStore = store
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.findByPk(idProduct)
            })
            .then(product => {

                res.render('restock', { product, dataStore })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateStockProduct(req, res) {
        const { id, idProduct } = req.params
        const { stock } = req.body
        Store.findByPk(id)
            .then(store => {
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.findByPk(idProduct)
            })
            .then(product => {
                return product.update({ stock })
            })
            .then(() => {
                res.redirect(`/seller/${id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static destroyStoreProduct(req, res) {
        const { id, idProduct } = req.params
        Store.findByPk(id)
            .then(store => {
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.findByPk(idProduct)
            })
            .then(product => {
                return product.destroy()
            })
            .then(() => {
                res.redirect(`/seller/${id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static showEditProduct(req, res) {
        const { id, idProduct } = req.params
        let dataStore
        const category = Product.categoryProduct
        Store.findByPk(id)
            .then(store => {
                dataStore = store
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.findByPk(idProduct)
            })
            .then(product => {
                res.render('product-seller-edit', { product, dataStore, category })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateProduct(req, res) {
        const { id, idProduct } = req.params
        const { name, stock, category, price, image, size } = req.body
        console.log(req.body)
        Store.findByPk(id)
            .then(store => {
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.findByPk(idProduct)
            })
            .then(product => {
                product.update({ name, stock, category, price, image, size })
            })
            .then(() => {
                res.redirect(`/seller/${id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static showAddProduct(req, res) {
        const { id } = req.params
        const category = Product.categoryProduct
        Store.findByPk(id)
            .then(store => {
                if (!store) {
                    throw `Store Not Found`
                }
                res.render('product-add', { store, category })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static createProduct(req, res) {
        const { id } = req.params
        const { name, stock, category, price, image, size } = req.body
        Store.findByPk(id)
            .then(store => {
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.create({ name, stock, category, price, StoreId: id, image, size })
            })
            .then(() => {
                res.redirect(`/seller/${id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listOrder(req, res) {
        const { id } = req.params
        Store.findByPk(id, {
            include: Order
        })
            .then(store => {
                if (!store) {
                    throw `Store Not Found`
                }
                const idStore = store.id
                
                // return store.findAll({ include: [OrderItem] })
                res.send(store)
                // res.render('order', { store })
            })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller