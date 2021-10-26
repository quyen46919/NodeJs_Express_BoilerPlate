const httpStatus = require('http-status');
const { ApparelSize } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a class
 * @param {Object} apparelSizeBody
 * @returns {Promise<ApparelSize>}
 */
const createApparelSize = async (apparelSizeBody) => {
  if (await ApparelSize.isCodeTaken(apparelSizeBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Code already taken!');
  }
  return ApparelSize.create(apparelSizeBody);
};

/**
 * Query for classs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryApparelSizes = async (filter, options) => {
  const apparelSizes = await ApparelSize.paginate(filter, options);
  return apparelSizes;
};

/**
 * Get class by id
 * @param {ObjectId} id
 * @returns {Promise<ApparelSize>}
 */
const getApparelSizeById = async (id) => {
  return ApparelSize.findById(id);
};

/**
 * Get class by email
 * @param {string} email
 * @returns {Promise<ApparelSize>}
 */
const getApparelSizeByName = async (code) => {
  return ApparelSize.findOne({ code });
};

/**
 * Update class by id
 * @param {ObjectId} apparelSizeId
 * @param {Object} updateBody
 * @returns {Promise<ApparelSize>}
 */
const updateApparelSizeById = async (apparelSizeId, updateBody) => {
  const apparelSize = await getApparelSizeById(apparelSizeId);
  if (!apparelSize) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ApparelSize not found');
  }
  if (updateBody.code && (await ApparelSize.isCodeTaken(updateBody.code, apparelSizeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Code already taken');
  }
  Object.assign(apparelSize, updateBody);
  await apparelSize.save();
  return apparelSize;
};

/**
 * Delete class by id
 * @param {ObjectId} apparelSizeId
 * @returns {Promise<ApparelSize>}
 */
const deleteApparelSizeById = async (apparelSizeId) => {
  const apparelSize = await getApparelSizeById(apparelSizeId);
  if (!apparelSize) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ApparelSize not found');
  }
  await apparelSize.remove();
  return apparelSize;
};

module.exports = {
  createApparelSize,
  queryApparelSizes,
  getApparelSizeById,
  getApparelSizeByName,
  updateApparelSizeById,
  deleteApparelSizeById,
};
