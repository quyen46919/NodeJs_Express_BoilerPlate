
// curried function => thay vì viết một hàm nhiều tham số, thay vào đó ta viết nhiều hàm có 1 tham số
/* 
function x(x){
  return function y(y){
    return function z(z){
      return x + y + 
    }
  }
}

x(1)(2)(3) => 6

Viết hàm kiểu này dùng để xử lí từng tham số 1 cho đến khi nhận hết đủ tham số
const x => x => y => z => console.log(x + y + z)
*/

// https://www.youtube.com/watch?v=I4MebkHvj8g     3:50

// Đầu tiên hàm catchAsync này sẽ nhận vào 1 function, tiếp theo là nhận vào tham số (req, res, next), rồi đưa tham số này 
// vào lại trong function để thực hiện hàm.
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
