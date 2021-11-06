const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deTaiSchema = mongoose.Schema({
  tenDeTai: {
    type: String,
    required: true,
    maxLength: 30
  },
  kinhPhi: {
    type: Number,
    required: true
  },
  noiThucTap: {
    type: String,
    required: true,
    maxLength: 30
  }
});

deTaiSchema.plugin(toJSON);
deTaiSchema.plugin(paginate);

deTaiSchema.statics.isNameTaken = async function (tenDeTai, excludeUserId) {
  const nhaCungCap = await this.findOne({ tenDeTai, _id: { $ne: excludeUserId } });
  return !!nhaCungCap;
};

const DeTai = mongoose.model('DeTai', deTaiSchema);

module.exports = DeTai;
