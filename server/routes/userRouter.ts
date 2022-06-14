import * as express from "express";
import { Request, Response, NextFunction } from "express";

// necassary controller to be included - only userController for now
import { userController }  from "../controllers/userController";

const router = express.Router();

// Router to check login info, Middleware is not ready
router.post('/login', userController.loginCheck, (request:Request, response:Response) => {
    response.status(200).send("LOGIN SUCCESFULL");
});

// Router to create a new account, middleware is not ready
router.post('/signup', userController.newAccount, (request:Request, response:Response) => {
    response.status(200).send("Your account has been created!");
})



export default router;