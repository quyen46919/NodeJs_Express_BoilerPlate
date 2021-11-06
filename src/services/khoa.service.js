const httpStatus = require('http-status');
const { Khoa } = require('../models');
const ApiError = require('../utils/ApiError');


const taoKhoa = async (body) => {
  if (await Khoa.isNameTaken(body.tenKhoa)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên khoa đã tồn tại!');
  }
  return Khoa.create(body);
};


const timTatCaKhoa = async (filter, options) => {
  const tatCaKhoa = await Khoa.paginate(filter, options);
  return tatCaKhoa;
};


const timKhoaTheoId = async (id) => {
  return Khoa.findById(id);
};


const capNhatKhoa = async (khoaId, updateBody) => {
  const khoa = await timKhoaTheoId(khoaId);
  if (!khoa) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Khoa này không tồn tại!');
  }
  if (updateBody.tenKhoa && (await Khoa.isNameTaken(updateBody.tenKhoa, khoaId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên loại dịch vụ này đã trùng!');
  }
  Object.assign(khoa, updateBody);
  await khoa.save();
  return khoa;
};


const xoaKhoa = async (khoaId) => {
  const khoa = await timKhoaTheoId(khoaId);
  if (!khoa) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Khoa này không tồn tại!');
  }
  await khoa.remove();
  return khoa;
};

module.exports = {
  taoKhoa,
  timTatCaKhoa,
  timKhoaTheoId,
  capNhatKhoa,
  xoaKhoa,
};
