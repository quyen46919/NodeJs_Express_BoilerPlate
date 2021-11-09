const { GiangVien, Khoa, SinhVien, HuongDan, DeTai } = require('../models');

const cau1 = async () => {
    const result = await GiangVien.aggregate([
        {
            $addFields: {
                _maKhoaStringId: {
                    $toObjectId: '$maKhoa'
                }
            }
        },
        {
            $lookup: {
                from: 'khoas',
                localField: '_maKhoaStringId',
                foreignField: '_id',
                as: 'khoa'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] 
                } 
            },
        },
        {   $project: {
                khoa: 0
            }
        },
        {   
            $project: {
                hoTenGV: 1,
                tenKhoa: 1
            }
        }   
    ]);
    return result;
};

const cau2 = async () => {
    const result = await GiangVien
    .aggregate([
        {
            $addFields: {
                _maKhoaStringId: {
                    $toObjectId: '$maKhoa'
                }
            }
        },
        {
            $lookup: {
                from: 'khoas',
                localField: '_maKhoaStringId',
                foreignField: '_id',
                as: 'khoa'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] 
                } 
            },
        },
        {
            $match: {
                tenKhoa: {
                    $in: ['DIALY', 'QLTN']
                }
            }
        },
        {   $project: {
                _id: 1,
                hoTenGV: 1,
                tenKhoa: 1,
            }
        },
    ]);
    return result;
};

const cau3 = async () => {
    const result = await Khoa
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
        },
        {
            $project: {
                _id: 0,
                soSinhVien: {
                    $size: "$danhSachSinhVien" 
                }
            }
        }
    ])
    return result;
};

const cau4 = async () => {
    const result = await SinhVien
    .aggregate([
        {
            $addFields: {
                _maKhoaObjectId: { $toObjectId: '$maKhoa'}
            } 
        },
        {
            $lookup: {
                from: 'khoas',
                localField: '_maKhoaObjectId',
                foreignField: '_id',
                as: 'khoa'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] 
                } 
            },
        },
        {   
            $unwind: "$khoa" 
        },
        {
            $match: {
                'khoa.tenKhoa': 'TOAN' 
            }
        },
        {
            $project: {
                khoa: 0
            }
        },
        {
            $project: {
                _id: 1,
                hoTen: 1,
                namSinh: 1
            }
        }
    ]);
    return result;
};

const cau5 = async () => {
    const result = await Khoa
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
        },
        {
            $project: {
                _id: 0,
                soGiangVien: {
                    $size: "$danhSachGiangVien" 
                }
            }
        }
    ]);

    return result;
};

const cau6 = async () => {
    const result = await SinhVien
    .aggregate([
        {
            $addFields: {
                _maSV: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: 'huongdans',
                localField: '_maSV',
                foreignField: 'maSV',
                as: 'danhSachHuongDan'
            }
        },
        {
            $match: {
                danhSachHuongDan: []
            }
        },
        {   
            $project: {
                danhSachHuongDan: 0,
                _maSV: 0
            }
        },
    ]);
    return result;
};

const cau7 = async () => {
    const result = await Khoa
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
        },
        {
            $project: {
                _id: 1,
                tenKhoa: 1,
                soGiangVien: {
                    $size: "$danhSachGiangVien" 
                }
            }
        }
    ]);

    return result;
};

const cau8 = async () => {
    const result = await Khoa
    .aggregate([
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
        },
        {
            $unwind: '$danhSachSinhVien' 
        },
        {
            $match: {
                'danhSachSinhVien.hoTen': 'Le Van Son'
            }
        },
        {
            $project: {
                _id: 0,
                dienThoai: 1
            }
        }
    ])
    return result;
};

const cau9 = async () => {
    const result = await HuongDan
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
                as: 'giangvien'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$giangvien', 0] }, '$$ROOT'] 
                } 
            },
        },
        {
            $project: {
                giangvien: 0
            }
        },
        {
            $match: {
                hoTenGV: 'Tran Son'
            }
        },
        {
            $addFields: {
                _maDT: { $toObjectId: '$maDT'}
            } 
        },
        {
            $lookup: {
                from: 'detais',
                localField: '_maDT',
                foreignField: '_id',
                as: 'detai'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$detai', 0] }, '$$ROOT'] 
                } 
            },
        },
        {
            $project: {
                detai: 0
            }
        },
        {
            $project: {
                _id: 1,
                tenDeTai: 1
            }
        }
    ]);

    return result;
};

// const cau2 = async () => {
//     const result = 
//     return result;
// };


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
};
