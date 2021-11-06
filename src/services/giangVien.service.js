const httpStatus = require('http-status');
var mongoose = require('mongoose');
const { GiangVien } = require('../models');
const ApiError = require('../utils/ApiError');


const taoGiangVien = async (body) => {
  if (await GiangVien.isNameTaken(body.tenGiangVien)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên giảng viên đã tồn tại!');
  }
  return GiangVien.create(body);
};


const timTatCaGiangVien = async (filter, options) => {
  const tatCaGiangVien = await GiangVien.paginate(filter, options);
  return tatCaGiangVien;
};


const timGiangVienTheoId = async (id) => {
  return GiangVien.findById(id);
};


const capNhatGiangVien = async (giangVienId, updateBody) => {
  const giangVien = await timGiangVienTheoId(giangVienId);
  if (!giangVien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Giảng viên này không tồn tại!');
  }
  if (updateBody.tenGiangVien && (await GiangVien.isNameTaken(updateBody.tenGiangVien, giangVienId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên giảng viên này đã trùng!');
  }
  Object.assign(giangVien, updateBody);
  await giangVien.save();
  return giangVien;
};


const xoaGiangVien = async (giangVienId) => {
  const giangVien = await timGiangVienTheoId(giangVienId);
  if (!giangVien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Giảng viên này không tồn tại!');
  }
  await giangVien.remove();
  return giangVien;
};

module.exports = {
  taoGiangVien,
  timTatCaGiangVien,
  timGiangVienTheoId,
  capNhatGiangVien,
  xoaGiangVien,
};
