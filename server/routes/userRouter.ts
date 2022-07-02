import * as express from "express";
import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import { oAuthController } from "../controllers/oAuthController";
import { cookieController } from "../controllers/cookieController";

// necassary controller to be included - only userController for now
import { userController }  from "../controllers/userController";

const router = express.Router();

const client_id = `e4a70dc5fa8c873142f8` ; 
const client_secret = `8fd567ee687f8d31c2cb525ec3a26b50a8fc3bca`;


// Router to check login info, Middleware is not ready
router.post('/login', userController.loginCheck, (request:Request, response:Response) => {
    return response.status(200).json(response.locals.verification);
});

// Router to create a new account, middleware is not ready
router.post('/signup', userController.newAccount, (request:Request, response:Response) => {
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
router.get('/github/oauth', oAuthController.getToken, oAuthController.getUserId,cookieController.setCookie, (request:Request, response:Response) => {
  response.locals.verification = true;  
  return response.status(200).send('ACCESS IS GRANTED, YOU CAN CLOSE THIS WINDOW');
} )


export default router;