const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

// https://viblo.asia/p/mot-so-phuong-thuc-voi-object-trong-javascript-Eb85opEOK2G

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));

  // Joi.compile => Chuyển object thành Joi object
  // Joi.prefs => custom error messages
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  // Sao chép các gía trị của tất cả các thuộc tính riêng từ một hoặc nhiều object vào một object khác.
  Object.assign(req, value);
  return next();
};

module.exports = validate;
