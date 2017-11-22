const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const ItemSchema = new Schema({
  name: { type: String, required: true, trim: true },
  zinc: { type: Number },
  waste: { type: Number },
  rate: { type: Number }
});

module.exports = mongoose.model('Item', ItemSchema);

