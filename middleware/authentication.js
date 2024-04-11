const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {

    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ msg: 'No Token provided' })
    }
    const token = authorization.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, name:payload.name }
        next()
    } catch (error) {
        return res.status(401).json({ msg: 'Authentication Invalid' })
    }
}

module.exports = auth