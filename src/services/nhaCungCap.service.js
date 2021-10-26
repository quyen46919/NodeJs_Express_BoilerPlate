const httpStatus = require('http-status');
const { NhaCungCap } = require('../models');
const ApiError = require('../utils/ApiError');


const taoNhaCungCap = async (body) => {
  if (await NhaCungCap.isNameTaken(body.tenNhaCungCap)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên nhà cung cấp này đã tồn tại!');
  }
  return NhaCungCap.create(body);
};


const timTatCaNhaCungCap = async (filter, options) => {
  const tatCaNhaCungCap = await NhaCungCap.paginate(filter, options);
  return tatCaNhaCungCap;
};


const timNhaCungCapTheoId = async (id) => {
  return NhaCungCap.findById(id);
};


const capNhatNhaCungCap = async (nhaCungCapId, updateBody) => {
  const nhaCungCap = await timNhaCungCapTheoId(nhaCungCapId);
  if (!nhaCungCap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhà cung cấp này không tồn tại!');
  }
  if (updateBody.tenNhaCungCap && (await NhaCungCap.isNameTaken(updateBody.tenNhaCungCap, nhaCungCapId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tên nhà cung cấp này đã trùng!');
  }
  Object.assign(nhaCungCap, updateBody);
  await nhaCungCap.save();
  return nhaCungCap;
};


const xoaNhaCungCap = async (nhaCungCapId) => {
  const nhaCungCap = await timNhaCungCapTheoId(nhaCungCapId);
  if (!nhaCungCap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhà cung cấp này không tồn tại!');
  }
  await nhaCungCap.remove();
  return nhaCungCap;
};

module.exports = {
  taoNhaCungCap,
  timTatCaNhaCungCap,
  timNhaCungCapTheoId,
  capNhatNhaCungCap,
  xoaNhaCungCap,
};
