import { Request, Response, NextFunction } from 'express';


export const cookieController = {

  setCookie: async(req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie('login_name', res.locals.githubUser, {
        secure:true,
        httpOnly:true,
      });
      res.cookie('access_token', res.locals.accessToken, {
        secure:true,
        httpOnly:true,
      });
      return next();
    } catch(err){
      return next({
        log: `Error in Cookie process: ${err}`,
        message: { err: 'An error occurred'}
      });
    }
  }
};
