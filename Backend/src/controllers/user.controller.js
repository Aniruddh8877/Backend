import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/AptError.js";
import { User } from "../models/user.model.js";
import cloudinaryUpload from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

     //get user details from frontend
     //validation of user details
     //check if user already exists:"username ","email"
     //check for images, check for avatar
     //upload them to cloudinary,avatar
     //create user object and save it to database
     //remove password and refreshtoken field from response
     //check for user creation 
     //return response

     const { fullname, username, email, password } = req.body
     console.log(req.body);

     if (!fullname || !username || !email || !password) {
          throw new ApiError("All fields are required", 400)
     }

     const existingUser = await User.findOne({
          $or: [{ username }, { email }],

     })
     if (existingUser) {
          throw new ApiError("User already exists", 400)
     }
     // const avatarLoaclPath = req.files?.avatar = req.avatar[0]?.path;
     // const coverImageLoaclPath = req.files?.coverImage = req.avatar[0]?.path;
     const avatarLoaclPath = req.files?.avatar[0]?.path;
     const coverImageLoaclPath = req.files?.coverImage[0]?.path;

//.................&& .....||...............................
     if (!avatarLoaclPath || !coverImageLoaclPath) {
          throw new ApiError("avatar file is required", 400)
     }

     //...............................................................................................................................
     const avatar = await cloudinaryUpload(avatarLoaclPath);
     console.log("avatar",avatar);
     const coverImage = await cloudinaryUpload(coverImageLoaclPath);
     console.log("coerImage",coverImage,);
     
     if (!avatar || !coverImage) {
          throw new ApiError("avatar file is required", 400)
     }
     const user = await User.create({
          fullname,
          username: username.toLowerCase(),
          email,
          password,
          avatar: avatar,
          coverImage: coverImage,
     })

     const createuser = await User.findById(user._id).select("-password -refreshToken")
     if (!createuser) {
          throw new ApiError("User not created", 400)
     }

     return res.status(201).json(
          new ApiResponse(201, true, "User created successfully", createuser)
      );
      
          

})

export default registerUser;