import Queue from 'bull'
import xml2js from 'xml2js'
import axios from 'axios'
import fs from 'fs'

import db from '../lib/db'
import { Order, OrderSftpXml, OrderWebookXml } from '../types/order'

// Bull Queue Configuration
const webhookQueue = new Queue('webhookProcessingQueue', {
  redis: {
    host: 'redis-host',
    port: 6379,
  },
})

const sftpQueue = new Queue('sftpProcessingQueue', {
  redis: {
    host: 'redis-host',
    port: 6379,
  },
})

// Process order, if existing, call erp api, else requeue the job
webhookQueue.process('processWebhook', async (job) => {
  try {
    const parser = new xml2js.Parser()
    const data: OrderWebookXml = await parser.parseStringPromise(job.data)
    const result: any = await db.executeQuery(
      'SELECT * FROM orders WHERE id = ?',
      [data.order_detail.id]
    )

    if ((result as Order[]).length > 0) {
      const orderDetails = result[0] as Order
      // Make a POST request to another API to create the order
      await axios.post('https://api.erp.com/create-order', orderDetails)
      console.log('Order created successfully.')
    } else {
      // Order not found, requeue the job for later processing
      await webhookQueue.add('processWebhook', job.data)
      console.log('Order not found. Job requeued.')
    }
  } catch (error) {
    console.error('Error processing Webhook job:', error)
  }
})

// Create/update order from xml file downloaded from SFTP server
sftpQueue.process('processSftpXmlFile', async (job) => {
  try {
    const parser = new xml2js.Parser()
    const data: OrderSftpXml = await parser.parseStringPromise(
      fs.readFileSync(job.data.filePath)
    )
    const result: any = await db.executeQuery(
      'SELECT * FROM orders WHERE id = ?',
      [data.order_detail.id]
    )

    if ((result as Order[]).length > 0) {
      const orderDetails = result[0] as Order
      // Update order if existing
      await db.executeQuery(
        'UPDATE orders SET customer = ?, product = ? WHERE id = ?',
        [orderDetails.customer, orderDetails.product, orderDetails.id]
      )
      console.log('Order update successfully.')
    } else {
      // Update order if existing
      await db.executeQuery(
        'INSERT INTO orders(id, customer, product) VALUES(?, ?, ?)',
        [
          data.order_detail.id,
          data.order_detail.customer,
          data.order_detail.product,
        ]
      )
      console.log('Order created successfully.')
    }
  } catch (error) {
    console.error('Error processing Webhook job:', error)
  }
})

export { webhookQueue, sftpQueue }
