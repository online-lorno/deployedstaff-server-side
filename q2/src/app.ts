import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { CronJob } from 'cron'

import webhooksRoutes from './routes/webhooks.route'
import SftpController from './controllers/sftp.controller'

const app = express()

// Middleware for parsing JSON
app.use(express.json())

app.use(bodyParser.text({ type: 'application/xml' }))

// Enable CORS for all routes and origins
app.use(cors())

// Use the webhooks routes for any requests that start with '/webhooks'
app.use('/webhooks', webhooksRoutes)

// Set up a cron job to run every day at midnight
const sftpController = new SftpController()
new CronJob(
  '0 0 * * *', // cronTime
  sftpController.downloadOrders
)

// Start the server on port 5001
const port = 5001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
