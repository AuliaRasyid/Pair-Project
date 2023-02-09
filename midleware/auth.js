const penjual = function(req,res, next){
    if(req.session.user.role !== "Penjual"){
        const error = "Not a seller"
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
module.exports = {penjual , isLogin}