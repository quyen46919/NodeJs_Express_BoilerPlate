const httpStatus = require('http-status');
const { DongXe } = require('../models');
const ApiError = require('../utils/ApiError');


const taoDongXe = async (body) => {
  if (await DongXe.isNameTaken(body.tenDongXe)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Dòng xe này đã tồn tại!');
  }
  return DongXe.create(body);
};


const timTatCaDongXe = async (filter, options) => {
  const tatCaDongXe = await DongXe.paginate(filter, options);
  return tatCaDongXe;
};


const timDongXeTheoId = async (id) => {
  return DongXe.findById(id);
};


const capNhatDongXe = async (dongXeId, updateBody) => {
  const dongXe = await timDongXeTheoId(dongXeId);
  if (!dongXe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dòng xe này không tồn tại!');
  }
  if (updateBody.tenDongXe && (await DongXe.isNameTaken(updateBody.tenDongXe, dongXeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Dòng xe này đã trùng!');
  }
  Object.assign(dongXe, updateBody);
  await dongXe.save();
  return dongXe;
};


const xoaDongXe = async (dongXeId) => {
  const dongXe = await timDongXeTheoId(dongXeId);
  if (!dongXe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dòng xe này không tồn tại!');
  }
  await dongXe.remove();
  return dongXe;
};

module.exports = {
  taoDongXe,
  timTatCaDongXe,
  timDongXeTheoId,
  capNhatDongXe,
  xoaDongXe,
};
