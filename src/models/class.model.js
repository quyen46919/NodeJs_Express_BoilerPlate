const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberStudent: {
    type: Number,
    default: 0,
  },
});

classSchema.plugin(toJSON);
classSchema.plugin(paginate);

classSchema.statics.isNameTaken = async function (name, excludeUserId) {
  const classObj = await this.findOne({name, _id: { $ne: excludeUserId } });
  return !!classObj;
};


module.exports = mongoose.model('Class', classSchema);
