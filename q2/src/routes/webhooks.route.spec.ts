import request from 'supertest'
import express from 'express'
import WebhooksRoutes from './webhooks.route'

describe('WebhooksRoutes', () => {
  let app: express.Express

  beforeEach(() => {
    app = express()
    app.use('/webhooks', WebhooksRoutes)
  })

  it('should define the /webhooks route', async () => {
    const response = await request(app).post('/webhooks/process-order')

    expect(response.status).not.toBe(404)
  })
})
