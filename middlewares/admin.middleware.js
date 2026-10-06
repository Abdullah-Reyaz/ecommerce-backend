import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
        next();
    } else {
        throw new ApiError(403, "Access denied: Admin privileges required");
    }
};