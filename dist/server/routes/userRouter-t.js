var express = require("express");
// necassary controller to be included - only userController for now
var userController = require("../controllers/userController");
var router = express.Router();
// Router to check login info, Middleware is not ready
router.post('/login', userController.loginCheck, function (req, res) {
    res.status(200).send("LOGIN SUCCESFULL");
});
// Router to create a new account, middleware is not ready
router.post('/signup', userController.newAccount, function (req, res) {
    res.status(200).send("Your account has been created!");
});
module.exports = router;
//# sourceMappingURL=userRouter-t.js.map