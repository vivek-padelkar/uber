import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] // optional validation
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long']
        },
        registrationNumber: {
            type: String,
            required: true,
            minlength: [10, 'Registration number must be at least 10 characters long']
        },
        seatingCapacity: {
            type: Number,
            required: true,
            min: [1, 'Minimum seating capacity should be 1']
        },
        typeOfVehicle: {
            type: String,
            required: true,
            enum: ['4W', '2W', '3W']
        }
    },
    location: {
        lat: { type: String },
        lng: { type: String }
    }
}, { timestamps: true }) // Optional: adds createdAt, updatedAt fields

// Instance method (on document)
captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
}

//use to comapre the password
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


// Static method (on model)
captainSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('captain', captainSchema)
export default captainModel
