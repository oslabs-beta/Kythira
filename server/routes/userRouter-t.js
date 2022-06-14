const express = require("express");

// necassary controller to be included - only userController for now
const userController = require("../controllers/userController")

const router = express.Router();

// Router to check login info, Middleware is not ready
router.post('/login', userController.loginCheck, (req,res) => {
    res.status(200).send("LOGIN SUCCESFULL");
});

// Router to create a new account, middleware is not ready
router.post('/signup', userController.newAccount, (req,res) => {
    res.status(200).send("Your account has been created!");
})



module.exports = router;