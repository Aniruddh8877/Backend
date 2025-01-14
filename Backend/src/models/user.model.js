// Import required dependencies
import mongoose from "mongoose"; // For working with MongoDB
import bcrypt from "bcrypt"; // For hashing and comparing passwords securely
import jwt from "jsonwebtoken"; // For generating and verifying tokens
import dotenv from "dotenv"; // For loading environment variables from a .env file

// Load environment variables from the .env file
dotenv.config({ path: "./env" });

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // Username field: must be unique, in lowercase, and trimmed
    username: {
      type: String, // Data type
      required: true, // Field is mandatory
      unique: true, // Value must be unique across users
      lowercase: true, // Convert to lowercase automatically
      trim: true, // Remove whitespace from beginning and end
      index: true, // Add an index for faster query performance
    },

    // Email field: must be unique, in lowercase, and trimmed
    email: {
      type: String,
      required: true, // Field is mandatory
      unique: true, // Value must be unique across users
      lowercase: true, // Convert to lowercase automatically
      trim: true, // Remove whitespace
    },

    // Fullname field: trimmed and indexed for search efficiency
    fullname: {
      type: String,
      required: true, // Field is mandatory
      index: true, // Add an index for search operations
      trim: true, // Remove whitespace
    },

    // Avatar field: stores the URL of the user's profile picture
    avatar: {
      type: String,
      required: true, // Field is mandatory
    },

    // Cover image field: stores the URL of the user's cover image (optional)
    coverImage: {
      type: String, // Optional field
    },

    // Watch history field: stores references to videos the user has watched
    watchhistory: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to another document
        ref: "video.model", // Name of the referenced model
      },
    ],

    // Password field: stores the hashed password
    password: {
      type: String,
      required: [true, "Password is required"], // Field is mandatory with a custom error message
      trim: true, // Remove whitespace
    },

    // Refresh token field: stores the user's refresh token (optional)
    refreshtoken: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Middleware: Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // Check if the password field has been modified
  if (this.isModified("password")) {
    // Hash the password using bcrypt with 12 salt rounds
    this.password = await bcrypt.hash(this.password, 12);
  }
  next(); // Proceed to the next middleware or operation
});

// Instance method: Check if the provided password matches the stored hashed password
userSchema.methods.ispasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare passwords securely
};

// Instance method: Generate an access token for the user
userSchema.methods.generateAccessToken = function () {
  // Create a JWT with the user's details
  return jwt.sign(
    {
      id: this._id, // Include user ID
      username: this.username, // Include username
      email: this.email, // Include email
      fullname: this.fullname, // Include full name
    },
    process.env.ACCESS_TOKEN_SECRET, // Use secret key from .env
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Token expiry time from .env
    }
  );
};

// Instance method: Generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
  // Create a JWT with the user's ID
  return jwt.sign(
    {
      id: this._id, // Include user ID
    },
    process.env.REFRESH_TOKEN_SECRET, // Use refresh token secret from .env
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Token expiry time from .env
    }
  );
};

// Export the User model based on the schema
export const User = mongoose.model("user", userSchema);
