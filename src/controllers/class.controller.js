const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classService } = require('../services');

const createClass = catchAsync(async (req, res) => {
  const classObj = await classService.createClass(req.body);
  res.status(httpStatus.CREATED).send(classObj);
});

const getClasses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await classService.queryClasses(filter, options);
  res.send(result);
});

const getClass = catchAsync(async (req, res) => {
  const classObj = await classService.getClassById(req.params.classId);
  if (!classObj) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  res.send(classObj);
});

const updateClass = catchAsync(async (req, res) => {
  const classObj = await classService.updateClassById(req.params.classId, req.body);
  res.send(classObj);
});

const deleteClass = catchAsync(async (req, res) => {
  await classService.deleteClassById(req.params.classId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
};
