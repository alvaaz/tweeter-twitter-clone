import { Request, Response } from "express";
import passport from "passport";
import { User } from "../models";

export const users = {
  renderSignUpForm: (req: Request, res: Response) => {
    res.render("users/signUp");
  },
  signUp: async (req: Request, res: Response) => {
    const errors = []
    const { name, email, password } = req.body
    if(password.length < 4) {
      errors.push({text: 'Passwords must be at least 4 characters.'})
    }
    if(errors.length > 0) {
      res.render("users/signup", {
        errors,
        name,
        email,
        password
      });
    } else {
      const emailUser = await User.findOne({email: email})
      if(emailUser) {
        req.flash('error_msg', 'The email is already in use.')
        res.redirect('/users/signup')
      } else {
        const newUser = new User({name, email, password})
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save()
        req.flash("success_msg", "You are registered.");
        res.redirect('/signin')
      }
    }
  },
  renderSignInForm: (req: Request, res: Response) => {
    res.render("users/signIn");
  },
  signIn: passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/',
    failureFlash: true
  }),

  logout: (req: Request, res: Response) => {
    res.send("logout");
  },
};
