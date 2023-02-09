
const {Order,OrderItem,Product,Store,User,UserDetail}= require("../models")



class Controller {
    static home(req,res){
        res.render('home')
    }

    static mainProduct(req,res){
        Product.findAll({
            include:[OrderItem]
        })
            .then(User =>{
                res.send(User)
            })
            .catch(err => res.send(err))
    }
}

module.exports = Controller