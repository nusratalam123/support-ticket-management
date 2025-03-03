"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const router = (0, express_1.Router)();
// register new user
router.post("/signup", auth_controller_1.signup);
// user login
router.post("/login", auth_controller_1.login);
// user logout
router.delete("/logout", auth_controller_1.logout);
exports.default = router;
