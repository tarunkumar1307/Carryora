const express = require('express');
const productModel = require('../models/product-model');
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');

router.get("/", (req, res)=>{
    const error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isloggedin, async (req, res) => {
    const products = await productModel.find();
    res.render("shop", {products});
})

router.get("/cart", isloggedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate('cart');
    res.render("cart", { user });
})

router.get("/cart/:productid", isloggedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    res.redirect("/shop");
});

router.get("/cart/remove/:productid", isloggedin, async(req, res)=>{
    const user = await userModel.findOneAndUpdate(
        {email: req.user.email},
        {
            $pull: {cart: req.params.productid}
        },
        {new: true}
    );

    res.redirect("/cart");
})

module.exports = router;