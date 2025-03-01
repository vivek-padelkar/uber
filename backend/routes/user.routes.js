import { Router } from 'express'
const route = Router()
import { registerUser } from '../controller/user.controller.js'

route.post('/register', registerUser)

export default route
