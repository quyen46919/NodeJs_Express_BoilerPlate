const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taoGiangVien = {
  body: Joi.object().keys({
    hoTenGV: Joi.string().required(),
    luong: Joi.string().required(),
    maKhoa: Joi.string().custom(objectId).required(),
  }),
};

const timTatCaGiangVien = {
  query: Joi.object().keys({
    hoTenGV: Joi.string(),
    luong: Joi.string(),
    maKhoa: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const timGiangVienTheoId = {
  params: Joi.object().keys({
    giangVienId: Joi.string().custom(objectId),
  }),
};

const capNhatGiangVien = {
  params: Joi.object().keys({
    giangVienId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        hoTenGV: Joi.string(),
        luong: Joi.string(),
        maKhoa: Joi.string().custom(objectId),
    })
    .min(1),
};

const xoaGiangVien = {
  params: Joi.object().keys({
    giangVienId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  taoGiangVien,
  timTatCaGiangVien,
  timGiangVienTheoId,
  capNhatGiangVien,
  xoaGiangVien,
};
