"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carSchema = new mongoose_1.default.Schema({
    brandName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "name must be at least 3 characters"],
        maxLength: [100, "name is too large"],
    },
    brandModel: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "name must be at least 3 characters"],
        maxLength: [100, "name is too large"],
    },
    seatNumber: {
        type: Number,
        required: false,
    },
    color: {
        type: String,
        required: [true, "color is required"],
    },
    condition: {
        type: String,
    },
    price: {
        type: String,
        required: [true, "price is required"],
    },
    registration: {
        type: String,
        required: [true, "registration is required"],
    },
    sellerName: {
        type: String,
    },
    sellerPhone: {
        type: String,
        required: [true, "Phone number must be is required"],
    },
    sellerCountry: {
        type: String,
        required: [true, "Country must be is required"],
    },
    sellerImg: {
        type: String,
    },
    nid: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
// comparePassword
const CarPost = mongoose_1.default.model("CarPost", carSchema);
exports.default = CarPost;
