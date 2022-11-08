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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptUrlToken = exports.generateUrlToken = void 0;
const chunk_1 = require("./util/chunk");
const queryString = __importStar(require("query-string"));
const MAX_CHUNK_BYTE = 200;
const generateUrlToken = (queryString, publicKeyFromPem) => __awaiter(void 0, void 0, void 0, function* () {
    const JSEncrypt = (yield Promise.resolve().then(() => __importStar(require("jsencrypt")))).default;
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(publicKeyFromPem);
    const base64EncodedQueryString = Buffer.from(queryString, "utf-8").toString("base64");
    let token = "";
    for (const s of (0, chunk_1.chunkIterator)(base64EncodedQueryString, MAX_CHUNK_BYTE)) {
        token += `${jsencrypt.encrypt(s)},`;
    }
    return token.slice(0, -1);
});
exports.generateUrlToken = generateUrlToken;
const decryptUrlToken = (tokenFromUrl, privateKeyFromPem) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedToken = queryString.parse(`token=${tokenFromUrl}`, {
        arrayFormat: "comma",
        decode: false,
    });
    if (parsedToken.token && Array.isArray(parsedToken.token)) {
        const JSEncrypt = (yield Promise.resolve().then(() => __importStar(require("jsencrypt")))).default;
        const jsencrypt = new JSEncrypt();
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
        const decodedToken = Buffer.from(decryptedToken, "base64").toString("utf-8");
        return decodedToken;
    }
    return null;
});
exports.decryptUrlToken = decryptUrlToken;
