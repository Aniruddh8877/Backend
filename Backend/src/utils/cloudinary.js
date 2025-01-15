import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });

// Configuration
cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (file) => {
     try {
          if(!file) return null;

          const result = await cloudinary.uploader.upload(file, {
               resource_type: "auto",
          });
          console.log("file is uploaded on cloudinary ", result.url);
          return result;
     } catch (error) {
          fs.unlinkSync(file);
          console.log(error);
          return null;
     }
};


export default cloudinaryUpload;