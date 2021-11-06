const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const Khoa = require('../models/khoa.model');
const GiangVien = require('../models/giangVien.model');
const mongoose = require('mongoose');

const cau1 = catchAsync(async (req, res) => {
    await Khoa
    .aggregate([
        {
            $addFields: {
                _maKhoaObjectId: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: 'giangviens',
                localField: '_maKhoaObjectId',
                foreignField: 'maKhoa',
                as: 'danhSachGiangVien'
            }
        }
    ])
    .exec((err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, 'Có lỗi xảy ra!');

        const list = result.map(i => i.danhSachGiangVien.map(x => ({
            maSo: x._id,
            tenGV: x.hoTenGV,
            tenKhoa: i.tenKhoa
        }))).flat();

        res.send(list);
    });
});

const cau2 = catchAsync(async (req, res) => {
    await Khoa
    .aggregate([
        {
            $match: {
                tenKhoa: {
                    $in: ['DIALY', 'QLTN']
                }
            }
        },
        {
            $addFields: {
                _maKhoaObjectId: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: 'giangviens',
                localField: '_maKhoaObjectId',
                foreignField: 'maKhoa',
                as: 'danhSachGiangVien'
            }
        }
    ])
    .exec((err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, 'Có lỗi xảy ra!');

        const list = result
        .filter(z => z.tenKhoa === 'DIALY' || z.tenKhoa === 'QLTN')
        .map(i => i.danhSachGiangVien.map(x => ({
            maSo: x._id,
            tenGV: x.hoTenGV,
            tenKhoa: i.tenKhoa
        }))).flat();

        res.send(list);
    });
});

const cau3 = catchAsync(async (req, res) => {
    await Khoa
    .aggregate([
        {
            $match: {
                tenKhoa: 'CONG NGHE SINH HOC'
            }
        },
        {
            $addFields: {
                _maKhoaObjectId: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: 'sinhviens',
                localField: '_maKhoaObjectId',
                foreignField: 'maKhoa',
                as: 'danhSachSinhVien'
            }
        }
    ])
    .exec((err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, 'Có lỗi xảy ra!');

        const list = result
        .map(i => ({
            tenKhoa: i.tenKhoa,
            soSinhVien: i.danhSachSinhVien.length
        })).flat();

        res.send(list);
    });
});

const cau4 = catchAsync(async (req, res) => {
    await Khoa
    .aggregate([
        {
            $match: {
                tenKhoa: 'TOAN'
            }
        },
        {
            $addFields: {
                _maKhoaObjectId: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: 'sinhviens',
                localField: '_maKhoaObjectId',
                foreignField: 'maKhoa',
                as: 'danhSachSinhVien'
            }
        }
    ])
    .exec((err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, 'Có lỗi xảy ra!');

        const list = result
        .map(i => i.danhSachSinhVien.map(x => ({
            maSo: x._id,
            tenSinhVien: x.hoTen,
            tenKhoa: i.tenKhoa,
            tuoi: 2021 - parseInt(x.namSinh)
        }))).flat();

        res.send(list);
    });
});

const cau5 = catchAsync(async (req, res) => {
    await Khoa
    .aggregate([
        {
            $match: {
                tenKhoa: 'CONG NGHE SINH HOC'
            }
        },
        {
            $addFields: {
                _maKhoaObjectId: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: 'giangviens',
                localField: '_maKhoaObjectId',
                foreignField: 'maKhoa',
                as: 'danhSachGiangVien'
            }
        }
    ])
    .exec((err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, 'Có lỗi xảy ra!');

        const list = result
        .map(i => ({
            tenKhoa: i.tenKhoa,
            soGiangVien: i.danhSachGiangVien.length
        })).flat();

        res.send(list);
    });
});

const cau6 = catchAsync(async (req, res) => {
    await Khoa
    .aggregate([
        {
            $match: {
                tenKhoa: 'CONG NGHE SINH HOC'
            }
        },
        {
            $addFields: {
                _maKhoaObjectId: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: 'giangviens',
                localField: '_maKhoaObjectId',
                foreignField: 'maKhoa',
                as: 'danhSachGiangVien'
            }
        }
    ])
    .exec((err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, 'Có lỗi xảy ra!');

        const list = result
        .map(i => ({
            tenKhoa: i.tenKhoa,
            soGiangVien: i.danhSachGiangVien.length
        })).flat();

        res.send(list);
    });
});

module.exports = {
    cau1,
    cau2,
    cau3,
    cau4,
    cau5,
    cau6
};