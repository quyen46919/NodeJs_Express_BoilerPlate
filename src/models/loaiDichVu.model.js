const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const nhaCungCapSchema = mongoose.Schema({
  tenLoaiDichVu: {
    type: String,
    required: true
  },
});

nhaCungCapSchema.plugin(toJSON);
nhaCungCapSchema.plugin(paginate);

nhaCungCapSchema.statics.isNameTaken = async function (tenLoaiDichVu, excludeUserId) {
  const nhaCungCap = await this.findOne({ tenLoaiDichVu, _id: { $ne: excludeUserId } });
  return !!nhaCungCap;
};

/**
 * @typedef LoaiDichVu
 */
const LoaiDichVu = mongoose.model('LoaiDichVu', nhaCungCapSchema);

module.exports = LoaiDichVu;
