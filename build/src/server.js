"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = __importDefault(require("multer"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = require("./routes");
require("./config/passport");
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
exports.config = (app) => {
    // Settings
    app.set("port", process.env.PORT || port);
    app.set("views", path_1.default.join(__dirname, "./views"));
    app.set("view engine", "pug");
    app.use(express_session_1.default({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(connect_flash_1.default());
    // Global variables
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });
    app.locals.basedir = path_1.default.join(__dirname, "./");
    // Middlewares
    app.use(morgan_1.default("dev"));
    app.use(multer_1.default({ dest: path_1.default.join(__dirname, "./public/upload/temp") }).any());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    // Routes
    app.use(routes_1.router);
    // static files
    app.use("/public", express_1.default.static(path_1.default.join(__dirname, "./public")));
    // errorhandlers
    if ("development" === app.get("env")) {
        app.use(errorhandler_1.default);
    }
    return app;
};
