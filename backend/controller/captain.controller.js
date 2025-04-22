import { registerCpatinModule } from '../module/captain.module.js'
import { HTTP_ERROR_CODE } from '../utils/constants.js'
import {
  validateCaptainRegister,
} from '../validation/captain.validator.js'

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

// export const loginUser = async (req, res) => {
//   try {
//     const validationMsg = validateLoginUser.validate(req.body)
//     if (validationMsg.error) {
//       throw Error(validationMsg.error)
//     }
//     const { email, password } = req.body
//     const user = await userModel.findOne({ email }).select('+password')
//     if (!user) {
//       res.status(401).json({
//         status: HTTP_ERROR_CODE.AUTH_FAILD,
//         message: 'Invalid email/ password',
//       })
//     }
//     const isMatch = await user.comparePassword(password)
//     if (!isMatch) {
//       res.status(401).json({
//         status: HTTP_ERROR_CODE.AUTH_FAILD,
//         message: 'Invalid email/ password',
//       })
//     }
//     const token = user.generateAuthToken()
//     return res.json({
//       token,
//       user
//     })
//   } catch (error) {
//     res.send({
//       error: error?.message || error,
//       statusCode: HTTP_ERROR_CODE.INTERNAL_SERVER,
//     })
//   }
// }

// export const getUserProfile = async (req, res) => {
//   res.json(req.user)
// }

// export const logoutUser = async (req, res) => {
//   res.clearCookie('token')
//   const token = req?.cookies?.token || req.headers?.authorization?.split(' ')[1];
//   await blackListedTokenModel.create({ token })
//   res.json({ messgae: 'Logout sucessfully!' })
// }