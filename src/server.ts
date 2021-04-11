import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import multer from "multer";
import session from "express-session";
import express, { Application } from "express";
import errorHandler from "errorhandler";
import flash from 'connect-flash'
import passport from 'passport'
import { router } from "./routes";
import './config/passport'
dotenv.config();

const port = process.env.SERVER_PORT;

export const config = (app: Application) => {
  // Settings
  app.set("port", process.env.PORT || port);
  app.set("views", path.join(__dirname, "./views"));
  app.set("view engine", "pug");

  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())

  // Global variables
  app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
  })

  app.locals.basedir = path.join(__dirname, "./");


  // Middlewares
  app.use(morgan("dev"));
  app.use(
    multer({ dest: path.join(__dirname, "./public/upload/temp") }).any()
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Routes

  app.use(router);

  // static files

  app.use("/public", express.static(path.join(__dirname, "./public")));

  // errorhandlers

  if ("development" === app.get("env")) {
    app.use(errorHandler);
  }

  return app;
};
