const penjual = function(req,res, next){
    if(req.session.user.role !== "Penjual" && req.session.user.role !== "Admin"){
        const error = "You not a seller"
        res.redirect(`/product?error=${error}`)
    }else{
        next()
    }
}


const isLogin = function(req,res, next){
    if(!req.session.user){
        const error = "please login first"
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
}

const Admin = function(req,res, next){
    if(req.session.user.role === "Admin"){
        next()
    }else{
        const error = "Not your Store"
        res.redirect(`/product?error=${error}`)
    }
}
module.exports = {penjual , isLogin,Admin}