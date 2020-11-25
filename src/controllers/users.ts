import { Request, Response } from "express";

export const users = {
  renderSignUpForm: (req: Request, res: Response) => {
    res.render("users/signUp");
  },
  signUp: (req: Request, res: Response) => {
    const errors = []
    const { email, password } = req.body
    if(errors.length > 0) {
      res.render('users/signup')
    }
  },
  renderSignInForm: (req: Request, res: Response) => {
    res.render("users/signIn");
  },
  signIn: (req: Request, res: Response) => {
    res.send("signip");
  },
  logout: (req: Request, res: Response) => {
    res.send("logout");
  },
};
