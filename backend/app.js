import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import abcRouter from './routes/user.routes.js'
import connectDb from './db/db.js'
const app = express()

app.use(cors())
connectDb()
app.use(abcRouter)

app.listen(process.env.PORT, () => {
  console.log('backend is running on PORT:', process.env.PORT)
})
