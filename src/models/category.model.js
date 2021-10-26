const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

categorySchema.statics.isNameTaken = async function (name, excludeUserId) {
  const category = await this.findOne({name, _id: { $ne: excludeUserId } });
  return !!category;
};


module.exports = mongoose.model('Category', categorySchema);
