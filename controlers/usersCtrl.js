const User = require('../models/users.js');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

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
        const newUser = new User({email, password, avatarURL});
        await newUser.setPassword(password);
        await newUser.save();
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
    const userId = req.user._id;
    const { avatarURL } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.avatarURL = avatarURL;
        await user.save();

        return res.status(200).json({ message: 'Avatar updated', avatarURL });
    } catch (err) {
        next(err);
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
    }catch (err) {
        next(err)
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateAvatar
};
