import express from 'express'
import cors from 'cors'
import toysRoutes from './routes/toys.route'

const app = express()

// Middleware for parsing JSON
app.use(express.json())

// Enable CORS for all routes and origins
app.use(cors())

// Use the toys routes for any requests that start with '/toys'
app.use('/toys', toysRoutes)

// Start the server on port 5001
const port = 5001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
