const express = require('express');
const bcrypt = require('bcrypt');
const { User, userValidation, userUpdateValidation } = require('../models/user');
const router = express.Router();
const _ = require('lodash');

router.post('/', async (req,res) => {
    try {
        const { error } = userValidation(req.body);
        if(error) throw error.details[0].message;
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).send('Email already in use');
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send({ msg: "Registered successfully" });
        
    } catch (error) {
        res.status(400).send(error);   
    }
});


router.get('/:id', async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.params.id}).select('-password');
        res.send(_.pick(user, ['name', 'email']));
    } catch (error) {
        res.status(404).send("User does not exist");
    }
  
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = userUpdateValidation(req.body);
        if (error) throw error.details[0].message;
        let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
        if(!user)
         return res.status(404).send("This user with given ID does not exist");
        user = await User.findOne({ _id: req.params.id });
        res.send(user);
    } catch (error) {
       res.status(400).send(error);
    }
  });

module.exports = router; 