const Joi = require('joi');
const { objectId } = require('./custom.validation');

const taoDeTai = {
  body: Joi.object().keys({
    tenDeTai: Joi.string().max(30).required(),
    noiThucTap: Joi.string().max(30).required(),
    kinhPhi: Joi.number().required()
  }),
};

const timTatCaDeTai = {
  query: Joi.object().keys({
    tenDeTai: Joi.string().max(30),
    noiThucTap: Joi.string().max(30),
    kinhPhi: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const timDeTaiTheoId = {
  params: Joi.object().keys({
    deTaiId: Joi.string().custom(objectId),
  }),
};

const capNhatDeTai = {
  params: Joi.object().keys({
    deTaiId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      tenDeTai: Joi.string().max(30),
      noiThucTap: Joi.string().max(30),
      kinhPhi: Joi.number(),
    })
    .min(1),
};

const xoaDeTai = {
  params: Joi.object().keys({
    deTaiId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  taoDeTai,
  timTatCaDeTai,
  timDeTaiTheoId,
  capNhatDeTai,
  xoaDeTai,
};
