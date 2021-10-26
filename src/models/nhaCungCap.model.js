const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const nhaCungCapSchema = mongoose.Schema({
  tenNhaCungCap: {
    type: String,
    required: true
  },
  diaChi: {
    type: String,
    required: true
  },
  soDT: {
    type: String,
    required: true,
    validate(value) {
      if (!value.match(/(84|0[3|5|7|8|9])+([0-9]{9})\b/)) {
        throw new Error('Invalid phone number');
      }
    },
  },
  maSoThue: {
    type: Number,
    required: true,
    min: 6,
  }
});

nhaCungCapSchema.plugin(toJSON);
nhaCungCapSchema.plugin(paginate);

nhaCungCapSchema.statics.isNameTaken = async function (tenNhaCungCap, excludeUserId) {
  const nhaCungCap = await this.findOne({ tenNhaCungCap, _id: { $ne: excludeUserId } });
  return !!nhaCungCap;
};

/**
 * @typedef NhaCungCap
 */
const NhaCungCap = mongoose.model('NhaCungCap', nhaCungCapSchema);

module.exports = NhaCungCap;
