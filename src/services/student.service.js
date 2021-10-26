const httpStatus = require('http-status');
const { Student } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a class
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const createStudent = async (studentBody) => {
  if (await Student.isNameTaken(studentBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken!');
  }
  return Student.create(studentBody);
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
const queryStudents = async (filter, options) => {
  const students = await Student.paginate(filter, options);
  return students;
};

/**
 * Get class by id
 * @param {ObjectId} id
 * @returns {Promise<Student>}
 */
const getStudentById = async (id) => {
  return Student.findById(id);
};

/**
 * Get class by email
 * @param {string} email
 * @returns {Promise<Student>}
 */
const getStudentByName = async (name) => {
  return Student.findOne({ name });
};

/**
 * Update class by id
 * @param {ObjectId} classId
 * @param {Object} updateBody
 * @returns {Promise<Student>}
 */
const updateStudentById = async (classId, updateBody) => {
  const student = await getStudentById(classId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  if (updateBody.name && (await Student.isNameTaken(updateBody.name, classId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(student, updateBody);
  await student.save();
  return student;
};

/**
 * Delete class by id
 * @param {ObjectId} classId
 * @returns {Promise<Student>}
 */
const deleteStudentById = async (classId) => {
  const student = await getStudentById(classId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  await student.remove();
  return student;
};

module.exports = {
  createStudent,
  queryStudents,
  getStudentById,
  getStudentByName,
  updateStudentById,
  deleteStudentById,
};
