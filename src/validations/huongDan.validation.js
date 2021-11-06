const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taoHuongDan = {
  body: Joi.object().keys({
    maDT: Joi.string().required().custom(objectId),
    maGV: Joi.string().required().custom(objectId),
    ketqua: Joi.string().required(),
  }),
};

const timTatCaHuongDan = {
  query: Joi.object().keys({
    maDT: Joi.string().custom(objectId),
    maGV: Joi.string().custom(objectId),
    ketqua: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const timHuongDanTheoId = {
  params: Joi.object().keys({
    huongDanId: Joi.string().custom(objectId),
  }),
};

const capNhatHuongDan = {
  params: Joi.object().keys({
    huongDanId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        maDT: Joi.string().custom(objectId),
        maGV: Joi.string().custom(objectId),
        ketqua: Joi.string(),
    })
    .min(1),
};

const xoaHuongDan = {
  params: Joi.object().keys({
    huongDanId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  taoHuongDan,
  timTatCaHuongDan,
  timHuongDanTheoId,
  capNhatHuongDan,
  xoaHuongDan,
};
