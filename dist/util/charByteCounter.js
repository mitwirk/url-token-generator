"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.charByteCounter = void 0;
function charByteCounter(char) {
    let ch = char.charCodeAt(0);
    let counter = 0;
    while (ch) {
        counter++;
        ch = ch >> 8;
    }
    return counter;
}
exports.charByteCounter = charByteCounter;
