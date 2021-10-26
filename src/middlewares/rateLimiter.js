const rateLimit = require('express-rate-limit');

// hạn chế (limit) lượng yêu cầu (request) tới server
// https://viblo.asia/p/rate-time-limit-trong-nodejs-vyDZOnkRKwj
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
};
