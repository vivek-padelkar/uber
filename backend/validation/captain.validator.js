import joi from 'joi'

export const validateCaptainRegister = joi.object({
  fullName: joi.object().keys({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).optional(),
  }).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  vehicle: joi.object().keys({
    color: joi.string().min(3).required(),
    registrationNumber: joi.string().min(10).required(),
    seatingCapacity: joi.number().min(1).required(),
    typeOfVehicle: joi.string().valid('4W', '2W', '3W').required(),
  }).required()
})

export const validateLoginUser = joi.object({
  email: joi.string().email(),
  password: joi.string().min(6),
})
