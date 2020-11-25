import express from "express";
import { config } from "./server/config";
import { connect } from "./db";
import browserSync from 'browser-sync'

const isProduction = 'production' === process.env.NODE_ENV;

connect();

const app = config(express());
const port = app.get("port")

app.listen(port, listening);

function listening() {
  console.log("Server on port", port);
  // if(!isProduction) {
    browserSync({
      files: ['src/**/**/*.{pug,js,css}'],
      online: false,
      open: false,
      proxy: 'localhost:' + port,
      ui: false
    })
  // }
}
