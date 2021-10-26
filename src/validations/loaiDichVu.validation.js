const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taoLoaiDichVu = {
  body: Joi.object().keys({
    tenLoaiDichVu: Joi.string().required(),
  }),
};

const timTatCaLoaiDichVu = {
  query: Joi.object().keys({
    tenLoaiDichVu: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const timLoaiDichVuTheoId = {
  params: Joi.object().keys({
    loaiDichVuId: Joi.string().custom(objectId),
  }),
};

const capNhatLoaiDichVu = {
  params: Joi.object().keys({
    loaiDichVuId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      tenLoaiDichVu: Joi.string(),
    })
    .min(1),
};

const xoaLoaiDichVu = {
  params: Joi.object().keys({
    loaiDichVuId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  taoLoaiDichVu,
  timTatCaLoaiDichVu,
  timLoaiDichVuTheoId,
  capNhatLoaiDichVu,
  xoaLoaiDichVu,
};
