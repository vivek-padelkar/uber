import { Router } from 'express'
const route = Router()
import { loginCaptain, registerCaptain } from '../controller/captain.controller.js'

route.post('/register', registerCaptain)
route.post('/login', loginCaptain)

export default route
