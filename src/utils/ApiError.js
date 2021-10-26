
// https://vntalking.com/xu-ly-error-handling-trong-nodejs.html

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      // tạo một thuộc tính .stack trên Error, khi gọi sẽ trả về chuỗi đại diện cho 
      // vị trí trong mã mà tại đó hàm .captureStackTrace được gọi
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
