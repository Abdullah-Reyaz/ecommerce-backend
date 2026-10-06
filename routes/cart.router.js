import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToCart, getAllCart } from "../controllers/cart.controller.js"; 

const router = Router();

router.route("/addcart").post(verifyJWT, addToCart);

router.route("/cart").get(verifyJWT, getAllCart);

export default router;