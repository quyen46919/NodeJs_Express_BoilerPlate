const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { khoaService } = require('../services');

const taoKhoa = catchAsync(async (req, res) => {
  const khoa = await khoaService.taoKhoa(req.body);
  res.status(httpStatus.CREATED).send(khoa);
});

const timTatCaKhoa = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await khoaService.timTatCaKhoa(filter, options);
  res.send(result);
});

const timKhoaTheoId = catchAsync(async (req, res) => {
  const khoa = await khoaService.timKhoaTheoId(req.params.khoaId);
  if (!khoa) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Khoa không tồn tại');
  }
  res.send(khoa);
});

const capNhatKhoa = catchAsync(async (req, res) => {
  const khoa = await khoaService.capNhatKhoa(req.params.khoaId, req.body);
  res.send(khoa);
});

const xoaKhoa = catchAsync(async (req, res) => {
  await khoaService.xoaKhoa(req.params.khoaId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  taoKhoa,
  timTatCaKhoa,
  timKhoaTheoId,
  capNhatKhoa,
  xoaKhoa,
};
