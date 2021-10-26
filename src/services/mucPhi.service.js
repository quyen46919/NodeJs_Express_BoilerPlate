const httpStatus = require('http-status');
const { MucPhi } = require('../models');
const ApiError = require('../utils/ApiError');


const taoMucPhi = async (body) => {
  return MucPhi.create(body);
};


const timTatCaMucPhi = async (filter, options) => {
  const tatCaMucPhi = await MucPhi.paginate(filter, options);
  return tatCaMucPhi;
};

const timMucPhiTheoId = async (id) => {
  return MucPhi.findById(id);
};


const capNhatMucPhi = async (nhaCungCapId, updateBody) => {
  const nhaCungCap = await timMucPhiTheoId(nhaCungCapId);
  if (!nhaCungCap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mức phí này không tồn tại!');
  }
  Object.assign(nhaCungCap, updateBody);
  await nhaCungCap.save();
  return nhaCungCap;
};


const xoaMucPhi = async (nhaCungCapId) => {
  const nhaCungCap = await timMucPhiTheoId(nhaCungCapId);
  if (!nhaCungCap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mức phí này không tồn tại!');
  }
  await nhaCungCap.remove();
  return nhaCungCap;
};

module.exports = {
  taoMucPhi,
  timTatCaMucPhi,
  timMucPhiTheoId,
  capNhatMucPhi,
  xoaMucPhi,
};
