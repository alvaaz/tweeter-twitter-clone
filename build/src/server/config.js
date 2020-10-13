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
const express_1 = __importDefault(require("express"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const routes_1 = require("../routes");
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
exports.config = (app) => {
    // Settings
    app.set("port", process.env.PORT || port);
    app.set("views", path_1.default.join(__dirname, "../views"));
    app.set("view engine", "pug");
    // Middlewares
    app.use(morgan_1.default("dev"));
    app.use(multer_1.default({ dest: path_1.default.join(__dirname, "../public/upload/temp") }).single("image"));
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    // Routes
    app.use(routes_1.router);
    // static files
    app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
    // errorhandlers
    if ("development" === app.get("env")) {
        app.use(errorhandler_1.default);
    }
    return app;
};
