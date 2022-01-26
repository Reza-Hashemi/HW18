const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bloggerSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, 'Last name is required']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [8, 'invalid password'],
        
    },
    username: {
        type: String,
        trim: true,
        minlength: [3, 'invalid phone'],
        required: [true, 'Username is required'],
        unique: true
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'none'],
            message: '{VALUE} is not supported'
        },
        default: 'none',
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: (number) => {
          validator.isMobilePhone(number, "fa-IR");
        },
      },
    role: {
        type: String,
        enum: ['admin', 'blogger'],
        default: 'blogger'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
// bloggerSchema.plugin(uniqueValidator, { message: 'this is already taken.' });
module.exports = mongoose.model('blogger', bloggerSchema);