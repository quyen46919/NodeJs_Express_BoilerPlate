const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  otherData: {
    type: String,
    required: true
  }
});

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.statics.isNameTaken = async function (name, excludeUserId) {
  const category = await this.findOne({name, _id: { $ne: excludeUserId } });
  return !!category;
};


module.exports = mongoose.model('Product', productSchema);
