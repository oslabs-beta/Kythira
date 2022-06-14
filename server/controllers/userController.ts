import { Request, Response, NextFunction } from 'express';
import db from '../models/model.js';
import bcrypt from 'bcrypt';

class userController {
    loginCheck = async (req: Request, res: Response, next: NextFunction) : Promise<unknown> =>{
        try{
            console.log('Login Check in process');
            const username : string = req.body.username;
            const password : string = req.body.password;
            const findUserPw : string = `SELECT pw FROM "user" WHERE "username" = '${username}'`;
            const storedPw: string = await db.query(findUserPw).rows[0].pw;
            const passwordVerified : boolean = await bcrypt.compare(password, storedPw);
            if (passwordVerified){
                return next();
            }else{
                throw new Error('Incorrect username/password');
            }
        }catch(err){
            return next({
                log: `Error i userController.loginCheck: ${err}`,
                message: { err: 'An error in userController.loginCheck'}
            })
        }
    }

    newAccount = async (req: Request, res: Response, next: NextFunction) : Promise<unknown> =>{
        try{
            console.log("Account creation in progress");
            const {username, email, password} : {username:string, email:string, password:string} = req.body
            // const username : string = req.body.username;
            // const email : string = req.body.email;
            // const password : string = req.body.password;
            const hashedPassword : string = await bcrypt.hash(password, 10);
            const createUser : string = 'INSERT INTO "user" (username, pw, email) VALUES ($1, $2, $3)';
            const newUserDetails : string[] = [username, hashedPassword, email];
            const newUser : Object = await db.query(createUser, newUserDetails).rows[0];
            res.locals.newUser = newUser;
            return next();
        }catch(err){
            return next({
                log: `Error in userController.newAccount: ${err}`,
                message: { err: 'An error in userController.newAccount'}
            })
        }
    }
}

module.exports = userController;
