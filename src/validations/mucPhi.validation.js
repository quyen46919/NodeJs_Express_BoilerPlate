const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taoMucPhi = {
  body: Joi.object().keys({
    donGia: Joi.number().required(),
    moTa: Joi.string().required(),
  }),
};

const timTatCaMucPhi = {
  query: Joi.object().keys({
    donGia: Joi.number(),
    moTa: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const timMucPhiTheoId = {
  params: Joi.object().keys({
    mucPhiId: Joi.string().custom(objectId),
  }),
};

const capNhatMucPhi = {
  params: Joi.object().keys({
    mucPhiId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      donGia: Joi.number(),
      moTa: Joi.string(),
    })
    .min(1),
};

const xoaMucPhi = {
  params: Joi.object().keys({
    mucPhiId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  taoMucPhi,
  timTatCaMucPhi,
  timMucPhiTheoId,
  capNhatMucPhi,
  xoaMucPhi,
};
