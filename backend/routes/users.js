const express = require('express');
const bcrypt = require('bcrypt');
const { User, userValidation, userUpdateValidation } = require('../models/user');
const router = express.Router();
const _ = require('lodash');

router.post('/', async (req,res) => {
    const { error } = userValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('Email already in use');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send({ msg: "Registered" });

});


router.get('/:id', async (req,res) => {
    const user = await User.findOne({ _id: req.params.id}).select('-password');
    if(!user) return res.status(404).send("User does not exist");
    res.send(_.pick(user, ['name', 'email']));
});

router.put('/:id', async (req, res) => {

    const { error } = userUpdateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!user) return res.status(404).send('The card with the given ID was not found.');
  
    user = await User.findOne({ _id: req.params.id });
    res.send(user);
  
  });





module.exports = router; 