// A higher-order function to handle errors in asynchronous request handlers
const asyncHandler = (requestHandler) => 
     async (req, res, next) => {                           // Returns a function to wrap the provided request handler
                                                           // Wrap the request handler in a resolved promise to catch any asynchronous errors
          Promise.resolve(requestHandler(req, res, next))
               .catch((err) => next(err));                 // Passes any errors to the next middleware (error handling middleware)
                                                           // Explanation:
                                                           // - `req`: The request object containing client request data
                                                           // - `res`: The response object to send data back to the client
                                                           // - `next`: A function to pass control to the next middleware or error handler
     }

                                                           // Exporting the asyncHandler function for use in other modules
export default asyncHandler;


// const asyncHandler = (fn) => async(req, res, next) => { //higher order function to handle async errors 
//    try{
//      await Promise.resolve(fn(req, res, next)).catch(next); //
//    }
//    catch(err){
//      res.status(err.statusCode || 500).json({ //to send status code 
//           success: false,//to send success message
//           message: err.message//to send error message
//      })
//    }
// }