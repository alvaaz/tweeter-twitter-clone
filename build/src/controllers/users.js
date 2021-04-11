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
exports.users = void 0;
const passport_1 = __importDefault(require("passport"));
const models_1 = require("../models");
exports.users = {
    renderSignUpForm: (req, res) => {
        res.render("users/signUp");
    },
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = [];
        const { name, email, password } = req.body;
        if (password.length < 4) {
            errors.push({ text: 'Passwords must be at least 4 characters.' });
        }
        if (errors.length > 0) {
            res.render("users/signup", {
                errors,
                name,
                email,
                password
            });
        }
        else {
            const emailUser = yield models_1.User.findOne({ email: email });
            if (emailUser) {
                req.flash('error_msg', 'The email is already in use.');
                res.redirect('/users/signup');
            }
            else {
                const newUser = new models_1.User({ name, email, password });
                newUser.password = yield newUser.encryptPassword(password);
                yield newUser.save();
                req.flash("success_msg", "You are registered.");
                res.redirect('/signin');
            }
        }
    }),
    renderSignInForm: (req, res) => {
        res.render("users/signIn");
    },
    signIn: passport_1.default.authenticate('local', {
        failureRedirect: '/users/signin',
        successRedirect: '/',
        failureFlash: true
    }),
    logout: (req, res) => {
        res.send("logout");
    },
};
