const { Order, OrderItem, Product, Store, User, UserDetail } = require("../models")


const bcrypt = require('bcryptjs')



class ControllerUser {
    
    static homeLogin(req,res){
        const{id} = req.session.user
        const {error} = req.query
        Store.findAll()
        .then(stores => {
                // res.send(stores)
                res.render('homeLogin', { stores ,error})
            })
            .catch(err => {
                res.send(err)
            })
    }


    static register(req,res){
        res.render("formregister")
    }

    static createUser(req,res){
        const {email,userName,password,role} = req.body
        User.create({email,userName,password,role})
            .then(() => res.redirect("/login"))
            .catch((err) => res.send(err))
    }

    static login(req,res){
        const {error} = req.query
        res.render("formlogin", { error })
    }

    static postlogin(req,res){
        const {email , password} = req.body

        User.findOne({where:{ email }})
            .then(user =>{
                if(user){
                    const isValidPassword = bcrypt.compareSync(password , user.password)
                    if(isValidPassword){

                        req.session.user = {id:user.id, role:user.role , userName:user.userName}
                        req.session.userId = user.id
                        // console.log(req.session.user)
                        return res.redirect('/product')
                    }
                    else{
                        const errors = "invalid Username/pasword"
                        return res.redirect(`/login?error=${errors}`)
                    }
                }
                else{
                    const errors = "invalid Username/pasword"
                    return res.redirect(`/login?error=${errors}`)
                }
            })
            .catch(err => res.send(err))
    }


    static mainProduct(req,res){
        Product.findAll()
            .then(User =>{
                res.send(User)
            })
            .catch(err => res.send(err))
    }

    static logout(req,res){
        req.session.destroy((err) => {
            if(err){
                res.send(err)
            }
            else{
                res.redirect("/")
            }
        })
    }

    static DetailUser(req,res){
        res.render("createDetailUser")
    }
}

module.exports = ControllerUser