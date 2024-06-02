const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const folderSchema = new Schema({
  nomFolder: { type: String, required: true, unique: true },
}, {
  versionKey: false,
  timestamps: true
});
folderSchema.plugin(uniqueValidator)
const Folder = mongoose.model('folder', folderSchema);

module.exports = Folder;