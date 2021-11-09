const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const Khoa = require('../models/khoa.model');
const HuongDan = require('../models/huongDan.model');
const DeTai = require('../models/deTai.model');
const SinhVien = require('../models/SinhVien_NguyenChauQuyen_de3.model');
const GiangVien = require('../models/giangVien.model');
const mongoose = require('mongoose');
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

const cau91 = catchAsync(async (req, res) => {
    await HuongDan
    .aggregate([
        {
            $addFields: {
                _maGV: { $toObjectId: '$maGV'}
            } 
        },
        {
            $lookup: {
                from: 'giangviens',
                localField: '_maGV',
                foreignField: '_id',
                as: 'danhSachGiangVien'
            }
        }
    ])
    .exec(async (err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, 'Có lỗi xảy ra!');

        const filterResult = result.filter(x => x.danhSachGiangVien.some(y => y.hoTenGV === 'Tran Son')).map(z => z.maDT);

        DeTai.find(
            { _id: {
                $in: filterResult
            }}
        ).select('tenDeTai').exec((err, deTai) => {
            if (err) throw new ApiError(httpStatus.BAD_REQUEST, 'Có lỗi xảy ra!');

            res.send(deTai);
        })
    });
});

const cau10 = catchAsync(async (req, res) => {
    await HuongDan
    .aggregate([
        {
            $addFields: {
                _maDeTai: { $toObjectId: '$maDT'}
            } 
        },
        {
            $lookup: {
                from: 'detais',
                localField: '_maDeTai',
                foreignField: '_id',
                as: 'danhSachDeTai'
            }
        }
    ])
    .exec(async (err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, `Có lỗi xảy ra! ${err}`);

        const filterList = result.map(x => x.danhSachDeTai).flat().map(y => String(y._id));
        
        DeTai.find().select('tenDeTai').exec((err, values) => {
            if (err) throw new ApiError(httpStatus.BAD_REQUEST, `Có lỗi xảy ra! ${err}`);

            const lastResult = values.filter(x => !filterList.includes(String(x._id)));

            res.send(lastResult);
        });
    });
});

// CHƯA XỬ LÍ ĐƯỢC TRƯỜNG HỢP LÀ MỘT SINH VIÊN LÀM NHIỀU ĐỀ TÀI, DO CÙNG 1 GIẢNG VIÊN HỖ TRỢ
const cau11 = catchAsync(async (req, res) => {
    await HuongDan
    .aggregate([
        {
            $addFields: {
                _maGV: { $toObjectId: '$maGV'}
            } 
        },
        {
            $lookup: {
                from: 'giangviens',
                localField: '_maGV',
                foreignField: '_id',
                as: 'danhSachGiangVien'
            }
        }
    ])
    .exec(async (err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, `Có lỗi xảy ra! ${err}`);

        let filterList = result.map(x => x.danhSachGiangVien.map(y => ({
            maSV: x.maSV,
            maGV: String(y._id),
            tenGV: y.hoTenGV
        }))).flat();

        let counts = {};
        filterList.forEach(function (x) { counts[x.maGV] = (counts[x.maGV] || 0) + 1; });
        
        let listGiangVien = [];
        for (const [key, value] of Object.entries(counts)) {
            if (value >= 3) {
                listGiangVien.push(key);
            }
        }

        GiangVien.find({
            _id: {
                $in: listGiangVien
            }
        }).exec((err, giangViens) => {
            res.send(giangViens);
        });
    });
});

const cau12 = catchAsync(async (req, res) => {
    await DeTai.findOne().sort('-kinhPhi').exec((err, result) => {
        res.send(result);
    });
});

const cau13 = catchAsync(async (req, res) => {
    await HuongDan
    .aggregate([
        { 
            $group:  { 
                _id: {
                    maDT: '$maDT'
                },
                uniqueIds: {
                    $addToSet: '$_id'
                },
                count: {$sum: 1}
            } 
        },
        {
            $match: { 
                count: {
                    $gt: 2
                }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ])
    .exec(async (err, result) => {
        res.send(result);
    });
});

const cau14 = catchAsync(async (req, res) => {
    Khoa.find({
        tenKhoa: {
            $in: ['DIALY', 'QLTN']
        }
    })
    .select('_id')
    .exec(async (err, values) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, `Có lỗi xảy ra! ${err}`);

        let listKhoaId = [];
        for (let t = 0; t < values.length; t++) {
            listKhoaId.push(String(values[t]._id));
        }

        await HuongDan
        .aggregate([
            {
                $addFields: {
                    _maSV: { $toObjectId: '$maSV'}
                } 
            },
            {
                $lookup: {
                    from: 'sinhviens',
                    localField: '_maSV',
                    foreignField: '_id',
                    as: 'danhSachSinhVien'
                }
            },
        ])
        .exec(async (err, result) => {
            if (err) throw new ApiError(httpStatus.BAD_REQUEST, `Có lỗi xảy ra! ${err}`);

            const filterList = result.map(x => x.danhSachSinhVien.map(y => ({
                maSoSV: y._id,
                hoTen: y.hoTen,
                diem: x.ketqua,
                maKhoa: String(y.maKhoa)
            })))
            .flat();

            const sinhVienKhoaDIALYHoacQLTN = filterList
            .filter(z => listKhoaId.includes(z.maKhoa))
            .map(({maKhoa, ...rest}) => rest);
           
    
            res.send(sinhVienKhoaDIALYHoacQLTN);
            
        });
    });
});

const cau15 = catchAsync(async (req, res) => {
    await SinhVien
    .aggregate([
        {
            $addFields: {
                _maKhoa: { $toObjectId: '$maKhoa'}
            } 
        },
        {
            $lookup: {
                from: 'khoas',
                localField: '_maKhoa',
                foreignField: '_id',
                as: 'khoa'
            }
        },
        {
            $group: {
                _id: {
                    khoa: '$khoa'
                },
                uniqueIds: {
                    $addToSet: '$_id'
                },
                count: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                'count': 1
            }
        }
    ])
    .exec(async (err, result) => {
        if (err) throw new ApiError(httpStatus.BAD_REQUEST, `Có lỗi xảy ra! ${err}`);

        let filterResult = result.map(x => ({
            tenKhoa: x._id.khoa[0].tenKhoa,
            soSinhVien: x.count
        }))

        res.send(filterResult);
    });
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
};