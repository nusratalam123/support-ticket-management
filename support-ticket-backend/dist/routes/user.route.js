"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
// get all users
router.get("/all", user_controller_1.getAllUsers);
// get single user
router.get("/single/:id", user_controller_1.getSingleUser);
//get single user status
router.get("/single/status/:id", user_controller_1.getSingleUserStatus);
// create new user
router.post("/create", user_controller_1.createUser);
// update user profile
router.put("/update-profile/:id", user_controller_1.updateUserProfile);
// update user status
router.patch("/change-status/:id", user_controller_1.updateUserStatus);
//delete user
router.delete("/delete/:id", user_controller_1.deleteUser);
exports.default = router;
