import { Router } from 'express'
import { registerCaptain } from '../controller/captain.controller.js'
const route = Router()

route.post('/register', registerCaptain)

export default route
