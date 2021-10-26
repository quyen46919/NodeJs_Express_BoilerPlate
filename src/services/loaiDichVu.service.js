const httpStatus = require('http-status');
const { LoaiDichVu } = require('../models');
const ApiError = require('../utils/ApiError');


const taoLoaiDichVu = async (body) => {
  if (await LoaiDichVu.isNameTaken(body.tenLoaiDichVu)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên loại dịch vụ này đã tồn tại!');
  }
  return LoaiDichVu.create(body);
};


const timTatCaLoaiDichVu = async (filter, options) => {
  const tatCaLoaiDichVu = await LoaiDichVu.paginate(filter, options);
  return tatCaLoaiDichVu;
};


const timLoaiDichVuTheoId = async (id) => {
  return LoaiDichVu.findById(id);
};


const capNhatLoaiDichVu = async (loaiDichVuId, updateBody) => {
  const loaiDichVu = await timLoaiDichVuTheoId(loaiDichVuId);
  if (!loaiDichVu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loại dịch vụ này không tồn tại!');
  }
  if (updateBody.tenLoaiDichVu && (await LoaiDichVu.isNameTaken(updateBody.tenLoaiDichVu, loaiDichVuId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên loại dịch vụ này đã trùng!');
  }
  Object.assign(loaiDichVu, updateBody);
  await loaiDichVu.save();
  return loaiDichVu;
};


const xoaLoaiDichVu = async (loaiDichVuId) => {
  const loaiDichVu = await timLoaiDichVuTheoId(loaiDichVuId);
  if (!loaiDichVu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loại dịch vụ này không tồn tại!');
  }
  await loaiDichVu.remove();
  return loaiDichVu;
};

module.exports = {
  taoLoaiDichVu,
  timTatCaLoaiDichVu,
  timLoaiDichVuTheoId,
  capNhatLoaiDichVu,
  xoaLoaiDichVu,
};
