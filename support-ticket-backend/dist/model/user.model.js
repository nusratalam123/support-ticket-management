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
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "name must be at least 3 characters"],
        maxLength: [100, "name is too large"],
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "name must be at least 3 characters"],
        maxLength: [100, "name is too large"],
    },
    email: {
        type: String,
        validate: [validator_1.default.isEmail, "provide a valid email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "email address is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "password must be at least 6 characters"],
    },
    role: {
        type: String,
        default: "USER",
        enum: ["USER", "SELLER"],
    },
    phone: {
        type: String,
        validate: [
            validator_1.default.isMobilePhone,
            "please provide a valid phone number",
        ],
        required: false,
    },
    secondaryPhone: {
        type: String,
        validate: [
            validator_1.default.isMobilePhone,
            "please provide a valid phone number",
        ],
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    zipCode: {
        type: String,
        required: false,
    },
    shippingCountry: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE", "BANNED"],
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(this.password, salt);
            this.password = hash;
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
// comparePassword
userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt_1.default.compareSync(password, hash);
};
// generateConfirmationToken
userSchema.methods.generateConfirmationToken = function () {
    const token = crypto_js_1.default.SHA256("token");
    this.confirmationToken = token;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    this.confirmationTokenExpires = date;
    return token;
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
