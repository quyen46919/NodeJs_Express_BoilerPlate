/**
 * Create an object composed of the picked object properties
 * Tạo một đối tượng bao gồm các thuộc tính đối tượng đã chọn
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */

// pick(schema, ['params', 'query', 'body'])

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {

    // Trả về giá trị true/false cho biết object có thuộc tính được đưa ra không.
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = pick;
