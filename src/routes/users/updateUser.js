const express = require('express');
const multer = require('multer');
const { verifyJWT, verifyUserID } = require('../middleware');
const mongoose = require('mongoose');
const Users = require('../../models/Users');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { uploadFile } = require('../uploadFile')

const upload = multer();
const router = express.Router({ mergeParams: true });


// Updates particular user 
router.put('/', verifyJWT, verifyUserID, upload.single('image'), async (req, res) => {
    try {
        var user = await Users.findById(
            mongoose.Types.ObjectId(req.params.id), 
            '_id name credentials.username credentials.email profile_pic notifications'
        );
        if (!user) throw 'Record doesnt exist';
    } catch (err) {
        return res.status(404).send({ error: { message: 'Record doesnt exist' } });
    }

    // Schema for validating request body
    const schema = Joi.object({
        first_name: Joi.string(),
        last_name: Joi.string(),
        email: Joi.string().email(),
        username: Joi.string(),
        password: Joi.string(),
        notification: Joi.object().keys({
            time: Joi.date().iso().required(),
            type: Joi.string().required(),
            from_user: Joi.string().hex().length(24),
            text: Joi.string().required()
        })
    });
    
    if (req.body.json) req.body = JSON.parse(req.body.json);

    // Validate request body
    let { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(x => ({ 'field': x.path[0], 'message': x.message.replace(/"/g, '') }));
        return res.status(422).send({ errors: errorMessages });
    }

    if (req.file) {
        try {
            const imagePath = 'users/'+req.params.id+'/'+'profile_pic/'+req.file.originalname
            const dataURL = await uploadFile(req.file, imagePath);
            user.profile_pic = dataURL;
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: { message: 'Something went wrong :(' }});
        }
    }

    // Update the user document
    req.body.first_name ? (user.name.first_name = req.body.first_name) : '';
    req.body.last_name ? (user.name.last_name = req.body.last_name) : '';
    req.body.email ? (user.credentials.email = req.body.email) : '';
    req.body.username ? (user.credentials.username = req.body.username) : '';
    req.body.password ? (user.credentials.password = await bcrypt.hash(req.body.password, 10)) : '';
    req.body.notification ? user.notifications.push(req.body.notification) : '';

    await user.save()

    res.send(user)
});

module.exports = router;