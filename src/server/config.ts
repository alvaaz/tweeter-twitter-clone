import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import multer from "multer";
import express, { Application } from "express";
import errorHandler from "errorhandler";

import { router } from "../routes";

dotenv.config();

const port = process.env.SERVER_PORT;

export const config = (app: Application) => {
  // Settings
  app.set("port", process.env.PORT || port);
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "pug");

  app.locals.basedir = path.join(__dirname, "../");

  // Middlewares
  app.use(morgan("dev"));
  app.use(
    multer({ dest: path.join(__dirname, "../public/upload/temp") }).any()
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Routes

  app.use(router);

  // static files

  app.use("/public", express.static(path.join(__dirname, "../public")));

  // errorhandlers

  if ("development" === app.get("env")) {
    app.use(errorHandler);
  }

  return app;
};
