import { NextFunction, Request, Response } from 'express';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.redirect('/signin');
  }
  next();
};

export default isAuth;
