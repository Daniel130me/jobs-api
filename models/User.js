const { required } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },

    email: {
        type: String,
        required: [true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide email'
        ],
        unique: true,
    },

    password: {
        type:String,
        required: [true, 'Please provide password'],
        minlength:6,
    },
})

// userSchema.methods.comparePassword = async (candidatePassword) => {
//     const isMatch = await bcrypt.compare(candidatePassword, this.password)
//     return isMatch
// }

// userSchema.methods.createJWT = () => {
//     const token = jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_INTERVAL
//     })
//     return token
// }
module.exports = mongoose.model('User', userSchema)