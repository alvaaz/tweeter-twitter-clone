import { Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_API_KEY
  }
})

export const users = {
  renderSignUpForm: (req: Request, res: Response) => {
    res.render('users/login', {
      title: 'Sign Up'
    });
    res.status(200).json({ data: 'ok' });
  },
  signUp: async (req: Request, res: Response) => {
    const errors = [];
    const { name, email, username, password } = req.body;
    const emailUser = await User.findOne({ email: email });
    const usernameUser = await User.findOne({ username: username });
    if (emailUser) {
      req.flash('error_msg', 'The email is already in use.');
      errors.push({ text:  'The email is already in use.' });
    }
    if (usernameUser) {
      req.flash('error_msg', 'The username is already in use.');
      errors.push({ text: 'The username is already in use.' });
    }
    if (password.length < 4) {
      errors.push({ text: 'Passwords must be at least 4 characters.' });
    }
    if (errors.length > 0) {
      res.render('users/login', {
        errors,
        name,
        email,
        password
      });
    } else {
      const newUser = new User({ name, email, password, username });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered.');
      res.redirect('/login');
    }
  },

  signIn: passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
  }),

  renderReset: (req: Request, res: Response) => {
    crypto.randomBytes(32, (err, buffer) => {
      if(err) {
        console.log(err);
        return res.redirect('/');
      }
      const token = buffer.toString('hex');
      User.findOne({ email: req.body.email })

        .then((user: any) => {
          if (!user) {
            req.flash('error_msg', 'No account with that email found.');
            return res.redirect('/login');
          }
          user.resetToken = token;
          user.resetTokenExpiration = new Date(Date.now() + 3600000);
          console.log(user.resetTokenExpiration, 'expiration');
          return user.save();
        })

        .then(result => {
          console.log(req.body.email, 'REQUEST')
          res.redirect('/');
          transporter.sendMail({
            from: "alvaaz_@hotmail.com",
            to: req.body.email,
            subject: "Test message subject",
            text: "Hello world!",
            html: `
              <p>You requested a password reset</p>
              <p>Click this <a href="http://localhost:3000/auth/reset/${token}">link</a> to reset your password</p>
            `,
          }, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        })

        .catch(err => {
          console.log(err)
        })

    })
  },

  reset: async (req: Request, res: Response) => {
    const token = req.params.token;
    console.log(token, 'TOKEN')

    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: new Date() } });
    if (!user) {
      req.flash('error_msg', 'Password reset token is invalid or has expired.');
      return res.redirect('/login');
    }
    res.render('users/reset', {
      userId: user._id.toString(),
      passwordToken: token,
      page_title: 'Reset Password'
    });
  },

  newPassword: async (req: Request, res: Response) => {
    const { userId, password, passwordToken } = req.body;

    const user = await User.findOne({ resetToken: passwordToken, resetTokenExpiration: { $gt: new Date() }, _id: userId });

    if (!user) {
      req.flash('error_msg', 'User not found.');
      return res.redirect('/login');
    }
    console.log(password, 'PASSWORD')
    user.password = await user.encryptPassword(password);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    console.log(password, user.password, 'PASSWORD')
    await user.save();
    req.flash('success_msg', 'Your password has been updated.');
    res.redirect('/login');
  },

  logout: (req: Request, res: Response) => {
    req.logout((err) => {
      console.log(err);
      res.redirect('/login');
    });
  },

  login: (req: Request, res: Response) => {
    res.render('users/login', { page_title: 'Sign In' });
  }
};
