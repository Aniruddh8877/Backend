// Custom error class that extends the built-in Error class in JavaScript
class ApiError extends Error {                       // Inheritance: ApiError extends Error, inheriting its properties and methods
     constructor(                                    // Constructor: Initializes the instance of ApiError with specific properties
          statusCode,                                // The HTTP status code for the error (e.g., 404, 500)
          message = "Something went wrong",          // A default error message if none is provided
          errors = [],                               // An array to store detailed error information, if any
          stack = ""                                // The stack trace of the error, useful for debugging
     ) {
          super(message);                            // Calls the parent Error class constructor to set the error message
          this.statusCode = statusCode;              // Stores the HTTP status code in the instance
          this.data = null;                          // Default property to store additional data related to the error
          this.success = false;                      // Indicates the operation was not successful
          this.message = message="********** user alread exist **********";                    // Stores the error message in the instance
          this.errors = errors;                      // Stores any additional error details

                                                     // Checks if a stack trace is provided
          if (stack) { 
                                                     // If a stack trace is provided, assign it to the instance
               this.stack = stack; 
          } else {
                                                     // Otherwise, capture and assign the stack trace of the error
               Error.captureStackTrace(this, this.constructor); 
          }
     }
}

                                                     // Exporting the custom ApiError class to make it available for use in other modules
export default ApiError;