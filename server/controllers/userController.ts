import { Request, Response, NextFunction } from 'express';
//import db from '../models/model.js';
import * as bcrypt from 'bcrypt';
import {Pool} from 'pg';
let PG_URI = '';

// To set up the test environment, packages: cross-env (npm i -D cross-env)
// In package.json we had to add a new script called "test"
// In the "test" script, we set the process.env.NODE_ENV to test
// Set conditional statement to check if server is running on "test" or development

//NEED TO MOVE THESE PG_URIs to an ENV file
if(process.env.NODE_ENV === 'test'){
  PG_URI = 'postgres://vwfofczb:Jy7dhkeZsVCm5HhzcWJaF1DkCGRBALB4@queenie.db.elephantsql.com/vwfofczb';
}else PG_URI =  'postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq';

// create a new pool here using the connection string above
export const pool = new Pool({
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


export const userController = {
  loginCheck : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> =>{
    try{
      //Same middleware to be used for github authentication
      if(res.locals.githubUser){
        res.locals.verification = true;
        return next();
      }
      const username : string = req.body.username;
      const password : string = req.body.password;
      const findUserPw  = `SELECT pw FROM "user" WHERE "username" = '${username}';`;
      const data: any = await pool.query(findUserPw);
      const storedPw: string = await data.rows[0].pw;
      const passwordVerified : boolean = await bcrypt.compare(password, storedPw);  
      res.locals.verification = passwordVerified;
      return next();
    }catch(err){
      return next({
        log: `Error i userController.loginCheck: ${err}`,
        message: { err: 'An error in userController.loginCheck'}
      });
    }
  },

  newAccount : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> =>{
    try{

      const {username, email, password} : {username:string, email:string, password:string} = req.body;
      const hashedPassword : string = await bcrypt.hash(password, 10);
      const createUser = 'INSERT INTO "user" (username, pw, email) VALUES ($1, $2, $3);';
      const newUserDetails : string[] = [`${username}`, `${hashedPassword}`, `${email}`];
      const tempData : any = await pool.query(createUser, newUserDetails);
      const findNewUser = `SELECT * FROM "user" WHERE "username" = '${username}';`;
      const data: any = await pool.query(findNewUser);
      const newUserId: number = await data.rows[0]._id;
      // const newUser : any = await tempData;
      res.locals.newUserId = newUserId;
      return next();
    }catch(err){
      return next({
        log: `Error in userController.newAccount: ${err}`,
        message: { err: 'An error in userController.newAccount'}
      });
    }
  }
};
