const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taoKhoa = {
  body: Joi.object().keys({
    tenKhoa: Joi.string().required(),
    dienThoai: Joi.string().required()
  }),
};

const timTatCaKhoa = {
  query: Joi.object().keys({
    tenKhoa: Joi.string(),
    dienThoai: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const timKhoaTheoId = {
  params: Joi.object().keys({
    khoaId: Joi.string().custom(objectId),
  }),
};

const capNhatKhoa = {
  params: Joi.object().keys({
    khoaId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        tenKhoa: Joi.string(),
        dienThoai: Joi.string(),
    })
    .min(1),
};

const xoaKhoa = {
  params: Joi.object().keys({
    khoaId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  taoKhoa,
  timTatCaKhoa,
  timKhoaTheoId,
  capNhatKhoa,
  xoaKhoa,
};
