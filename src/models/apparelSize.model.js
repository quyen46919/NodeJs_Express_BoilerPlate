const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  sortOrder: {
    type: Number,
    required: true
  }
});

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.statics.isCodeTaken = async function (code, excludeUserId) {
  const category = await this.findOne({code, _id: { $ne: excludeUserId } });
  return !!category;
};


module.exports = mongoose.model('ApparelSize', productSchema);
