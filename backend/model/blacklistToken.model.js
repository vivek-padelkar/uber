import mongoose from 'mongoose'

const blackListedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400
    }
})

const blackListedTokenModel = mongoose.model('blacklistToken', blackListedTokenSchema)
export default blackListedTokenModel