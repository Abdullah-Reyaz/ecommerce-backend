import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ==========================
// REGISTER USER
// ==========================
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Validate inputs
    if (!name || !email || !password) {
        throw new ApiError(400, "Name, email and password are required");
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    // 3. Create user
    const user = await User.create({
        name,
        email,
        password
    });

    // 4. Get created user without password
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    // 5. Send response
    return res.status(201).json(
        new ApiResponse(201, "User registered successfully", createdUser)
    );
});

// ==========================
// LOGIN USER
// ==========================
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Validate inputs
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // 2. Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // 3. Check password using the method defined in user.model.js
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // 4. Generate JWT token
    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );

    // 5. Get user without password
    const loggedInUser = await User.findById(user._id).select("-password");

    if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong while logging in");
    }

    // 6. Send response with user object and token
    return res.status(200).json(
        new ApiResponse(200, "User logged in successfully", {
            user: loggedInUser,
            token
        })
    );
});

// Export both controller functions cleanly
export { registerUser, loginUser };