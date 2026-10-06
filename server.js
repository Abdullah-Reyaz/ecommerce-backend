import dotenv from "dotenv";

dotenv.config({
    path: "../.env"
});

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import router from "./routes/user.router.js";
import cartRouter from "./routes/cart.router.js";
import productRouter from "./routes/product.router.js";

const app = express();

// CORS
app.use(cors({
    origin: "*"
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve public folder
app.use(express.static("../public"));

// Database connection
connectDB();

// Routes
app.use("/api/v1/users", router);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/products", productRouter);

// Port
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT} !!!`);
});