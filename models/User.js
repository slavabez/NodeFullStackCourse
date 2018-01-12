const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    // google/email or any other future ones
    authType: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    fullName: String,
    nickName: String
});

mongoose.model('users', userSchema);
