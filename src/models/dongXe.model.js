const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dongXeSchema = mongoose.Schema({
  tenDongXe: {
    type: String,
    required: true
  },
  hangXe: {
    type: String,
    required: true
  },
  soChoNguoi: {
    type: Number,
    required: true
  }
});

dongXeSchema.plugin(toJSON);
dongXeSchema.plugin(paginate);

dongXeSchema.statics.isNameTaken = async function (tenDongXe, excludeUserId) {
  const nhaCungCap = await this.findOne({ tenDongXe, _id: { $ne: excludeUserId } });
  return !!nhaCungCap;
};

/**
 * @typedef DongXe
 */
const DongXe = mongoose.model('DongXe', dongXeSchema);

module.exports = DongXe;
