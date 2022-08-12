import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  OAuth2Strategy as GoogleStrategy,
  Profile,
  VerifyFunction
} from 'passport-google-oauth';
import { User, UserDocument } from '../models';
import { Request } from 'express';
import dotenv from 'dotenv';
import { CallbackError, Error } from 'mongoose';

dotenv.config();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});


passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err: CallbackError, user: UserDocument) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(undefined, false, {
            message: `Email ${email} not found.`
          });
        }
        user.matchPassword(password, (err: Error, isMatch: boolean) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(undefined, user);
          }
          return done(undefined, false, {
            message: 'Invalid email or password.'
          });
        });
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:3001/auth/google/callback',
      passReqToCallback: true
    },
    (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyFunction
    ) => {
      console.log('pasa por acá')
      User.findOne(
        { email: profile._json.email },
        (err: CallbackError, existingEmailUser: UserDocument) => {
          if (err) {
            console.log(err, )
            return done(err);
          }
          if (existingEmailUser) {
            console.log('existe');
            req.flash(
              'error_msg',
              'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.'
            );
            done(err);
          } else {
            const user: UserDocument = new User();
            user.email = profile._json.email;
            user.google = profile.id;
            user.tokens.push({ kind: 'google', accessToken });
            user.profile.name = profile._json.name;
            user.profile.picture = profile._json.picture;
            user.save((err: CallbackError) => {
              done(err, user);
            });
          }
        }
      );
    }
  )
);
