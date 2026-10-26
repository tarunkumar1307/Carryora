const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController')

router.get("/", (req, res)=>{
    res.send("Hey, its working, user router");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/cart", (req, res)=>{
    res.render("cart");
});

module.exports = router;