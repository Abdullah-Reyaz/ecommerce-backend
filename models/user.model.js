import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User" // Best practice: give users a default role
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
}, { timestamps: true }); // Fixed timestamps syntax

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
// Custom method to check password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);