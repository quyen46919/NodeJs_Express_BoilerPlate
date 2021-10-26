const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { loaiDichVuService } = require('../services');

const taoLoaiDichVu = catchAsync(async (req, res) => {
  const loaiDichVu = await loaiDichVuService.taoLoaiDichVu(req.body);
  res.status(httpStatus.CREATED).send(loaiDichVu);
});

const timTatCaLoaiDichVu = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await loaiDichVuService.timTatCaLoaiDichVu(filter, options);
  res.send(result);
});

const timLoaiDichVuTheoId = catchAsync(async (req, res) => {
  const loaiDichVu = await loaiDichVuService.timLoaiDichVuTheoId(req.params.loaiDichVuId);
  if (!loaiDichVu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loại dịch vụ không tồn tại');
  }
  res.send(loaiDichVu);
});

const capNhatLoaiDichVu = catchAsync(async (req, res) => {
  const loaiDichVu = await loaiDichVuService.capNhatLoaiDichVu(req.params.loaiDichVuId, req.body);
  res.send(loaiDichVu);
});

const xoaLoaiDichVu = catchAsync(async (req, res) => {
  await loaiDichVuService.xoaLoaiDichVu(req.params.loaiDichVuId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  taoLoaiDichVu,
  timTatCaLoaiDichVu,
  timLoaiDichVuTheoId,
  capNhatLoaiDichVu,
  xoaLoaiDichVu,
};
