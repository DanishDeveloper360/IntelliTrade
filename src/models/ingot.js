const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Item = require('./item');

const IngotSchema = new Schema({
  ingotName: { type: String,trim: true },
  formulaName: { type: String, required: true, trim: true },
  profit: { type: Number },
  itemCost: { type: Number },
  wasteCost: { type: Number },
  ingotCost: { type: Number },
  rodi: { type: Number },
  lm: { type: Number },
  sisa: { type: Number },
  loha: { type: Number },
  zinc : {type: Number},
  netIngotWeight: { type: Number },
  totalItemWeight: { type: Number },
  totalItemWeightMinusZinc: { type: Number },  
  items: [Item.schema]
});

module.exports = mongoose.model('Ingot', IngotSchema, 'ingots');
