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
const mongoose_1 = require("mongoose");
const secret_1 = __importDefault(require("./secret"));
(0, mongoose_1.set)("strictQuery", false);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(secret_1.default.MONGO_URL);
        console.log("mongodb connection success!");
    }
    catch (err) {
        console.log("mongodb connection failed!", err);
    }
});
exports.default = connectDB;
