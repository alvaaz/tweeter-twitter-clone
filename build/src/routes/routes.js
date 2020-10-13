"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = express_1.Router();
//Views
exports.router.get("/", controllers_1.home.index);
exports.router.get("/explore", controllers_1.home.explore);
exports.router.get("/bookmarks", controllers_1.home.bookmarks);
exports.router.get("/profile", controllers_1.home.profile);
exports.router.post("/tweet", controllers_1.tweet.create);
exports.router.post("/tweet/:tweet_id/like", controllers_1.tweet.like);
exports.router.post("/tweet/:tweet_id/comment", controllers_1.tweet.comment);
exports.router.delete("/tweet/:tweet_id", controllers_1.tweet.remove);
