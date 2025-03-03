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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const blacklist_model_1 = __importDefault(require("../model/blacklist.model"));
const user_model_1 = __importDefault(require("./../model/user.model"));
const token_1 = require("./../utils/token");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_model_1.default.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                message: "email already exist",
            });
        }
        const savedUser = yield user_model_1.default.create(req.body);
        yield savedUser.save({ validateBeforeSave: false });
        return res.status(200).json({
            message: "User signup successful",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.signup = signup;
// user login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide your credentials",
            });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "No user found. Please create an account",
            });
        }
        //@ts-expect-error
        const isPasswordValid = user.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Password is not correct",
            });
        }
        if (user.status === "BANNED") {
            return res.status(400).json({
                message: "The user is banned",
            });
        }
        const token = (0, token_1.generateToken)(user);
        const _a = user.toObject(), { password: pwd } = _a, info = __rest(_a, ["password"]);
        return res.status(200).json({
            message: "Login successful",
            data: Object.assign(Object.assign({}, info), { token }),
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, token_1.getBearerToken)(req);
        yield blacklist_model_1.default.create({ token: token });
        res.status(200).json({
            message: "Logout successful",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.logout = logout;
