import express from "express";
import { config } from "./server/config";
import { connect } from "./db";

connect();
const app = config(express());

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
