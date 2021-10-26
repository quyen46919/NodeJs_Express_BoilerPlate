const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createApparelSize = {
  body: Joi.object().keys({
    code: Joi.string().required(),
    sortOrder: Joi.number().required(),
  }),
};

const getApparelSizes = {
  query: Joi.object().keys({
    code: Joi.string(),
    sortOrder: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getApparelSize = {
  params: Joi.object().keys({
    apparelSizeId: Joi.string().custom(objectId),
  }),
};

const updateApparelSize = {
  params: Joi.object().keys({
    apparelSizeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      code: Joi.string(),
      sortOrder: Joi.number(),
    })
    .min(1),
};

const deleteApparelSize = {
  params: Joi.object().keys({
    apparelSizeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createApparelSize,
  getApparelSizes,
  getApparelSize,
  updateApparelSize,
  deleteApparelSize,
};
