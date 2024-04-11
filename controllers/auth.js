const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401).json({ msg: 'Email not correct' })
    } else {
        const isSame = await bcrypt.compare(password, user.password)
        if (!isSame) {
            res.status(401).send('Invalid credentials')
        } else {
            console.log(user._id)
            const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_INTERVAL })
            // res.status(200).json({ user:userId, token })
            res.status(200).json({ user: { name: user.name }, token })
        }
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const tempUser = { name, email, password: hashedPassword }
    const user = await User.create({ ...tempUser })
    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_INTERVAL })
    // res.status(200).json({ user, token })
    res.status(200).json({ user: { name: user.name }, token })

}

module.exports = {
    login,
    register,
}