"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
const db_1 = require("./db");
const browser_sync_1 = __importDefault(require("browser-sync"));
db_1.connect();
const app = server_1.config(express_1.default());
const port = app.get("port");
app.listen(port, listening);
function listening() {
    console.log("Server on port", port);
    browser_sync_1.default({
        files: ['src/**/**/*.{pug,js,css}'],
        online: false,
        open: false,
        proxy: 'localhost:' + port,
        ui: false
    });
}
