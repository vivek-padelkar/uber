import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, 'First name must be atleast 3 charecters long'],
    },
    lastName: {
      type: String,
      //   required: true,
      minLength: [3, 'last name must be atleast 3 charecters long'],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'email must be atleast 5 chrecters long'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
})

//use to generate token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
  return token
}

//use to comapre the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema)

export default userModel
