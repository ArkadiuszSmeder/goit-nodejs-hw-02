const passport = require('passport');

function authMiddleware(req, res, next) {
    passport.authenticate(
        'jwt',
        {
            session: false
        },
        (err, user) => {
            if (!user || err) {
                return res.status(401).json({message: 'Not authorized'})
            }
            req.user = user
            next()
        }
    ) (req, res, next)
}

module.exports = authMiddleware;