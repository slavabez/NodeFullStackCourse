const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    // google/email or any other future ones
    authType: String,
    email: String,
    password: String,
    fullName: String,
    nickName: String
});

mongoose.model('users', userSchema);

module.exports.createUser = (newUser, callback) => {

};