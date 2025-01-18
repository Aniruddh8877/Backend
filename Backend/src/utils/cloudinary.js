import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";


dotenv.config({ path: "./.env" });

// Configuration
cloudinary.config({
     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (file) => {
     console.log(file);
     
     try {
          if(!file) return null;
          console.log("file is uploading on cloudinary");
          
          const result = await cloudinary.uploader.upload(file, {
               resource_type: "auto",
           
               
          });
          console.log("file is uploaded on cloudinary ");
          fs.unlinkSync(file);
          console.log(result.url);
          return result.secure_url;
     } catch (error) {
          console.log(error);
          return null;
     }
};


export default cloudinaryUpload;