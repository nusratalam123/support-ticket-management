import { Router } from "express";
import { getAllExecutiveUser, getSingleExecutiveUser, createExecutivePost, deleteExecutivePost } from "../controller/executive.controller";

const router = Router();

// get all Executive users
router.get("/all", getAllExecutiveUser);

// get single Executive user
router.get("/single/:id", getSingleExecutiveUser);

// create new  Executive post
router.post("/create", createExecutivePost);

//delete  book post 
router.delete("/delete/:id", deleteExecutivePost);

export default router;
