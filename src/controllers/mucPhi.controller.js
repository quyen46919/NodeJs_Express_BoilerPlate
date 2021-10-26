const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mucPhiService } = require('../services');

const taoMucPhi = catchAsync(async (req, res) => {
  const mucPhi = await mucPhiService.taoMucPhi(req.body);
  res.status(httpStatus.CREATED).send(mucPhi);
});

const timTatCaMucPhi = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await mucPhiService.timTatCaMucPhi(filter, options);
  res.send(result);
});

const timMucPhiTheoId = catchAsync(async (req, res) => {
  const mucPhi = await mucPhiService.timMucPhiTheoId(req.params.mucPhiId);
  if (!mucPhi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mức phí không tồn tại');
  }
  res.send(mucPhi);
});

const capNhatMucPhi = catchAsync(async (req, res) => {
  const mucPhi = await mucPhiService.capNhatMucPhi(req.params.mucPhiId, req.body);
  res.send(mucPhi);
});

const xoaMucPhi = catchAsync(async (req, res) => {
  await mucPhiService.xoaMucPhi(req.params.mucPhiId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  taoMucPhi,
  timTatCaMucPhi,
  timMucPhiTheoId,
  capNhatMucPhi,
  xoaMucPhi,
};
