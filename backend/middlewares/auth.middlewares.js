import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/user.model.js';
import captainModel from '../model/captain.model.js';
import blackListedTokenModel from '../model/blacklistToken.model.js';

export const authUser = async (req, res, next) => {
    const token = req?.cookies?.token || req.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlackListedToken = await blackListedTokenModel.findOne({ token })
    if (isBlackListedToken) return res.status(401).json({ message: 'Unauthorized' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        if (user) {
            req.user = user
            next()
        } else {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

export const authCaptain = async (req, res, next) => {
    const token = req?.cookies?.token || req.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlackListedToken = await blackListedTokenModel.findOne({ token })
    if (isBlackListedToken) return res.status(401).json({ message: 'Unauthorized' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)
        if (captain) {
            req.captain = captain
            next()
        } else {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}