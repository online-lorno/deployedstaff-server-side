import express from 'express'
import ToysController from '../controllers/toys.controller'

const router = express.Router()
const toysController = new ToysController()

router.get('/', toysController.getToys)

export default router
