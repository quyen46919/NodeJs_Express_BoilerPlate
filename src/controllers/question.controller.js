const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');

const cau1 = catchAsync(async (req, res) => {
    const result = await questionService.cau1();
    res.status(httpStatus.OK).send(result);
}); 

const cau2 = catchAsync(async (req, res) => {
    const result = await questionService.cau2();
    res.status(httpStatus.OK).send(result);
});

const cau3 = catchAsync(async (req, res) => {
    const result = await questionService.cau3();
    res.status(httpStatus.OK).send(result);
});

const cau4 = catchAsync(async (req, res) => {
    const result = await questionService.cau4();
    res.status(httpStatus.OK).send(result);
});

const cau5 = catchAsync(async (req, res) => {
    const result = await questionService.cau5();
    res.status(httpStatus.OK).send(result);
});

const cau6 = catchAsync(async (req, res) => {
    const result = await questionService.cau6();
    res.status(httpStatus.OK).send(result);
});

const cau7 = catchAsync(async (req, res) => {
    const result = await questionService.cau7();
    res.status(httpStatus.OK).send(result);
});

const cau8 = catchAsync(async (req, res) => {
    const result = await questionService.cau8();
    res.status(httpStatus.OK).send(result);
});

const cau9 = catchAsync(async (req, res) => {
    const result = await questionService.cau9();
    res.status(httpStatus.OK).send(result);
});

const cau10 = catchAsync(async (req, res) => {
    const result = await questionService.cau10();
    res.status(httpStatus.OK).send(result);
});

const cau11 = catchAsync(async (req, res) => {
    const result = await questionService.cau11();
    res.status(httpStatus.OK).send(result);
});

const cau12 = catchAsync(async (req, res) => {
    const result = await questionService.cau12();
    res.status(httpStatus.OK).send(result);
});

const cau13 = catchAsync(async (req, res) => {
    const result = await questionService.cau13();
    res.status(httpStatus.OK).send(result);
});

const cau14 = catchAsync(async (req, res) => {
    const result = await questionService.cau14();
    res.status(httpStatus.OK).send(result);
});

const cau15 = catchAsync(async (req, res) => {
    const result = await questionService.cau15();
    res.status(httpStatus.OK).send(result);
});

const cau16 = catchAsync(async (req, res) => {
    const result = await questionService.cau16();
    res.status(httpStatus.OK).send(result);
});

const cau17 = catchAsync(async (req, res) => {
    const result = await questionService.cau17();
    res.status(httpStatus.OK).send(result);
});

const cau18 = catchAsync(async (req, res) => {
    const result = await questionService.cau18();
    res.status(httpStatus.OK).send(result);
});


module.exports = {
    cau1,
    cau2,
    cau3,
    cau4,
    cau5,
    cau6,
    cau7,
    cau8,
    cau9,
    cau10,
    cau11,
    cau12,
    cau13,
    cau14,
    cau15,
    cau16,
    cau17,
    cau18
};