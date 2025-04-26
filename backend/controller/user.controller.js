import userModel from '../model/user.model.js'
import blackListedTokenModel from '../model/blacklistToken.model.js'
import { HTTP_ERROR_CODE } from '../utils/constants.js'
import {
  validateLoginUser,
  validationMsgvalidateUserRegister,
} from '../validation/user.validator.js'

export const registerUser = async (req, res) => {
  try {
    const validationMsg = validationMsgvalidateUserRegister.validate(req.body)
    if (validationMsg.error) {
      throw Error(validationMsg.error)
    }
    const { fullName, email, password } = req.body

    const isEmailExsists = await userModel.findOne({ email })
    if (isEmailExsists) {
      throw Error("User already exsists")
    }

    const hashpwd = await userModel.hashPassword(password)
    const user = await userModel.create({
      fullName: { firstName: fullName.firstName, lastName: fullName.lastName },
      email,
      password: hashpwd,
    })
    const token = user.generateAuthToken()
    res.json({
      token,
      user,
    })
  } catch (error) {
    res.send({
      error: error?.message || error,
      statusCode: HTTP_ERROR_CODE.INTERNAL_SERVER,
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const validationMsg = validateLoginUser.validate(req.body)
    if (validationMsg.error) {
      throw Error(validationMsg.error)
    }
    const { email, password } = req.body
    const user = await userModel.findOne({ email }).select('+password')
    if (!user) {
      res.status(401).json({
        status: HTTP_ERROR_CODE.AUTH_FAILD,
        message: 'Invalid email/ password',
      })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      res.status(401).json({
        status: HTTP_ERROR_CODE.AUTH_FAILD,
        message: 'Invalid email/ password',
      })
    }
    const token = user.generateAuthToken()
    return res.json({
      token,
      user
    })
  } catch (error) {
    res.send({
      error: error?.message || error,
      statusCode: HTTP_ERROR_CODE.INTERNAL_SERVER,
    })
  }
}

export const getUserProfile = async (req, res) => {
  res.json(req.user)
}

export const logoutUser = async (req, res) => {
  res.clearCookie('token')
  const token = req?.cookies?.token || req.headers?.authorization?.split(' ')[1];
  await blackListedTokenModel.create({ token })
  res.json({ messgae: 'Logout sucessfully!' })
}