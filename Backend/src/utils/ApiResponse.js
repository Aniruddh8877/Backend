class ApiResponse {
 constructor(res, statusCode, success, message, data) {
this.statusCode = statusCode;
this.success = statusCode < 400;
this.message = message;
this.data = data;
this.res = res;
 }
}


export default ApiResponse;