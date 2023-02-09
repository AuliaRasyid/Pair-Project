const router = require("express").Router()

router.get("/", (req,res) =>{
    res.send("halaman utama")
})


module.exports = router