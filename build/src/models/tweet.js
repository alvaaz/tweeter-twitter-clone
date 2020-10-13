"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
const TweetSchema = new mongoose_1.Schema({
    content: { type: String },
    image: { type: String },
    retweets: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
});
TweetSchema.virtual("uniqueId").get(function () {
    return this.image.replace(path_1.default.extname(this.image), "");
});
exports.Tweet = mongoose_1.model("Tweet", TweetSchema);
