"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsencrypt_1 = __importDefault(require("jsencrypt"));
const chunk_1 = require("./util/chunk");
const queryString = __importStar(require("query-string"));
function generateUrlToken(queryString, publicKeyFromPem) {
    const jsencrypt = new jsencrypt_1.default();
    jsencrypt.setPublicKey(publicKeyFromPem);
    const base64EncodedQueryString = btoa(queryString);
    let token = "token=";
    for (const s of (0, chunk_1.chunk)(base64EncodedQueryString, 200)) {
        token += `${jsencrypt.encrypt(s)},`;
    }
    return token.slice(0, -1);
}
function decryptUrlToken(tokenFromUrl, privateKeyFromPem) {
    const parsedToken = queryString.parse(tokenFromUrl, {
        arrayFormat: "comma",
        decode: false,
    });
    if (parsedToken.token && Array.isArray(parsedToken.token)) {
        const jsencrypt = new jsencrypt_1.default();
        jsencrypt.setPrivateKey(privateKeyFromPem);
        let decryptedToken = "";
        for (const chunk of parsedToken.token) {
            const decryptedChunk = jsencrypt.decrypt(chunk);
            if (decryptedChunk) {
                decryptedToken += decryptedChunk;
            }
            else {
                throw new Error(`Decryption of chunk failed, returned ${false} for chunk ${chunk}`);
            }
        }
        const decodedToken = atob(decryptedToken);
        return decodedToken;
    }
    return null;
}
exports.default = { generateUrlToken, decryptUrlToken };