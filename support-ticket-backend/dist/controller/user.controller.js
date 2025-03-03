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
exports.updateUserStatus = exports.deleteUser = exports.updateUserProfile = exports.createUser = exports.getSingleUserStatus = exports.getSingleUser = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("./../model/user.model"));
// get all users
const getAllUsers = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({}).sort({ name: -1 });
        res.status(200).json({
            message: "Users get successfully",
            data: users,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
// get single user
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: req.params.id });
        if (!user) {
            res.status(400).json({
                message: "User Not found",
            });
        }
        res.status(200).json({
            message: "User get successfully",
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleUser = getSingleUser;
// get single user status
const getSingleUserStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: req.params.id }).select("status");
        if (!user) {
            res.status(200).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User status get successfully",
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleUserStatus = getSingleUserStatus;
// create new user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (Object.keys(data).length === 0) {
            res.status(400).json({
                message: "Data can't be empty",
            });
        }
        const user = yield user_model_1.default.create(data);
        res.status(201).json({
            message: "User created Successfully",
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createUser = createUser;
// update a profile
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(400).json({
                message: "User not found",
            });
        }
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, req.body);
        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserProfile = updateUserProfile;
// delete user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(400).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User Deleted Successfully",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
// update user status
const updateUserStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }, { new: true });
        if (!user) {
            res.status(400).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "Status changed successfully",
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserStatus = updateUserStatus;
