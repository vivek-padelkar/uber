import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import connectDb from './db/db.js'
import userRoutes from './routes/user.routes.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
connectDb()

app.use('/users', userRoutes)

app.listen(process.env.PORT, () => {
  console.log('backend is running on PORT:', process.env.PORT)
})
