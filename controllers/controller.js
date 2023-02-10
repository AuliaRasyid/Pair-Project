const formatCurrency = require("../helpers")
const { Order, OrderItem, Product, Store, User, UserDetail } = require("../models")
const { Op } = require("sequelize");
class Controller {

  

    static home(req, res) {
        let option = {}
        const { search } = req.query
        if (search) {
            option.where = {
                name:{
                    [Op.iLike]: `%${search}%`
                }
            }
        }
        Store.findAll(option)
            .then(stores => {
                res.render('homeCustomer', { stores })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static homeSeller(req, res) {
        Store.findAll()
            .then(stores => {
                res.render('homeSeller', { stores })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static buyProduct(req, res) {
        const { id, idProduct, idCustomer } = req.params
        let price
        User.findByPk(idCustomer)
            .then(user => {
                if (!user) {
                    throw 'User Not Found'
                }
                return Store.findByPk(id)
            })
            .then(store => {
                if (!store) {
                    throw 'Store Not Found'
                }
                return Product.findByPk(idProduct)
            })
            .then((product) => {
                price = product.price
                return Order.create({ totalPrice: price, UserId: idCustomer, StoreId: id, date: new Date() })
            })
            .then((order) => {
                const idOrder = order.id
                return OrderItem.create({ OrderId: idOrder, ProductId: idProduct, quantity: 1, price })
            })
            .then(() => {
                res.redirect(`/detailStoreProduct/${id}`)
            })
    }

    static findProductStore(req, res) {
        const { Storeid } = req.params
        const{id} = req.session.user
        let dataStore
        Store.findByPk(Storeid)
            .then(store => {
                dataStore = store
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.findAll({
                    where: {
                        StoreId: Storeid,
                        stock: {
                            [Op.gt]: 0
                        }
                    }
                })
            })
            .then(products => {
                
                // res.send(dataStore)
                res.render('products', { products, dataStore, formatCurrency,id,error })
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
        const { id  } = req.params
        const currentId = req.session.user.id
        const error = "Not your Store"
       if(+id !== currentId){
        return res.redirect(`/product?error=${error}`)
       }
       
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
        const { errors } = req.query
        
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

                res.render('restock', { product, dataStore, errors })
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
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map(el => el.message)
                    res.redirect(`/seller/${id}/${idProduct}/restock?errors=${errors}`)
                } else {
                    res.send(err)
                }
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
        const { errors } = req.query
        Store.findByPk(id)
            .then(store => {
                dataStore = store
                if (!store) {
                    throw `Store Not Found`
                }
                return Product.findByPk(idProduct)
            })
            .then(product => {
                res.render('product-seller-edit', { product, dataStore, category, errors })
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
                return product.update({ name, stock, category, price, image, size })
            })
            .then(() => {
                res.redirect(`/seller/${id}`)
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map(el => el.message)
                    res.redirect(`/seller/${id}/${idProduct}/edit?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static showAddProduct(req, res) {
        const { id } = req.params
        const category = Product.categoryProduct
        const { errors } = req.query
        Store.findByPk(id)
            .then(store => {
                if (!store) {
                    throw `Store Not Found`
                }
                res.render('product-add', { store, category, errors })
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
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map(el => el.message)
                    res.redirect(`/seller/${id}/add?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static listOrder(req, res) {
        const { id } = req.params
        let dataStore
        Store.findByPk(id)
            .then(store => {
                if (!store) {
                    throw `Store Not Found`
                }
                dataStore = store
                return Order.findAll({
                    include: [Product, User, OrderItem],
                    where: {
                        StoreId: id,
                        status: false
                    }
                })

            })
            .then(order => {
                res.render('order', { order, dataStore, formatCurrency })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static showStatusOrder(req, res) {
        console.log(req.params)
        let dataStore
        Store.findByPk(req.params.id)
            .then(store => {
                dataStore = store
                return Order.findByPk(req.params.idOrder, {
                    include: [Product, User],
                    where: {
                        StoreId: req.params.id
                    }
                })
            })
            .then(order => {
                res.render('order-list', { order, dataStore })
                // res.send(order)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static changeStatus(req, res) {
        let StoreId
        Order.findByPk(req.params.idOrder, {
            include: OrderItem
        })
            .then(order => {
                return order.update({ status: true })
            })
            .then((orderupdated) => {
                StoreId = orderupdated.StoreId
                let quantity = orderupdated.OrderItems[0].quantity
                let productId = orderupdated.OrderItems[0].ProductId
                Product.decrement('stock', {
                    by: quantity,
                    where: {
                        id: productId
                    }
                })
            })
            .then(() => {
                res.redirect(`/seller/${StoreId}/order`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static buyProduct(req, res) {
        const { id, idProduct, idCustomer } = req.params
        let price
        User.findByPk(idCustomer)
            .then(user => {
                return Store.findByPk(id)
            })
            .then(store => {
                return Product.findByPk(idProduct)
            })
            .then((product) => {
                price = product.price
                return Order.create({ totalPrice: price, UserId: idCustomer, StoreId: id, date: new Date() })
            })
            .then((order) => {
                const idOrder = order.id
                return OrderItem.create({ OrderId: idOrder, ProductId: idProduct, quantity: 1, price })
            })
            .then(() => {
                res.redirect(`/detailStoreProduct/${id}`)
            })
            .catch(err => res.send(err))
    }


    static showOrder(req, res) {
        const { idCustomer } = req.params
        User.findByPk(idCustomer, {
            include: Order
        })
            .then(user => {
                res.render('customer-order', { user, formatCurrency })
                // res.send(user)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller