import  asyncHandler from "../utils/asyncHandler.js";


const registerUser=asyncHandler(async(req,res)=>{
     res.status(200).json({
          message:"aniruddh sharma is here "
          
})
})

export default registerUser;