"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./../routes/auth.route"));
const user_route_1 = __importDefault(require("./../routes/user.route"));
const carPost_route_1 = __importDefault(require("./../routes/carPost.route"));
const router = (0, express_1.Router)();
// Root route
router.get("/", (_, res) => {
    res.send("App Working successfully");
});
// general Routes
router.use("/auth", auth_route_1.default);
router.use("/user", user_route_1.default);
router.use("/car", carPost_route_1.default);
// Handle not found
router.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
});
exports.default = router;
