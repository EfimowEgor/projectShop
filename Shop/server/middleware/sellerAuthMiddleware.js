const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        req.seller = jwt.verify(token, process.env.SECRET_KEY_SELLER)
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};