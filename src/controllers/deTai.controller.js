const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deTaiService } = require('../services');

const taoDeTai = catchAsync(async (req, res) => {
  const deTai = await deTaiService.taoDeTai(req.body);
  res.status(httpStatus.CREATED).send(deTai);
});

const timTatCaDeTai = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await deTaiService.timTatCaDeTai(filter, options);
  res.send(result);
});

const timDeTaiTheoId = catchAsync(async (req, res) => {
  const deTai = await deTaiService.timDeTaiTheoId(req.params.deTaiId);
  if (!deTai) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Đề tài không tồn tại');
  }
  res.send(deTai);
});

const capNhatDeTai = catchAsync(async (req, res) => {
  const deTai = await deTaiService.capNhatDeTai(req.params.deTaiId, req.body);
  res.send(deTai);
});

const xoaDeTai = catchAsync(async (req, res) => {
  await deTaiService.xoaDeTai(req.params.deTaiId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  taoDeTai,
  timTatCaDeTai,
  timDeTaiTheoId,
  capNhatDeTai,
  xoaDeTai,
};
