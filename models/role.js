const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: String,
  alignment: String,
  description: String,
  actions: String,
  booleanAlign: Boolean
});

roleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Role', roleSchema);
