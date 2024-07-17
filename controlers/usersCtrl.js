const User = require('../models/users.js');
const Joi = require('joi');

const userJoiSchema = Joi.object({
    password: Joi.string().min(8).max(20).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid('starter', 'pro', 'business').default('starter'),
    token: Joi.string().allow(null)
})

const createUser = (req, res, next) => {

};

const loginUser = (req, res) => {

};

module.exports = {
    createUser,
    loginUser
};