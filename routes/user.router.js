import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = Router();

// Registration and login must accept POST because they send user data payloads
router.route("/register").post(registerUser);
router.route("/login").post(loginUser); 

export default router;