const { GiangVien, Khoa, SinhVien, HuongDan, DeTai } = require('../models');

const cau1 = async () => {
    const result = await GiangVien.aggregate([
        {
            $addFields: {
                _maKhoaObjectId: {
                    $toObjectId: '$maKhoa'
                }
            }
        },
        {
            $lookup: {
                from: Khoa.collection.name,
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
                from: Khoa.collection.name,
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
                from: Khoa.collection.name,
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
                tenKhoa: 'TOAN' 
            }
        },
        {
            $project: {
                hoTen: 1,
                namSinh: {
                    $subtract: [2021, '$namSinh']
                }
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
                from: GiangVien.collection.name,
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
                from: HuongDan.collection.name,
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
                from: GiangVien.collection.name,
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
                from: SinhVien.collection.name,
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
                from: GiangVien.collection.name,
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
                from: DeTai.collection.name,
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
            $group:  { 
                _id: {
                    tenDeTai: '$tenDeTai'
                },
                uniqueIds: {
                    $addToSet: '$tenDeTai'
                },
                count: {
                    $sum: 1
                }
            } 
        },
        {
            $project: {
                '_id.tenDeTai': 1
            }
        }
    ]);

    return result.map(x => x._id.tenDeTai);
};

const cau10 = async () => {
    const result = await DeTai
    .aggregate([
        {
            $addFields: {
                _maDeTai: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: HuongDan.collection.name,
                localField: '_maDeTai',
                foreignField: 'maDT',
                as: 'detai'
            }
        },
        {
            $match: {
                detai: []
            }
        },
        {
            $project: {
                tenDeTai: 1,
                _id: 0
            }
        }
    ]);

    return result.map(x => x.tenDeTai);
};

const cau11 = async () => {
    const result = await GiangVien
    .aggregate([
        {
            $addFields: {
                _maGV: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: HuongDan.collection.name,
                localField: '_maGV',
                foreignField: 'maGV',
                as: 'danhSachHuongDan'
            }
        },
        {
            $project: {
                hoTenGV: 1,
                maKhoa: 1,
                soLuongSinhVienHuongDan: {
                    '$size': '$danhSachHuongDan' 
                }
            }
        },
        {
            $match: {
                soLuongSinhVienHuongDan: {
                    $gte: 3
                }
            }
        },
        {
            $addFields: {
                _maKhoa: { $toObjectId: '$maKhoa'}
            } 
        },
        {
            $lookup: {
                from: Khoa.collection.name,
                localField: '_maKhoa',
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
            $project: {
                _id: 1,
                hoTenGV: 1,
                tenKhoa: 1
            }
        }
    ])
    return result;
};

const cau12 = async () => {
    const result = await DeTai.findOne().sort('-kinhPhi');
    return result;
};

const cau13 = async () => {
    const result = await HuongDan
    .aggregate([
        { 
            $group:  { 
                _id: {
                    maDT: '$maDT',
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
            $match: {
                count: {
                    $gt: 2
                }
            }
        },
        {
            $addFields: {
                _maDeTaiObjectId: {
                    $toObjectId: '$_id.maDT'
                }
            }
        },
        {
            $lookup: {
                from: DeTai.collection.name,
                localField: '_maDeTaiObjectId',
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
                _id: 0
            }
        },
        {
            $project: {
                _id: '$_maDeTaiObjectId',
                tenDeTai: 1,
            }
        }
    ])
    return result;
};

const cau14 = async () => {
    const result = await SinhVien.aggregate([
        {
            $addFields: {
                _maKhoa: {
                    $toObjectId: '$maKhoa'
                }
            }
        },
        {
            $lookup: {
                from: Khoa.collection.name,
                localField: '_maKhoa',
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
        {
            $addFields: {
                _id: {
                    $toString: '$_id'
                }
            }
        },
        {
            $lookup: {
                from: HuongDan.collection.name,
                localField: '_id',
                foreignField: 'maSV',
                as: 'huongDan'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$huongDan', 0] }, '$$ROOT'] 
                } 
            },
        },
        {
            $project: {
                _id: 1,
                ketqua: { 
                    $ifNull: [ "$ketqua", "Sinh viên chưa tham gia đề tài nào hoặc chưa nhập điểm" ] 
                },
                hoTen: 1,
            }
        }
    ]);

    return result;
};

const cau15 = async () => {
    const result = await SinhVien
    .aggregate([
        {
            $addFields: {
                _maKhoa: { $toObjectId: '$maKhoa'}
            } 
        },
        {
            $lookup: {
                from: Khoa.collection.name,
                localField: '_maKhoa',
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
            $group: {
                _id: {
                    maKhoa: '$maKhoa',
                    tenKhoa: '$tenKhoa'
                },
                uniqueIds: {
                    $addToSet: '$_id'
                },
                soSinhVien: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                tenKhoa: '$_id.tenKhoa',
                soSinhVien: 1,
                _id: 0
            }
        }
    ])

    return result;
};

const cau16 = async () => {
    const result = await SinhVien.aggregate([
        {
            $addFields: {
                _idString: { $toString: '$_id'}
            } 
        },
        {
            $lookup: {
                from: HuongDan.collection.name,
                localField: '_idString',
                foreignField: 'maSV',
                as: 'huongDan'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$huongDan', 0] }, '$$ROOT'] 
                } 
            },
        },
        {
            $addFields: {
                _maDT: { $toObjectId: '$maDT'}
            } 
        },
        {
            $lookup: {
                from: DeTai.collection.name,
                localField: '_maDT',
                foreignField: '_id',
                as: 'deTai'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$deTai', 0] }, '$$ROOT'] 
                } 
            },
        },
        {   $match: {
                $expr: {
                    $eq: ["$queQuan", "$noiThucTap"]
                }
            }
        },
        {
            $project: {
                _id: 1,
                hoTen: 1,
                namSinh: 1,
                queQuan: 1,
                maKhoa: 1
            }
        }
    ]);

    return result;
};

const cau17 = async () => {
    const result = await SinhVien.aggregate([
        {
            $addFields: {
                _maKhoa: {
                    $toObjectId: '$maKhoa'
                }
            }
        },
        {
            $lookup: {
                from: Khoa.collection.name,
                localField: '_maKhoa',
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
        {
            $addFields: {
                _id: {
                    $toString: '$_id'
                }
            }
        },
        {
            $lookup: {
                from: HuongDan.collection.name,
                localField: '_id',
                foreignField: 'maSV',
                as: 'huongDan'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$huongDan', 0] }, '$$ROOT'] 
                } 
            },
        },
        {
            $match: {
                ketqua: null
            }
        },
        {
            $project: {
                _id: 1,
                hoTen: 1,
            }
        }
    ]);

    return result;
};

const cau18 = async () => {
    const result = await SinhVien.aggregate([
        {
            $addFields: {
                _maKhoa: {
                    $toObjectId: '$maKhoa'
                }
            }
        },
        {
            $lookup: {
                from: Khoa.collection.name,
                localField: '_maKhoa',
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
        {
            $addFields: {
                _id: {
                    $toString: '$_id'
                }
            }
        },
        {
            $lookup: {
                from: HuongDan.collection.name,
                localField: '_id',
                foreignField: 'maSV',
                as: 'huongDan'
            }
        },
        {
            $replaceRoot: {
                newRoot: { 
                    $mergeObjects: [{ $arrayElemAt: ['$huongDan', 0] }, '$$ROOT'] 
                } 
            },
        },
        {
            $match: {
                ketqua: {
                    $in: ['0', '0.0']
                }
            }
        },
        {
            $project: {
                _id: 1,
                hoTen: 1,
            }
        }
    ]);
    return result;
};


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
