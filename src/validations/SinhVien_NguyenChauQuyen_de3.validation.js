const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taoSinhVien = {
  body: Joi.object().keys({
    hoTen: Joi.string().max(30).required(),
    maKhoa: Joi.string().max(10).required(),
    namSinh: Joi.number().required(),
    queQuan: Joi.string().max(30).required(),
  }),
};

const timTatCaSinhVien = {
  query: Joi.object().keys({
    hoTen: Joi.string().max(30),
    maKhoa: Joi.string().max(10),
    namSinh: Joi.number(),
    queQuan: Joi.string().max(30),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const timSinhVienTheoId = {
  params: Joi.object().keys({
    sinhVienId: Joi.string().custom(objectId),
  }),
};

const capNhatSinhVien = {
  params: Joi.object().keys({
    sinhVienId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      hoTen: Joi.string().max(30),
      maKhoa: Joi.string().max(10),
      namSinh: Joi.number(),
      queQuan: Joi.string().max(30),
    })
    .min(1),
};

const xoaSinhVien = {
  params: Joi.object().keys({
    sinhVienId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  taoSinhVien,
  timTatCaSinhVien,
  timSinhVienTheoId,
  capNhatSinhVien,
  xoaSinhVien,
};
