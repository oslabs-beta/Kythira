import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const client_id = `e4a70dc5fa8c873142f8` ; 
const client_secret = `8fd567ee687f8d31c2cb525ec3a26b50a8fc3bca`;



export const oAuthController = {
    //  redirectGitHub : async (req: Request, res: Response, next: NextFunction) : Promise<unknown> => {
    //     const url = `https://github.com/login/oauth/authorize?`+ 
    //                 `client_id=`+`e4a70dc5fa8c873142f8` ;
    //     res.redirect(url);
    // }
    getToken : async(req:Request, res: Response, next: NextFunction) => {
        const requestToken = req.query.code;
        
        const url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${requestToken}`;
        let token;
        try {
            token = await axios ({
                method: 'POST',
                url,
                headers: {
                    accept: 'application/json',
                }
            });
            res.locals.accessToken = token.data.access_token;
            console.log('HERE IS YOUR ACCESS CODE',res.locals.accessToken);
            return next();
        } catch(err){
        return next({
            log: `Error in Token process: ${err}`,
            message: { err: 'An error occurred'}
        })
    }
    },
    // This middleware is to get userinfo from github
    getUserId: async (req:Request, res: Response, next: NextFunction) => {
        const url = `https://api.github.com/user`;
        let currentUser;
        try{
            currentUser = await axios({
                method: 'GET',
                url,
                headers: {
                    accept: 'application/json',
                    Authorization: `token ${res.locals.accessToken}`
                }
            });
            console.log('Response: \n',currentUser.data.login);
            res.locals.githubUser = currentUser.data.login;
            // We can store user ID & access token in our db
            return next();
        }catch(err){
            return next({
                log: `Error in getUserId: ${err}`,
                message: { err: 'An error occurred'}
            })
        }
    }
}

// router.get('/github/oauth', async (req:Request, res:Response, next:NextFunction) => {
//     const requestToken = req.query.code;
//     console.log('HERE IS YOUR ACCESS CODE',requestToken);
//     const url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${requestToken}`;
//     let token;
//     try {
//             token = await axios ({
//                 method: 'POST',
//                 url,
//                 headers: {
//                     accept: 'application/json',
//                 }
//             });
//             console.log('HERE IS YOUR ACCESS TOKEN ==> ',token.data.access_token);
//     } catch(err){
//         return next({
//             log: `Error in Token process: ${err}`,
//             message: { err: 'An error occured'}
//         })
//     }
// } )