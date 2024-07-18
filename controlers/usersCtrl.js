const User = require('../models/users.js');
const Joi = require('joi');

const userJoiSchema = Joi.object({
    password: Joi.string().min(8).max(20).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid('starter', 'pro', 'business').default('starter'),
    token: Joi.string().allow(null)
})

const createUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email}).lean();
    const validateResult = userJoiSchema.validate(req.body);
    if (validateResult.error) {
        return res.status(400).json({message: 'Błąd z Joi lub innej biblioteki walidacji'})
    }
    if (user) {
        return res.status(409).json({message: 'Email in use'});
    }
    try {
        const newUser = new User({email, password});
        await newUser.setPassword(password);
        await newUser.save();
        return res.status(201).json({message: `User ${req.body.email} created. Subscription: starter`});
    } catch (err) {
        next(err)
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email}).lean();
    const validateResult = userJoiSchema.validate(req.body);
    if (validateResult.error) {
        return res.status(400).json({message: 'Błąd z Joi lub innej biblioteki walidacji'});
    }
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
            {expiresIn: '8h'}
        )
        return res.json({token});
    } else {
        return res.status(401).json({message: 'Wrong password'});
    }
};

module.exports = {
    createUser,
    loginUser
};
