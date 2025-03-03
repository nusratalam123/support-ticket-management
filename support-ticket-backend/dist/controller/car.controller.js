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
exports.deleteCarPost = exports.updateCarPost = exports.createCarPost = exports.getAllCarPostSearchByModel = exports.getAllCarPostSearchByAmmount = exports.getAllCarPostSearchByArea = exports.getSingleCarPost = exports.getAllCarPosts = void 0;
const car_model_1 = __importDefault(require("./../model/car.model"));
// get all car posts
const getAllCarPosts = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield car_model_1.default.find({}).sort({ name: -1 });
        res.status(200).json({
            message: "car posts create successfully",
            data: posts,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCarPosts = getAllCarPosts;
// get single car post
const getSingleCarPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield car_model_1.default.findOne({ _id: req.params.id });
        if (!post) {
            res.status(400).json({
                message: "Car post Not found",
            });
        }
        res.status(200).json({
            message: "Car post get successfully",
            data: post,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleCarPost = getSingleCarPost;
// get all car post search by area
const getAllCarPostSearchByArea = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const area = String(req.params.area); // Get type from request parameter
        //console.log(area);
        if (!area) {
            return res.status(400).json({ message: "Missing search car post" });
        }
        const posts = yield car_model_1.default.find({ sellerCountry: area }); // Find by type
        res.status(200).json({
            message: "Car post get successfully",
            data: posts,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCarPostSearchByArea = getAllCarPostSearchByArea;
// get all Tution post search by ammount
const getAllCarPostSearchByAmmount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ammount = String(req.params.ammount); // Get type from request parameter
        console.log(ammount);
        if (!ammount) {
            return res.status(400).json({ message: "Missing search car post" });
        }
        const posts = yield car_model_1.default.find({ price: ammount }); // Find by type
        res.status(200).json({
            message: "Car post get successfully",
            data: posts,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCarPostSearchByAmmount = getAllCarPostSearchByAmmount;
// get all car post search by group
const getAllCarPostSearchByModel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = String(req.params.group); // Get type from request parameter
        console.log(group);
        if (!group) {
            return res.status(400).json({ message: "Missing search car post" });
        }
        const posts = yield car_model_1.default.find({ brandModel: group }); // Find by type
        res.status(200).json({
            message: "Car posts get successfully",
            data: posts,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCarPostSearchByModel = getAllCarPostSearchByModel;
// create new Car post
const createCarPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (Object.keys(data).length === 0) {
            res.status(400).json({
                message: "Data can't be empty",
            });
        }
        const post = yield car_model_1.default.create(data);
        res.status(201).json({
            message: "Car post created Successfully",
            data: post,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createCarPost = createCarPost;
// update a Car post
const updateCarPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield car_model_1.default.findById(postId);
        if (!post) {
            res.status(400).json({
                message: "post not found",
            });
        }
        const updatedUser = yield car_model_1.default.findByIdAndUpdate(postId, req.body);
        res.status(200).json({
            message: "Car post updated successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCarPost = updateCarPost;
// delete car post
const deleteCarPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield car_model_1.default.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(400).json({
                message: "Car post not found",
            });
        }
        res.status(200).json({
            message: "Car post Deleted Successfully",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCarPost = deleteCarPost;
