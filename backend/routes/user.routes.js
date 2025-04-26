import { Router } from 'express'
const  route = Router()
import { loginUser, registerUser, getUserProfile, logoutUser } from '../controller/user.controller.js'
import { authUser } from '../middlewares/auth.middlewares.js'

route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/profile', authUser, getUserProfile)
route.post('/logout', authUser, logoutUser)

export default route