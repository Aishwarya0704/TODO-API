const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersRegisterSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'please enter your gender correctly'
        },
        required: true,
        lowercase: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: [true,'email already exits'],
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    phoneNumber: {
        type : Number,
        min : 10,
        required : true,
        unique : true
    },
    state: {
        type: String,
        required: true,
        lowercase: true
    },
    city: {
        type: String,
        required: true,
        lowercase: true
    },
    schoolName: {
        type: String,
        required: true,
        lowercase: true
    },
    pin: {
        type: Number,
        required: true,
        minLength : 6
    },
},{
    timestamps: true,
}
);

const UserRegistrations = new mongoose.model('UserRegistration',usersRegisterSchema);

module.exports = UserRegistrations; 
