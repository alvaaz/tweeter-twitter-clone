"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./server/config");
const db_1 = require("./db");
db_1.connect();
const app = config_1.config(express_1.default());
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});
