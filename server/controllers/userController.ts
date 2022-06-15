import { Request, Response, NextFunction } from 'express';
//import db from '../models/model.js';
import * as bcrypt from 'bcrypt';

import {Pool} from 'pg';
const PG_URI =  'postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq';

// create a new pool here using the connection string above
const pool = new Pool({
    connectionString: PG_URI,
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit : 0
});

const currentTable = `CREATE TABLE IF NOT EXISTS "user"(
    _id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    pw VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL
    );`;
pool.query(currentTable);
console.log("Current Table is created!");


export const userController = {
    loginCheck : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> =>{
        try{
            console.log('Login Check in process');
            const username : string = req.body.username;
            const password : string = req.body.password;
            const findUserPw  = `SELECT pw FROM "user" WHERE "username" = '${username}';`;
            const data: any = await pool.query(findUserPw);
            const storedPw: string = await data.rows[0].pw;
            console.log("STORED PASSWORD", storedPw);
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
    },

    newAccount : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> =>{
        try{
            console.log("Account creation in progress");
            const {username, email, password} : {username:string, email:string, password:string} = req.body
            console.log("Request Body:", username, email, password);
            const hashedPassword : string = await bcrypt.hash(password, 10);
            console.log("Hashed Password:", hashedPassword);

            const createUser = `INSERT INTO "user" (username, pw, email) VALUES ($1, $2, $3);`;
            const newUserDetails : string[] = [`${username}`, `${hashedPassword}`, `${email}`];
            const tempData : any = await pool.query(createUser, newUserDetails);
            const findNewUser = `SELECT * FROM "user" WHERE "username" = '${username}';`
            const data: any = await pool.query(findNewUser);
            const newUserId: number = await data.rows[0]._id;
            // const newUser : any = await tempData;
            res.locals.newUserId = newUserId;
            return next();
        }catch(err){
            return next({
                log: `Error in userController.newAccount: ${err}`,
                message: { err: 'An error in userController.newAccount'}
            })
        }
    }
}

// newAccount : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> =>{
//     try{
//         console.log("Account creation in progress");
//         const {username, email, password} : {username:string, email:string, password:string} = req.body
//         const hashedPassword : string = await bcrypt.hash(password, 10);
//         const createUser : string = `INSERT INTO "user" (username, pw, email) VALUES ($1, $2, $3)`;
//         const newUserDetails : string[] = [username, hashedPassword, email];
//         const tempData : any = await pool.query(createUser, newUserDetails);
//         const newUser : any = await tempData;
//         res.locals.newUser = newUser;
//         return next();
//     }catch(err){
//         return next({
//             log: `Error in userController.newAccount: ${err}`,
//             message: { err: 'An error in userController.newAccount'}
//         })
//     }