const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { giangVienService } = require('../services');
const Khoa = require('../models/khoa.model');

const taoGiangVien = catchAsync(async (req, res) => {
  const giangVien = await giangVienService.taoGiangVien(req.body);
  res.status(httpStatus.CREATED).send(giangVien);
});

const timTatCaGiangVien = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await giangVienService.timTatCaGiangVien(filter, options);
  res.send(result);
});

const timGiangVienDiaLyVaQLTN = catchAsync(async (req, res) => {
  await Khoa
  .find({ tenKhoa: {
    $in: [
      'DIALY', 'QLTN'
    ]
  }})
  .exec(async function (err, resfult) {
    const ids = resfult.map(x => x._id);
    return await GiangVien
    .find(
      { maKhoa: { $in: ids } }
    )
    .exec(async function(err, giangVien) {
      const gv = giangVien.map(gv => ({
        hoTenGV: gv.hoTenGV,
        tenKhoa: String(gv.maKhoa) === ids[0] ? 'DIALY' : 'QTLN',
      }));
      res.send(gv);
    })
  });
});

const timGiangVienTheoId = catchAsync(async (req, res) => {
  const giangVien = await giangVienService.timGiangVienTheoId(req.params.giangVienId);
  if (!giangVien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Giảng viên không tồn tại');
  }
  res.send(giangVien);
});

const capNhatGiangVien = catchAsync(async (req, res) => {
  const giangVien = await giangVienService.capNhatGiangVien(req.params.giangVienId, req.body);
  res.send(giangVien);
});

const xoaGiangVien = catchAsync(async (req, res) => {
  await giangVienService.xoaGiangVien(req.params.giangVienId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  taoGiangVien,
  timTatCaGiangVien,
  timGiangVienTheoId,
  capNhatGiangVien,
  xoaGiangVien,
  timGiangVienDiaLyVaQLTN
};
