const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a class
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  if (await Category.isNameTaken(categoryBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken!');
  }
  return Category.create(categoryBody);
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
const queryCategories = async (filter, options) => {
  const categorys = await Category.paginate(filter, options);
  return categorys;
};

/**
 * Get class by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  return Category.findById(id);
};

/**
 * Get class by email
 * @param {string} email
 * @returns {Promise<Category>}
 */
const getCategoryByName = async (name) => {
  return Category.findOne({ name });
};

/**
 * Update class by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.name && (await Category.isNameTaken(updateBody.name, categoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete class by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  getCategoryByName,
  updateCategoryById,
  deleteCategoryById,
};
