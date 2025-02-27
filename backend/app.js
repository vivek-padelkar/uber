import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import abcRouter from './routes.js'
const app = express()

app.use(cors())
app.use(abcRouter)

app.listen(process.env.PORT, () => {
  console.log('backend is running on PORT:', process.env.PORT)
})
