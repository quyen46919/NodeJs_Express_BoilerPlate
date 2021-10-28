const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const sinhVienSchema = mongoose.Schema({
  hoTen: {
    type: String,
    maxLength: 30,
    required: true
  },
  maKhoa: {
    type: String,
    maxLength: 10,
    required: true
  },
  namSinh: {
    type: Number,
    required: true
  },
  queQuan: {
    type: String,
    maxLength: 30,
    required: true
  },
});

sinhVienSchema.plugin(toJSON);
sinhVienSchema.plugin(paginate);

sinhVienSchema.statics.isNameTaken = async function (name, excludeUserId) {
  const sinhVien = await this.findOne({name, _id: { $ne: excludeUserId } });
  return !!sinhVien;
};

const SinhVien = mongoose.model('SinhVien', sinhVienSchema);

module.exports = SinhVien;
