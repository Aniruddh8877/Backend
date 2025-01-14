import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./env", });
const userSchema = new mongoose.Schema({

     username: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
          index: true,
     },

     email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,

     },
     fullname: {
          type: String,
          required: true,
          index: true,
          trim: true,

     },
     avatar: { //cloudinary
          type: String,
          required: true,
     },
     coverImage: { //cloudinary
          type: String,

     },
     watchhistory: [

          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "video.model",
          },
     ],
     password: {
          type: String,
          required: [true, "Password is required"],
          trim: true,
     },
     refreshtoken: {
          type: String,
     },
},
     {
          timestamps: true
     }
);

userSchema.pre("save", async function (next) {
     if (this.isModified("password")) {
          this.password = await bcrypt.hash(this.password, 12);
     }
     next();
});
userSchema.methods.ispasswordCorrect = async function (password) {
     return await bcrypt.compare(password, this.password);

};

userSchema.methods.generateAccessToken = function () {
     return jwt.sign({
          id: this._id,
          username: this.username,
          email: this.email,
          fullname: this.fullname,
     }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
     });
};

userSchema.methods.generateRefreshToken = function () {
     return jwt.sign({
          id: this._id,
     }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
     });
};

export const User = mongoose.model("user", userSchema);