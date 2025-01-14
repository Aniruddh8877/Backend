// Import required dependencies
import mongoose from "mongoose"; // For working with MongoDB
import bcrypt from "bcrypt"; // For hashing and comparing passwords
import jwt from "jsonwebtoken"; // For generating and verifying tokens
import dotenv from "dotenv"; // For accessing environment variables

// Load environment variables from the .env file
dotenv.config({ path: "./env" });

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // Username field
    username: {
      type: String, // Data type is String
      required: true, // Field is mandatory
      unique: true, // Must be unique across documents
      lowercase: true, // Always store in lowercase
      trim: true, // Remove whitespace from the beginning and end
      index: true, // Add an index for faster search
    },

    // Email field
    email: {
      type: String, // Data type is String
      required: true, // Field is mandatory
      unique: true, // Must be unique across documents
      lowercase: true, // Always store in lowercase
      trim: true, // Remove whitespace from the beginning and end
    },

    // Full name field
    fullname: {
      type: String, // Data type is String
      required: true, // Field is mandatory
      index: true, // Add an index for faster search
      trim: true, // Remove whitespace from the beginning and end
    },

    // Avatar field (Cloudinary link)
    avatar: {
      type: String, // Data type is String
      required: true, // Field is mandatory
    },

    // Cover image field (Cloudinary link, optional)
    coverImage: {
      type: String, // Data type is String
    },

    // Watch history field (Array of video document references)
    watchhistory: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to another collection
        ref: "video.model", // Name of the referenced model
      },
    ],

    // Password field
    password: {
      type: String, // Data type is String
      required: [true, "Password is required"], // Field is mandatory with a custom error message
      trim: true, // Remove whitespace from the beginning and end
    },

    // Refresh token field (optional)
    refreshtoken: {
      type: String, // Data type is String
    },
  },
  {
    // Enable timestamps for createdAt and updatedAt fields
    timestamps: true,
  }
);

// Middleware to hash the password before saving the document
userSchema.pre("save", async function (next) {
  // Check if the password field is modified
  if (this.isModified("password")) {
    // Hash the password with a salt round of 12
    this.password = await bcrypt.hash(this.password, 12);
  }
  next(); // Proceed to the next middleware or operation
});

// Instance method to check if the password is correct
userSchema.methods.ispasswordCorrect = async function (password) {
  // Compare the provided password with the hashed password in the database
  return await bcrypt.compare(password, this.password);
};

// Instance method to generate an access token
userSchema.methods.generateAccessToken = function () {
  // Create a JWT with the user's details
  return jwt.sign(
    {
      id: this._id, // Include the user's ID
      username: this.username, // Include the username
      email: this.email, // Include the email
      fullname: this.fullname, // Include the full name
    },
    process.env.ACCESS_TOKEN_SECRET, // Sign the token with the secret from .env
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Set the token expiry time
    }
  );
};

// Instance method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
  // Create a JWT with only the user's ID
  return jwt.sign(
    {
      id: this._id, // Include the user's ID
    },
    process.env.REFRESH_TOKEN_SECRET, // Sign the token with the secret from .env
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Set the token expiry time
    }
  );
};

// Export the User model based on the schema
export const User = mongoose.model("user", userSchema);
