const httpStatus = require('http-status');
const { DeTai } = require('../models');
const ApiError = require('../utils/ApiError');


const taoDeTai = async (body) => {
  if (await DeTai.isNameTaken(body.tenDeTai)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Đề tài đã tồn tại!');
  }
  return DeTai.create(body);
};


const timTatCaDeTai = async (filter, options) => {
  const tatCaDeTai = await DeTai.paginate(filter, options);
  return tatCaDeTai;
};


const timDeTaiTheoId = async (id) => {
  return DeTai.findById(id);
};


const capNhatDeTai = async (deTaiId, updateBody) => {
  const deTai = await timDeTaiTheoId(deTaiId);
  if (!deTai) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Đề tài này không tồn tại!');
  }
  if (updateBody.tenDeTai && (await DeTai.isNameTaken(updateBody.tenDeTai, deTaiId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Đề tài này đã trùng!');
  }
  Object.assign(deTai, updateBody);
  await deTai.save();
  return deTai;
};


const xoaDeTai = async (deTaiId) => {
  const deTai = await timDeTaiTheoId(deTaiId);
  if (!deTai) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Đề tài này không tồn tại!');
  }
  await deTai.remove();
  return deTai;
};

module.exports = {
  taoDeTai,
  timTatCaDeTai,
  timDeTaiTheoId,
  capNhatDeTai,
  xoaDeTai,
};
