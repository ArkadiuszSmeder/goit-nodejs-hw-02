const User = require('../models/users.js');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require("path");
const { v4: uuidV4 } = require('uuid');
const fs = require("fs").promises;

const isImageAndTransform = require('../config/avatarSet.js');

const userJoiSchema = Joi.object({
    password: Joi.string().min(8).max(20).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid('starter', 'pro', 'business').default('starter')
})

const createUser = async (req, res, next) => {
    const validateResult = userJoiSchema.validate(req.body);
    if (validateResult.error) {
        return res.status(400).json({message: 'Błąd z Joi lub innej biblioteki walidacji'})
    }
    const { email, password } = req.body;
    const user = await User.findOne({email}).lean();
    if (user) {
        return res.status(409).json({message: 'Email in use'});
    }
    try {
        const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
        const verificationToken = uuidV4();
        const newUser = new User({email, password, avatarURL, verificationToken});
        await newUser.setPassword(password);
        await newUser.save();
        // possible place to send mail with ver link?????
        return res.status(201).json({message: `User ${req.body.email} created. Subscription: starter`});
    } catch (err) {
        next(err)
    }
};

const loginUser = async (req, res) => {
    const validateResult = userJoiSchema.validate(req.body);
    if (validateResult.error) {
        return res.status(400).json({message: 'Błąd z Joi lub innej biblioteki walidacji'});
    }
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(401).json({message: 'Wrong email'});
    }

    const isPasswordCorrect = await user.validatePassword(password);
    if (isPasswordCorrect) {
        const payload = {
            id: user._id,
            email: user.email
        };
        const token = jwt.sign(
            payload,
            process.env.SECRET,
            {expiresIn: '12h'}
        )
        await user.save();
        return res.json({token});
    } else {
        return res.status(401).json({message: 'Wrong password'});
    }
};

const updateAvatar = async (req, res, next) => {

    if (!req.file) {
        return res.status(400).json({message: 'File is not a photo'})
    }
    const userId = req.user._id;
    const storeImageDir = path.join(process.cwd(), "public/avatars");

    const {path: temporaryPath} = req.file;
    const extension = path.extname(temporaryPath);
    const fileName = `${uuidV4()}${extension}`;
    const filePath = path.join(storeImageDir, fileName);

    try {
        await fs.rename(temporaryPath, filePath)
    } catch (err) {
        await fs.unlink(temporaryPath)
        return next(err)
    }

    const isValidAndTransform = await isImageAndTransform(filePath);
    if (!isValidAndTransform) {
        await fs.unlink(filePath);
        return res.status(400).json({ message: "File isn't a photo but is pretending" });
    }

    try {
        const user = await User.findById(userId);
        user.avatarURL = `${req.protocol}://${req.get('host')}/avatars/${fileName}`;
        await user.save();
        return res.status(200).json({ avatarURL: user.avatarURL });
    } catch (err) {
        await fs.unlink(filePath);
        next(err)
    }
};

const logoutUser = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        user.token = null;
        await user.save();
        return res.status(204).json({message: 'User logout'});
    } catch (err) {
        next(err)
    }
};

const getCurrentUser = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        return res.status(200).json({
            email: user.email,
            subscription: user.subscription,
            avatar: user.avatarURL
        })
    } catch (err) {
        next(err)
    }
};

const verifyUser = async (req, res, next) => {
    const {verificationToken} = req.params;
    try {
        const user = await User.findOne({verificationToken})
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        user.verificationToken = null;
        user.verify = true;
        await user.save();
        return res.ststus(200).json({message: 'Verification successful'})
    } catch (err) {
        next(err)
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateAvatar,
    verifyUser
};
