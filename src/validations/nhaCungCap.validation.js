const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taoNhaCungCap = {
  body: Joi.object().keys({
    tenNhaCungCap: Joi.string().required(),
    diaChi: Joi.string().required(),
    soDT: Joi.string().required(),
    maSoThue: Joi.number().required(),
  }),
};

const timTatCaNhaCungCap = {
  query: Joi.object().keys({
    tenNhaCungCap: Joi.string(),
    diaChi: Joi.string(),
    soDT: Joi.string(),
    maSoThue: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const timNhaCungCapTheoId = {
  params: Joi.object().keys({
    nhaCungCapId: Joi.string().custom(objectId),
  }),
};

const capNhatNhaCungCap = {
  params: Joi.object().keys({
    nhaCungCapId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      tenNhaCungCap: Joi.string(),
      diaChi: Joi.string(),
      soDT: Joi.string(),
      maSoThue: Joi.number(),
    })
    .min(1),
};

const xoaNhaCungCap = {
  params: Joi.object().keys({
    nhaCungCapId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  taoNhaCungCap,
  timTatCaNhaCungCap,
  timNhaCungCapTheoId,
  capNhatNhaCungCap,
  xoaNhaCungCap,
};
