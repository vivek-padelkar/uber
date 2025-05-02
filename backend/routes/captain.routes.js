import { Router } from 'express'
const route = Router()
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controller/captain.controller.js'
import { authCaptain } from '../middlewares/auth.middlewares.js'

route.post('/register', registerCaptain)
route.post('/login', loginCaptain)
route.get('/profile', authCaptain, getCaptainProfile)
route.post('/logout', authCaptain, logoutCaptain)

export default route
