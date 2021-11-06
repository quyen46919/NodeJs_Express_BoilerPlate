const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { huongDanService } = require('../services');

const taoHuongDan = catchAsync(async (req, res) => {
  const huongDan = await huongDanService.taoHuongDan(req.body);
  res.status(httpStatus.CREATED).send(huongDan);
});

const timTatCaHuongDan = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await huongDanService.timTatCaHuongDan(filter, options);
  res.send(result);
});

const timHuongDanTheoId = catchAsync(async (req, res) => {
  const huongDan = await huongDanService.timHuongDanTheoId(req.params.huongDanId);
  if (!huongDan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hướng dẫn không tồn tại');
  }
  res.send(huongDan);
});

const capNhatHuongDan = catchAsync(async (req, res) => {
  const huongDan = await huongDanService.capNhatHuongDan(req.params.huongDanId, req.body);
  res.send(huongDan);
});

const xoaHuongDan = catchAsync(async (req, res) => {
  await huongDanService.xoaHuongDan(req.params.huongDanId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  taoHuongDan,
  timTatCaHuongDan,
  timHuongDanTheoId,
  capNhatHuongDan,
  xoaHuongDan,
};
