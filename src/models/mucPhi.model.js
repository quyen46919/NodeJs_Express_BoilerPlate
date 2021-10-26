const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const mucPhiSchema = mongoose.Schema({
  donGia: {
    type: Number,
    required: true
  },
  moTa: {
    type: String,
    required: true
  }
});

mucPhiSchema.plugin(toJSON);
mucPhiSchema.plugin(paginate);

const MucPhi = mongoose.model('MucPhi', mucPhiSchema);

module.exports = MucPhi;
