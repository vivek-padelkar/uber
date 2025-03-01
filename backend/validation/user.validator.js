import joi from 'joi'

export const validationMsgvalidateUserRegister = joi.object({
  fullname: joi.object.keys({
    firstName: joi.string().min(3),
    lastName: joi.string().min(3).optional(),
  }),
  email: joi.string().email(),
  password: joi.string().min(6),
  socketId: joi.string(),
})
