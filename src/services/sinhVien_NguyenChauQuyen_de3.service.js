const httpStatus = require('http-status');
const { SinhVien } = require('../models');
const ApiError = require('../utils/ApiError');


const taoSinhVien = async (body) => {
  if (await SinhVien.isNameTaken(body.tenSinhVien)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên sinh viên này đã tồn tại!');
  }
  return SinhVien.create(body);
};


const timTatCaSinhVien = async (filter, options) => {
  const tatCaSinhVien = await SinhVien.paginate(filter, options);
  return tatCaSinhVien;
};


const timSinhVienTheoId = async (id) => {
  return SinhVien.findById(id);
};


const capNhatSinhVien = async (sinhVienId, updateBody) => {
  const sinhVien = await timSinhVienTheoId(sinhVienId);
  if (!sinhVien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sinh viên này không tồn tại!');
  }
  if (updateBody.tenSinhVien && (await SinhVien.isNameTaken(updateBody.tenSinhVien, sinhVienId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên sinh viên này đã trùng!');
  }
  Object.assign(sinhVien, updateBody);
  await sinhVien.save();
  return sinhVien;
};


const xoaSinhVien = async (sinhVienId) => {
  const sinhVien = await timSinhVienTheoId(sinhVienId);
  if (!sinhVien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sinh viên này không tồn tại!');
  }
  await sinhVien.remove();
  return sinhVien;
};

module.exports = {
  taoSinhVien,
  timTatCaSinhVien,
  timSinhVienTheoId,
  capNhatSinhVien,
  xoaSinhVien,
};
