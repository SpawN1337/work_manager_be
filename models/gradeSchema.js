const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const gradeSchema = new Schema({
  grade: { type: String, required: true, unique: true },
}, {
  versionKey: false,
  timestamps: true
});
gradeSchema.plugin(uniqueValidator)
const Grade = mongoose.model('grade', gradeSchema);

module.exports = Grade;