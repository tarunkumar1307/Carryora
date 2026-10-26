const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("admin");
})

router.get("/create", (req, res)=>{
    res.render("createproducts");
})

module.exports = router;