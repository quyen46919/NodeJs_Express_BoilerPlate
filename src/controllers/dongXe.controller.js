const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dongXeService } = require('../services');

const taoDongXe = catchAsync(async (req, res) => {
  const dongXe = await dongXeService.taoDongXe(req.body);
  res.status(httpStatus.CREATED).send(dongXe);
});

const timTatCaDongXe = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await dongXeService.timTatCaDongXe(filter, options);
  res.send(result);
});

const timDongXeTheoId = catchAsync(async (req, res) => {
  const dongXe = await dongXeService.timDongXeTheoId(req.params.dongXeId);
  if (!dongXe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dòng xe không tồn tại');
  }
  res.send(dongXe);
});

const capNhatDongXe = catchAsync(async (req, res) => {
  const dongXe = await dongXeService.capNhatDongXe(req.params.dongXeId, req.body);
  res.send(dongXe);
});

const xoaDongXe = catchAsync(async (req, res) => {
  await dongXeService.xoaDongXe(req.params.dongXeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  taoDongXe,
  timTatCaDongXe,
  timDongXeTheoId,
  capNhatDongXe,
  xoaDongXe,
};
