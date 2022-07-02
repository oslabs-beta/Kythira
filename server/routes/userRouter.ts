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

// This router will get the access code after successful login
// Then send a post request to github to get the token
router.get('/github/oauth', oAuthController.getToken, oAuthController.getUserId, (request:Request, response:Response) => {
    return response.status(200).redirect('koob-app:/localhost:9000');
} )



export default router;