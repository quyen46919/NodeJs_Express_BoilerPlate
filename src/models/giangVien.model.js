const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const giangVienSchema = mongoose.Schema({
  hoTenGV: {
    type: String,
    required: true
  },
  luong: {
    type: String,
    required: true
  },
  maKhoa: {
    type: String,
    required: true
  }
});

giangVienSchema.plugin(toJSON);
giangVienSchema.plugin(paginate);

giangVienSchema.statics.isNameTaken = async function (hoTenGV, excludeUserId) {
  const giangVien = await this.findOne({ hoTenGV, _id: { $ne: excludeUserId } });
  return !!giangVien;
};

const GiangVien = mongoose.model('GiangVien', giangVienSchema);

module.exports = GiangVien;
