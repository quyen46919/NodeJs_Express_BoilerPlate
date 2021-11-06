const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const huongDanSchema = mongoose.Schema({
  maDT: {
    type: String,
    required: true
  },
  maGV: {
    type: String,
    required: true
  },
  ketqua: {
    type: String,
    required: true
  }
});

huongDanSchema.plugin(toJSON);
huongDanSchema.plugin(paginate);

const HuongDan = mongoose.model('HuongDan', huongDanSchema);

module.exports = HuongDan;
