const mongoose = require('mongoose');

//Schema for MongoDB
const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            required: true,
        },
        job_title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

//model for MongoDB
const User = mongoose.model('user', userSchema);

module.exports = User;