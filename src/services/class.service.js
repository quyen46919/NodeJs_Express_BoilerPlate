const httpStatus = require('http-status');
const { Class } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a class
 * @param {Object} classBody
 * @returns {Promise<Class>}
 */
const createClass = async (classBody) => {
  if (await Class.isNameTaken(classBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken!');
  }
  return Class.create(classBody);
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
const queryClasses = async (filter, options) => {
  const classes = await Class.paginate(filter, options);
  return classes;
};

/**
 * Get class by id
 * @param {ObjectId} id
 * @returns {Promise<Class>}
 */
const getClassById = async (id) => {
  return Class.findById(id);
};

/**
 * Get class by email
 * @param {string} email
 * @returns {Promise<Class>}
 */
const getClassByName = async (name) => {
  return Class.findOne({ name });
};

/**
 * Update class by id
 * @param {ObjectId} classId
 * @param {Object} updateBody
 * @returns {Promise<Class>}
 */
const updateClassById = async (classId, updateBody) => {
  const classObj = await getClassById(classId);
  if (!classObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  if (updateBody.name && (await Class.isNameTaken(updateBody.name, classId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(classObj, updateBody);
  await classObj.save();
  return classObj;
};

/**
 * Delete class by id
 * @param {ObjectId} classId
 * @returns {Promise<Class>}
 */
const deleteClassById = async (classId) => {
  const classObj = await getClassById(classId);
  if (!classObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  await classObj.remove();
  return classObj;
};

module.exports = {
  createClass,
  queryClasses,
  getClassById,
  getClassByName,
  updateClassById,
  deleteClassById,
};
