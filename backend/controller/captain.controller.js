import { loginCaptainModule, registerCpatinModule } from '../module/captain.module.js'
import { HTTP_ERROR_CODE } from '../utils/constants.js'
import {
  validateCaptainRegister,
  validateLoginCaptain,
} from '../validation/captain.validator.js'
import blackListedTokenModel from '../model/blacklistToken.model.js'

export const registerCaptain = async (req, res) => {
  try {
    const validationMsg = validateCaptainRegister.validate(req.body)
    if (validationMsg.error) {
      throw Error(validationMsg.error)
    }
    const captain = await registerCpatinModule(req.body)
    res.json(captain)
  } catch (error) {
    res.send({
      error: error?.message || error,
      statusCode: HTTP_ERROR_CODE.INTERNAL_SERVER,
    })
  }
}

export const loginCaptain = async (req, res) => {
  try {
    const validationMsg = validateLoginCaptain.validate(req.body)
    if (validationMsg.error) {
      throw Error(validationMsg.error)
    }
    const captain = await loginCaptainModule(req.body)
    res.json(captain)
  } catch (error) {
    res.send({
      error: error?.message || error,
      statusCode: HTTP_ERROR_CODE.INTERNAL_SERVER,
    })
  }
}

export const getCaptainProfile = async (req, res) => {
  res.json(req.captain)
}

export const logoutCaptain = async (req, res) => {
  res.clearCookie('token')
  const token = req?.cookies?.token || req.headers?.authorization?.split(' ')[1];
  await blackListedTokenModel.create({ token })
  res.json({ messgae: 'Logout sucessfully!' })
}