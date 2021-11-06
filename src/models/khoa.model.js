const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const khoaSchema = mongoose.Schema({
  tenKhoa: {
    type: String,
    maxLength: 30,
    required: true
  },
  dienThoai: {
    type: String,
    maxLength: 10,
    required: true,
    validate(value) {
        if (!value.match(/(84|0[3|5|7|8|9])+([0-9]{8})/)) {
            throw new Error('Số điện thoại không đúng định dạng!');
        }
    },
  },
});

khoaSchema.plugin(toJSON);
khoaSchema.plugin(paginate);

khoaSchema.statics.isNameTaken = async function (tenKhoa, excludeKhoaId) {
  const khoa = await this.findOne({tenKhoa, _id: { $ne: excludeKhoaId } });
  return !!khoa;
};

const Khoa = mongoose.model('Khoa', khoaSchema);

module.exports = Khoa;
