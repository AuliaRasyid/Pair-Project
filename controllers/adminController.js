const formatCurrency = require("../helpers")
const { Order, OrderItem, Product, Store, User, UserDetail } = require("../models")
const { Op } = require("sequelize");

class AdminController {
    static homeAdmin(req, res) {
        Store.findAll()
            .then(stores => {
                res.render('homeAdmin', { stores })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static destroyStore(req, res) {
        const { idStore } = req.params
        Store.findByPk(idStore)
            .then(store => {
                if (!store) {
                    throw `Store Not Found`
                }
                return store.destroy()
            })
            .then(() => {
                res.redirect(`/admin`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addStore(req, res) {
        const { errors } = req.query
        User.findAll({
            where: {
                role: "Penjual"
            }
        })
            .then(user => {
                res.render('addStore', { user , errors})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static createStore(req, res) {
        const { name, emailStore, UserId } = req.body
        Store.create({ name, emailStore, UserId })
            .then(() => {
                res.redirect('/admin')
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map(el => el.message)
                    res.redirect(`/admin/add?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }
}

module.exports = AdminController