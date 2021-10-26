const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { nhaCungCapService } = require('../services');

const taoNhaCungCap = catchAsync(async (req, res) => {
  const nhaCungCap = await nhaCungCapService.taoNhaCungCap(req.body);
  res.status(httpStatus.CREATED).send(nhaCungCap);
});

const timTatCaNhaCungCap = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await nhaCungCapService.timTatCaNhaCungCap(filter, options);
  res.send(result);
});

const timNhaCungCapTheoId = catchAsync(async (req, res) => {
  const nhaCungCap = await nhaCungCapService.timNhaCungCapTheoId(req.params.nhaCungCapId);
  if (!nhaCungCap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhà cung cấp không tồn tại');
  }
  res.send(nhaCungCap);
});

const capNhatNhaCungCap = catchAsync(async (req, res) => {
  const nhaCungCap = await nhaCungCapService.capNhatNhaCungCap(req.params.nhaCungCapId, req.body);
  res.send(nhaCungCap);
});

const xoaNhaCungCap = catchAsync(async (req, res) => {
  await nhaCungCapService.xoaNhaCungCap(req.params.nhaCungCapId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  taoNhaCungCap,
  timTatCaNhaCungCap,
  timNhaCungCapTheoId,
  capNhatNhaCungCap,
  xoaNhaCungCap,
};
