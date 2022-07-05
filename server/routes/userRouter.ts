import * as express from 'express';
import { Request, Response } from 'express';
import { oAuthController } from '../controllers/oAuthController';

// necassary controller to be included - only userController for now
import { userController }  from '../controllers/userController';

const router = express.Router();

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
});

export default router;