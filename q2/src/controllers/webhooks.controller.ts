import { Request, Response } from 'express'
import { webhookQueue } from '../services/order_job.service'

class WebhooksController {
  public processOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      // Add the job to the queue
      await webhookQueue.add('processWebhook', req.body)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}

export default WebhooksController
