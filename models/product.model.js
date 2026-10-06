import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        lowercase: true
    },
    brand: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    sizes_available: {
        type: [Number], 
        required: true
    },
    image: {
        type: String, // URL string for the shoe image
        required: [true, "Product image is required"]
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    stock_count: {
        type: Number,
        required: [true, "Stock count is required"],
        min: [0, "Stock cannot be negative"],
        default: 0
    }
}, {
    timestamps: true
});

export const Product = mongoose.model("Product", productSchema);