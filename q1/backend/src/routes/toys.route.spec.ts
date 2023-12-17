import request from 'supertest'
import express from 'express'
import ToysRoutes from './toys.route'

describe('ToysRoutes', () => {
  let app: express.Express

  beforeEach(() => {
    app = express()
    app.use('/toys', ToysRoutes)
  })

  it('should define the /toys route', async () => {
    const response = await request(app).get('/toys')

    expect(response.status).not.toBe(404)
  })
})
