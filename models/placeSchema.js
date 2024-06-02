const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  place: { type: String, required: true, unique: true },
}, {
  versionKey: false,
  timestamps: true
});
placeSchema.plugin(uniqueValidator)
const Place = mongoose.model('place', placeSchema);

module.exports = Place;