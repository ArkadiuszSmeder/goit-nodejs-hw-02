const passport = require('passport');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const User = require('../models/users.js');

function setJWTStrategy() {
    const secret = process.env.SECRET;

    const params = {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    passport.use(
        new JWTStrategy(
            params,
            async function (payload, done) {
                try {
                    const user = await User.findOne({_id: payload.id}).lean();

                    if (!user) {
                        return done(new Error('User not found'))
                    }
                    return done(null, user)
                } catch (err) {
                    return done(err)
                }
            }
        )
    )
}

module.exports = setJWTStrategy;