const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  aircraft: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Date, required: true },
  tag: {type: Array,default: [],required: true },
  videoPath: { type: String, required: true },
  filename : { type: String, required: true , unique: true },
  uploaded: { type: Date, default: Date.now },
});
videoSchema.index({
  name: 'text',
  place: 'text',
  tag: 'text',
});
module.exports = mongoose.model('Video', videoSchema);