"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secrets = {
    client_url: "",
    email_user: process.env.EMAIL_USER,
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017",
    authorization_secret: process.env.AUTHORIZATION_SECRET,
    token_secret: process.env.TOKEN_SECRET,
    jwt_secret: process.env.JWT_SECRET_FOR_VERIFY,
};
exports.default = secrets;
