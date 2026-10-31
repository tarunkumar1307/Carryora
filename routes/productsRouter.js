const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
const isloggedin = require('../middlewares/isLoggedIn');

router.get("/", isloggedin, (req, res) => {
    res.render("admin");
})

router.post("/create", upload.single("productimage"), isloggedin, async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            contenttype: req.file.mimetype,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });

        req.flash("success", "Product created successfully");

        res.redirect("/owners/admin");
    } catch (err) {
        res.send(err.message);
    }
})

module.exports = router;