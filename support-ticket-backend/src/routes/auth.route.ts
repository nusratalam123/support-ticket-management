import { Router } from "express";
import { login, logout, signup } from "../controller/auth.controller";

const router = Router();

// register new user
router.post("/signup", signup);

// user login
router.post("/login", login);

// user logout
router.delete("/logout", logout);



export default router;
