const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    grade: { type: Schema.Types.ObjectId,ref:'grade' },
    username: { type: String, required: true, unique: true },
    bureau: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});
userSchema.plugin(uniqueValidator)
const User = mongoose.model('users', userSchema);

module.exports = User;