const express = require('express');
const _ = require('lodash');
const { Event, validateEvent } = require('../models/event');
const auth = require('../middleware/auth');
const router = express.Router();

router.get("/my-events", auth, async(req,res)=> {
    try {
        const events = await Event.find({user_id: req.user._id });
        res.send(events);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findOneAndRemove({ _id: req.params.id, user_id: req.user._id });
        const events = await Event.find({user_id: req.user._id });
        res.status(200).send(events);
    } catch (error) {
        res.status(404).send('The card with the given ID was not found.');
    }  
  });

router.get("/all-events" ,async(req,res)=> {
    try {
        const events = await Event.find();
        res.status(200).send(events);
    } catch (error) {
        res.status(400).send("no events available");
    }
});

router.post('/', auth, async(req,res)=> {
    const {error} = validateEvent(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    let event = new Event({
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventAddress: req.body.eventAddress,
        eventPhone: req.body.eventPhone,
        user_id: req.user._id
    })

    const eventPost = await event.save();
    const events = await Event.find({user_id: req.user._id });
    res.send(events);
});

module.exports = router;