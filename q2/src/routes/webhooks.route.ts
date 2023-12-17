import express from 'express'
import WebhooksController from '../controllers/webhooks.controller'

const router = express.Router()
const webhooksController = new WebhooksController()

router.post('/process-order', webhooksController.processOrder)

export default router
