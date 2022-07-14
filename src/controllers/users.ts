import { Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models';

export const users = {
  renderSignUpForm: (req: Request, res: Response) => {
    res.render('users/signUp');
  },
  signUp: async (req: Request, res: Response) => {
    const errors = [];
    const { name, email, username, password } = req.body;
    if (password.length < 4) {
      errors.push({ text: 'Passwords must be at least 4 characters.' });
    }
    if (errors.length > 0) {
      res.render('users/signup', {
        errors,
        name,
        email,
        password
      });
    } else {
      const emailUser = await User.findOne({ email: email });
      const usernameUser = await User.findOne({ username: username });
      if (emailUser) {
        req.flash('error_msg', 'The email is already in use.');
        res.redirect('/signup');
      }
      if (usernameUser) {
        req.flash('error_msg', 'The username is already in use.');
        res.redirect('/signup');
      }
      const newUser = new User({ name, email, password, username });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered.');
      res.redirect('/signin');
    }
  },
  renderSignInForm: (req: Request, res: Response) => {
    res.render('users/signIn', { page_title: 'Sign In' });
  },
  signIn: passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/',
    failureFlash: true
  }),

  logout: (req: Request, res: Response) => {
    req.logout((err: any) => {
      console.log(err);
      res.redirect('/signin');
    });
  },

  login: (req: Request, res: Response) => {
    res.render('users/signIn', { page_title: 'Sign In', modal: true });
  }
};
