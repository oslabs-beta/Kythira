//Import database model
const db = require('../models/model.js');
const bcrypt = require('bcrypt');
const userController = {};

// We should implement bycrypt to protect the passwords

//Assuming credentials comes as followings; username & password
userController.loginCheck = async (req, res, next) => {
    try{
    console.log("Login Check in process");
    //Destructure to grab the username and password
    const {username, password} = req.body;
    //Use the username constant to find the user in the database and pull the password column
    const findUserPw = `SELECT pw FROM "user" WHERE "username" = '${username}'`;
    const data = await db.query(findUserPw);
    //Use bcrypt compare method of compare the input password and password in database
    // console.log('Data:',data);
    console.log('Terry password:************',data.rows[0].pw);
    console.log(password);
    const passwordVerified = await bcrypt.compare(password, data.rows[0].pw);
    console.log('Password',passwordVerified);
    //If there is a response (=password is verified) go the next middleware
    //if (passwordVerified) return next();
    //If there is not a response, password authentication failed
    // else return next();//throw new Error('Incorrect username/password')
    if (passwordVerified) {
        return next();
    }
    else {
        throw new Error('Incorrect username/password');
    }
    }
    catch(err){
        return next({
            log: `Error i userController.loginCheck: ${err}`,
            message: { err: 'An error in userController.loginCheck'}
        })
    }
    
};
// Assuming, name, email, password
userController.newAccount = async (req, res, next) => {
    try{
    console.log("Account creation in progress");
    //Destructure to grab the username, email, password from request
    const { username, email, password } = req.body;
    //Hash the input password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //Use the username, email and the newly created hashedpassword to create a new user in the database
    const createUser = 'INSERT INTO "user" (username, pw, email) VALUES ($1, $2, $3)';
    const newUserDetails = [username, hashedPassword, email];
    const data = await db.query(createUser, newUserDetails);
    const newUser = await data.rows[0];
    res.locals.newUser = newUser;
    return next();
    }
    catch(err){
        return next({
            log: `Error in userController.newAccount: ${err}`,
            message: { err: 'An error in userController.newAccount'}
        })
    }

    // const currentQuery = `Insert into users (username,)`
};

// We should export the userController
module.exports = userController;