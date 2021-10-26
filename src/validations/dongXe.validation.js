const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taoDongXe = {
  body: Joi.object().keys({
    tenDongXe: Joi.string().required(),
    hangXe: Joi.string().required(),
    soChoNguoi: Joi.number().required(),
  }),
};

const timTatCaDongXe = {
  query: Joi.object().keys({
    tenDongXe: Joi.string(),
    hangXe: Joi.string(),
    soChoNguoi: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const timDongXeTheoId = {
  params: Joi.object().keys({
    dongXeId: Joi.string().custom(objectId),
  }),
};

const capNhatDongXe = {
  params: Joi.object().keys({
    dongXeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      tenDongXe: Joi.string(),
      hangXe: Joi.string(),
      soChoNguoi: Joi.number(),
    })
    .min(1),
};

const xoaDongXe = {
  params: Joi.object().keys({
    dongXeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  taoDongXe,
  timTatCaDongXe,
  timDongXeTheoId,
  capNhatDongXe,
  xoaDongXe,
};
