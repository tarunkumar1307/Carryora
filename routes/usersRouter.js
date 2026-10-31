const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const isloggedin = require('../middlewares/isLoggedIn');

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", isloggedin, logoutUser);

module.exports = router;