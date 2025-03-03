"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_controller_1 = require("../controller/car.controller");
const router = (0, express_1.Router)();
// get all car post
router.get("/all", car_controller_1.getAllCarPosts);
// get single car Post
router.get("/single/:id", car_controller_1.getSingleCarPost);
// get all car post serach by area
router.get("/allAreaCarPosts/:area", car_controller_1.getAllCarPostSearchByArea);
// get all car post serach by Ammount
router.get("/allAmmountCarPosts/:ammount", car_controller_1.getAllCarPostSearchByAmmount);
// get all car post serach by Model
router.get("/allGroupCarPosts/:model", car_controller_1.getAllCarPostSearchByModel);
// create new car Post
router.post("/create", car_controller_1.createCarPost);
// update car post
router.put("/update-post/:id", car_controller_1.updateCarPost);
//delete car post
router.delete("/delete/:id", car_controller_1.deleteCarPost);
exports.default = router;
