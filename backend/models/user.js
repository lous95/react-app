const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255
    },
    email: {
        type:String,
        required:true,
        minlength:6,
        maxlength:255,
        uniqure:true
    },
    password: {
        type:String,
        required:true,
        minlength:6,
        maxlength:1024
    },
    cards: Array
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, "YourPrivateKey");
    return token;
  }
const User = mongoose.model('users', userSchema);

function userValidation(user){
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(user);
}

function userUpdateValidation(user){
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
    });
    return schema.validate(user);
}

exports.User = User;
exports.userValidation = userValidation;
exports.userUpdateValidation = userUpdateValidation;