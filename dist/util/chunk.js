"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkIterator = void 0;
const charByteCounter_1 = require("./charByteCounter");
function* chunkIterator(text, maxBytes) {
    let byteCounter = 0;
    let buildString = "";
    for (const char of text) {
        const bytes = (0, charByteCounter_1.charByteCounter)(char);
        if (byteCounter + bytes > maxBytes) {
            yield buildString;
            buildString = char;
            byteCounter = bytes;
            continue;
        }
        buildString += char;
        byteCounter += bytes;
    }
    yield buildString;
}
exports.chunkIterator = chunkIterator;
