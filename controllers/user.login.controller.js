import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
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

// Export loginUser cleanly as a named export
export { loginUser };