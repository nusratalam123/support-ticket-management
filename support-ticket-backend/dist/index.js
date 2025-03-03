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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("./config/db"));
const secret_1 = __importDefault(require("./config/secret"));
const blacklist_model_1 = __importDefault(require("./model/blacklist.model"));
const middleware_1 = __importDefault(require("./shared/middleware"));
const route_1 = __importDefault(require("./shared/route"));
const token_1 = require("./utils/token");
const app = (0, express_1.default)();
const PORT = secret_1.default.PORT;
// implement middleware
app.use(middleware_1.default);
// jwt bearer token
app.use("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.path === "/api/v1/auth/login" || req.path === "/api/v1/auth/signup") {
        next();
        return;
    }
    try {
        const isTokenExist = yield (0, token_1.verifyToken)(req);
        if (!isTokenExist) {
            throw new Error("Unauthorized");
        }
        const token = yield (0, token_1.getBearerToken)(req);
        const isRevoked = yield blacklist_model_1.default.find({ token: token });
        if (isRevoked.length != 0) {
            throw new Error("Revoked");
        }
        //@ts-expect-error
        jsonwebtoken_1.default.verify(req.token, secret_1.default.jwt_secret, (err) => {
            if (err) {
                throw new Error("Forbidden");
            }
            else {
                next();
            }
        });
    }
    catch (err) {
        return res.status(403).json({
            message: err.message,
        });
    }
}));
// connect to database
(0, db_1.default)();
// define routes
app.use("/api/v1", route_1.default);
// listen to port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
exports.default = app;
