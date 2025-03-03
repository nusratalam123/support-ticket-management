"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBearerToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = __importDefault(require("../config/secret"));
// generate jwt token
const generateToken = (user) => {
    const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(payload, secret_1.default.jwt_secret, {
        expiresIn: "2d",
    });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            return true;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        return false;
    }
});
exports.verifyToken = verifyToken;
const getBearerToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            //@ts-expect-error
            req.token = bearerToken;
            return bearerToken;
        }
        else {
            throw new Error("Token is unavailable");
        }
    }
    catch (err) {
        return err;
    }
});
exports.getBearerToken = getBearerToken;
