const Joi = require('joi');
const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        minlength:2 ,
        maxlength: 255
    },
    eventDescription: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1024
    },
    eventAddress: {
        type: String,
        required:true, 
        minlength:5,
        maxlength:100
    },
    eventPhone: {
        type:String,
        required: true,
        minlength:7,
        maxlength:15
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    likes: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

const Event = mongoose.model('Event', eventSchema);

function validateEvent(event){
    const schema = Joi.object({
        eventName: Joi.string().min(2).max(255).required(),
        eventDescription: Joi.string().min(10).max(1024).required(),
        eventAddress: Joi.string().min(5).max(100).required(),
        eventPhone: Joi.string().min(7).max(15).required().regex(/^0[2-9]\d{7,8}$/)
    })
    return schema.validate(event);
}

exports.Event = Event;
exports.validateEvent = validateEvent;