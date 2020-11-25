import { Router } from "express";
import { home, tweet, users } from "../controllers";

export const router = Router();

//Views
router.get("/", home.index);
router.get("/explore", home.explore);
router.get("/bookmarks", home.bookmarks);
router.get("/profile", home.profile);

router.post("/tweet/add", tweet.create);
router.post("/tweet/:tweet_id/like", tweet.like);
router.post("/tweet/:tweet_id/comment", tweet.comment);
router.delete("/tweet/:tweet_id", tweet.remove);

router.get("/users/signup", users.renderSignUpForm);
router.post("/users/signup", users.signUp);
router.get("/users/signin", users.renderSignInForm);
router.post("/users/signup", users.signIn);
router.get("/users/logout", users.logout);
