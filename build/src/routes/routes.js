"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const passport_1 = __importDefault(require("passport"));
exports.router = express_1.Router();
//Views
exports.router.get("/", controllers_1.home.index);
exports.router.get("/failed", (req, res) => res.send('You failed to log in'));
// router.get("/good", (req, res) => res.send(`Welcome mr ${req.user.email}`));
exports.router.get("/explore", controllers_1.home.explore);
exports.router.get("/bookmarks", controllers_1.home.bookmarks);
exports.router.get("/profile", controllers_1.home.profile);
exports.router.get("/profile/edit", controllers_1.home.edit);
exports.router.delete("/tweet/:tweet_id", controllers_1.tweet.remove);
exports.router.get("/signup", controllers_1.users.renderSignUpForm);
exports.router.post("/signup", controllers_1.users.signUp);
exports.router.get("/signin", controllers_1.users.renderSignInForm);
exports.router.post("/signin", controllers_1.users.signIn);
exports.router.get("/logout", controllers_1.users.logout);
exports.router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
exports.router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/failed' }), function (req, res) {
    res.send(req.user);
    res.send("you reached the redirect URI");
});
exports.router.post("/tweet/add", controllers_1.tweet.create);
exports.router.post("/tweet/:tweet_id/like", controllers_1.tweet.like);
exports.router.post("/tweet/:tweet_id/comment", controllers_1.tweet.comment);
