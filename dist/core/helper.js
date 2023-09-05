"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomContinusId = void 0;
function getRandomContinusId() {
    return (new Date().getTime().toString(36) +
        Math.round(Math.random() * 1000000000).toString(36));
}
exports.getRandomContinusId = getRandomContinusId;
