"use strict";
exports.__esModule = true;
var express = require("express");
// necassary controller to be included - only userController for now
var userController_1 = require("../controllers/userController");
var router = express.Router();
// Router to check login info, Middleware is not ready
router.post('/login', userController_1.userController.loginCheck, function (request, response) {
    response.status(200).send("LOGIN SUCCESFULL");
});
// Router to create a new account, middleware is not ready
router.post('/signup', userController_1.userController.newAccount, function (request, response) {
    response.status(200).send("Your account has been created!");
});

exports["default"] = router;
