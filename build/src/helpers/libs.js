"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpers = void 0;
exports.helpers = {
    randomNumber: () => {
        const possible = "abcdefghjklmopqrstuvwxyz0123456789";
        let randomNumber = "";
        for (let i = 0; i < 6; i++) {
            randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return randomNumber;
    },
};
