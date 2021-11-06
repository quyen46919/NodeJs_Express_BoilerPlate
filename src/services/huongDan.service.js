const httpStatus = require('http-status');
const { HuongDan } = require('../models');
const ApiError = require('../utils/ApiError');


const taoHuongDan = async (body) => {
  if (await HuongDan.isNameTaken(body.tenHuongDan)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Hướng dẫn đã tồn tại!');
  }
  return HuongDan.create(body);
};


const timTatCaHuongDan = async (filter, options) => {
  const tatCaHuongDan = await HuongDan.paginate(filter, options);
  return tatCaHuongDan;
};


const timHuongDanTheoId = async (id) => {
  return HuongDan.findById(id);
};


const capNhatHuongDan = async (huongDanId, updateBody) => {
  const huongDan = await timHuongDanTheoId(huongDanId);
  if (!huongDan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hướng dẫn này không tồn tại!');
  }
  if (updateBody.tenHuongDan && (await HuongDan.isNameTaken(updateBody.tenHuongDan, huongDanId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Hướng dẫn này đã trùng!');
  }
  Object.assign(huongDan, updateBody);
  await huongDan.save();
  return huongDan;
};


const xoaHuongDan = async (huongDanId) => {
  const huongDan = await timHuongDanTheoId(huongDanId);
  if (!huongDan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hướng dẫn này không tồn tại!');
  }
  await huongDan.remove();
  return huongDan;
};

module.exports = {
  taoHuongDan,
  timTatCaHuongDan,
  timHuongDanTheoId,
  capNhatHuongDan,
  xoaHuongDan,
};
