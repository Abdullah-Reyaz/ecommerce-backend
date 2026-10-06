import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

// Public Route: Anyone can view the shoe catalog
router.route("/all").get(getAllProducts);

// Protected Admin Route: Only logged-in users with Admin role can create products
router.route("/add").post(verifyJWT, verifyAdmin, createProduct);

export default router;