import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addToCart = asyncHandler(async (req, res) => {
    // Get product, quantity, and size from body. 
    // Get user ID securely from req.user (set by verifyJWT middleware)
    const { product, quantity, chosen_size } = req.body;
    const userId = req.user?._id;

    if (!product || !quantity || !chosen_size) {
        throw new ApiError(400, "All fields are required");
    }

    const cart = await Cart.create({
        user: userId,
        product,
        quantity,
        chosen_size
    });

    if (!cart) {
        throw new ApiError(500, "Cart item could not be created");
    }

    return res.status(201).json(
        new ApiResponse(201, "Item successfully added to cart", cart)
    );
});

const getAllCart = asyncHandler(async (req, res) => {
    // Fetch all cart entries (or filter by req.user._id if you want only the logged-in user's cart!)
    const carts = await Cart.find({ user: req.user._id }).populate("product");

    return res.status(200).json(
        new ApiResponse(200, "Carts fetched successfully", carts)
    );
});

export { addToCart, getAllCart };