"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweet = void 0;
const models_1 = require("../models");
const path_1 = __importDefault(require("path"));
const libs_1 = require("../helpers/libs");
const fs_extra_1 = __importDefault(require("fs-extra"));
exports.tweet = {
    index: (req, res) => {
        res.send("Index image");
    },
    create: (req, res) => {
        //@ts-ignore
        // req.file
        const saveTweet = () => __awaiter(void 0, void 0, void 0, function* () {
            //@ts-ignore
            const imgUrl = libs_1.helpers.randomNumber();
            const images = yield models_1.Tweet.find({ image: imgUrl });
            if (images.length > 0) {
                saveTweet();
            }
            else {
                //@ts-ignore
                const imageTempPath = req.files[0].path;
                //@ts-ignore
                const ext = path_1.default.extname(req.files[0].originalname).toLowerCase();
                const targetPath = path_1.default.resolve(`src/public/upload/${imgUrl}${ext}`);
                if (ext === ".png" ||
                    ext === ".jpg" ||
                    ext === ".jpeg" ||
                    ext === ".gif") {
                    yield fs_extra_1.default.rename(imageTempPath, targetPath);
                    const newTweet = new models_1.Tweet({
                        content: req.body.content,
                        image: imgUrl + ext,
                    });
                    yield newTweet.save();
                    res.send("works");
                }
                else {
                    yield fs_extra_1.default.unlink(imageTempPath);
                    res.status(500).json({ error: "Only images are allowed" });
                }
            }
        });
        saveTweet();
    },
    like: (req, res) => {
        res.send("Index image");
    },
    comment: (req, res) => {
        res.send("Index image");
    },
    remove: (req, res) => {
        res.send("Index image");
    },
};
