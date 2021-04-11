import express from "express";
import { config } from "./server";
import { connect } from "./db";
import browserSync from 'browser-sync'

connect();

const app = config(express());
const port = app.get("port")

app.listen(port, listening);

function listening() {
  console.log("Server on port", port);
    browserSync({
      files: ['src/**/**/*.{pug,js,css}'],
      online: false,
      open: false,
      proxy: 'localhost:' + port,
      ui: false
    })
}
