"use strict";
exports.__esModule = true;
var express = require("express");
var oAuthController_1 = require("../controllers/oAuthController");
// necassary controller to be included - only userController for now
var userController_1 = require("../controllers/userController");
var router = express.Router();
var client_id = "e4a70dc5fa8c873142f8";
var client_secret = "8fd567ee687f8d31c2cb525ec3a26b50a8fc3bca";
// Router to check login info, Middleware is not ready
router.post('/login', userController_1.userController.loginCheck, function (request, response) {
    return response.status(200).json(response.locals.verification);
});
// Router to create a new account, middleware is not ready
router.post('/signup', userController_1.userController.newAccount, function (request, response) {
    return response.status(200).json(response.locals.newUserId);
});
// This router will redirect the user to the github authentication page along with client id & callback url
//https://github.com/login/oauth/authorize?client_id=e4a70dc5fa8c873142f8
// router.get('/github/signin', (req:Request, res:Response) => {
//     console.log("GITHUB SIGNIN IN PROGRESS");
//     const url = `https://github.com/login/oauth/authorize?`+ 
//                     `client_id=`+`${client_id}` ;
//     //JUST TO WALK AROUND CROSS ORIGIN POLICY
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");               
//     res.redirect(url);
// } )
// This router will get the access code after successful login
// Then send a post request to github to get the token
// NOTE : Will we save this token in the db or once github grants permision, we will just allow the user get in the app?
router.get('/github/oauth', oAuthController_1.oAuthController.getToken, oAuthController_1.oAuthController.getUserId, function (request, response) {
    return response.status(200).send('YOU HAVE GOT YOUR ACCESS TOKEN!');
});
exports["default"] = router;
