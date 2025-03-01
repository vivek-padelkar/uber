import userModel from '../model/user.model.js'
import { validateUserRegister } from '../validation/user.validator.js'

export const registerUser = async (req, res) => {
  try {
    validationMsg = validateUserRegister.validate(req.body)
    if (!validationMsg.error) {
    } else {
      throw Error(validationMsg.error)
    }
  } catch (error) {}
}
