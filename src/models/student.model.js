const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const studentSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  address: {
      type: String,
      default: "Đại học Đông Á"
  },
  born: {
      type: String,
      required: true,
  }
});

studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

studentSchema.statics.isNameTaken = async function (name, excludeUserId) {
  const classObj = await this.findOne({name, _id: { $ne: excludeUserId } });
  return !!classObj;
};


module.exports = mongoose.model('Student', studentSchema);
