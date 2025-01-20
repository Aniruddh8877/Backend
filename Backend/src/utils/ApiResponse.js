class ApiResponse {
     constructor(res, statusCode, success, message, data) {
          this.res = res;
          this.statusCode = statusCode;
          this.success = statusCode < 400; // Automatically infer success based on status code
          this.message = message || "Operation completed successfully"; // Use a default if no message is provided
          this.data = data;
     }
}

export default ApiResponse;
