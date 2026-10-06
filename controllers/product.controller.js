import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// 1. Controller to create a product (Admin only)
const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, price, description, sizes_available, image, category, stock_count } = req.body;

    // Validate required fields
    if (!name || !brand || !price || !description || !stock_count || !category) {
        throw new ApiError(400, "All required product fields must be filled");
    }

    // Create the product in MongoDB
    const product = await Product.create({
        name,
        brand,
        price,
        description,
        sizes_available,
        image,
        category,
        stock_count
    });

    if (!product) {
        throw new ApiError(500, "Something went wrong while creating the product");
    }

    // Send success response
    return res.status(201).json(
        new ApiResponse(201, "Product successfully created", product)
    );
});

// 2. Controller to get all products (Public catalog)
const getAllProducts = asyncHandler(async (req, res) => {
    // Fetch all products from the database
    const products = await Product.find({});

    // Send response with the list of shoes
    return res.status(200).json(
        new ApiResponse(200, "Products fetched successfully", products)
    );
});

export { createProduct, getAllProducts };