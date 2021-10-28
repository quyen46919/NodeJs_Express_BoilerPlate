const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sinhVienService } = require('../services');

const taoSinhVien = catchAsync(async (req, res) => {
  const sinhVien = await sinhVienService.taoSinhVien(req.body);
  res.status(httpStatus.CREATED).send(sinhVien);
});

const timTatCaSinhVien = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name','role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sinhVienService.timTatCaSinhVien(filter, options);
  res.send(result);
});

const timSinhVienTheoId = catchAsync(async (req, res) => {
  const sinhVien = await sinhVienService.timSinhVienTheoId(req.params.sinhVienId);
  if (!sinhVien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sinh viên không tồn tại');
  }
  res.send(sinhVien);
});

const capNhatSinhVien = catchAsync(async (req, res) => {
  const sinhVien = await sinhVienService.capNhatSinhVien(req.params.sinhVienId, req.body);
  res.send(sinhVien);
});

const xoaSinhVien = catchAsync(async (req, res) => {
  await sinhVienService.xoaSinhVien(req.params.sinhVienId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  taoSinhVien,
  timTatCaSinhVien,
  timSinhVienTheoId,
  capNhatSinhVien,
  xoaSinhVien,
};
