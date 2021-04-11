import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { OAuth2Strategy as GoogleStrategy, Profile, VerifyFunction } from 'passport-google-oauth';
import { User, UserDocument } from "../models";
import { Request } from "express";


// passport.serializeUser<any, any>((user, done) => {
//   done(null, user.id)
// })

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({email: email.toLowerCase()}, (err, user:any) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.matchPassword(password, (err: Error, isMatch: boolean) => {
      console.log(isMatch)
      if (err) { return done(err); }
      if (isMatch) {
        return done(undefined, user);
      }
      return done(undefined, false, { message: "Invalid email or password." });
    });
  })
}))

passport.use(new GoogleStrategy({
  clientID: "266338008439-54m5fgbrtlu9f9emh986pet25f4svhiq.apps.googleusercontent.com",
  clientSecret: "lVCSee8paNuOXPOTSmp0dggV",
  callbackURL: "http://localhost:3000/google/callback",
  passReqToCallback: true
  },
  ( req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyFunction) => {
    User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
      if (err) { return done(err); }
      if (existingEmailUser) {
        console.log('existe')
        req.flash("errors", "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings." );
        done(err);
      } else {
        const user: UserDocument = new User();
        user.email = profile._json.email;
        user.google = profile.id;
        user.tokens.push({ kind: "google", accessToken });
        user.profile.name = profile._json.name;
        user.profile.picture = profile._json.picture;
        user.save((err: Error) => {
          done(err, user);
        });
      }
    });
  }
));
