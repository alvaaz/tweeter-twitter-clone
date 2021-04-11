"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_google_oauth_1 = require("passport-google-oauth");
const models_1 = require("../models");
// passport.serializeUser<any, any>((user, done) => {
//   done(null, user.id)
// })
passport_1.default.deserializeUser((id, done) => {
    models_1.User.findById(id, (err, user) => {
        done(err, user);
    });
});
/**
 * Sign in using Email and Password.
 */
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email'
}, (email, password, done) => {
    models_1.User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.matchPassword(password, (err, isMatch) => {
            console.log(isMatch);
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));
passport_1.default.use(new passport_google_oauth_1.OAuth2Strategy({
    clientID: "266338008439-54m5fgbrtlu9f9emh986pet25f4svhiq.apps.googleusercontent.com",
    clientSecret: "lVCSee8paNuOXPOTSmp0dggV",
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    models_1.User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (err) {
            return done(err);
        }
        if (existingEmailUser) {
            console.log('existe');
            req.flash("errors", "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.");
            done(err);
        }
        else {
            const user = new models_1.User();
            user.email = profile._json.email;
            user.google = profile.id;
            user.tokens.push({ kind: "google", accessToken });
            user.profile.name = profile._json.name;
            user.profile.picture = profile._json.picture;
            user.save((err) => {
                done(err, user);
            });
        }
    });
}));
