import { Router } from 'express'

const route = Router() // Create an instance of Router

route.get('/hi', (req, res) => {
  res.send('hi')
})

export default route
