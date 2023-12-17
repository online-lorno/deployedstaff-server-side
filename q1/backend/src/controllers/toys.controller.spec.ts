import request from 'supertest'
import express from 'express'
import ToysController from './toys.controller'
import JsonSupplierService from '../services/json_supplier.service'
import XmlSupplierService from '../services/xml_supplier.service'
import CsvSupplierService from '../services/csv_supplier.service'
import ToysRoutes from '../routes/toys.route'
import { dataNormalizer } from '../utils/dataNormalizer'
import { Toy } from '../types/toys'

const jsonMockData = [{ name: 'JSON Toy', price: 10 }]
const xmlMockData = [{ name: 'XML Toy', price: 10 }]
const csvMockData = [{ 'Product name': 'CSV Toy', Price: '$10' }]

describe('ToysController', () => {
  let app: express.Express
  let jsonSupplierService: typeof JsonSupplierService
  let xmlSupplierService: typeof XmlSupplierService
  let csvSupplierService: typeof CsvSupplierService
  let toysController: ToysController
  let toysRouter: typeof ToysRoutes

  beforeEach(() => {
    app = express()
    jsonSupplierService = JsonSupplierService
    xmlSupplierService = XmlSupplierService
    csvSupplierService = CsvSupplierService
    toysController = new ToysController()
    toysRouter = ToysRoutes
    app.use('/toys', toysRouter)
  })

  it('should return normalized data from different suppliers', async () => {
    jest.spyOn(jsonSupplierService, 'getToys').mockResolvedValue(jsonMockData)
    jest.spyOn(xmlSupplierService, 'getToys').mockResolvedValue(xmlMockData)
    jest.spyOn(csvSupplierService, 'getToys').mockResolvedValue(csvMockData)

    const response = await request(app).get('/toys')

    const normalizedData = [
      ...dataNormalizer(jsonMockData, 'JSON'),
      ...dataNormalizer(xmlMockData, 'XML'),
      ...dataNormalizer(csvMockData, 'CSV'),
    ]
    expect(response.status).toBe(200)
    expect(
      (response.body as Toy[]).map((toy) => ({
        name: toy.name,
        price: toy.price,
        suppier: toy.supplier,
      }))
    ).toEqual(
      normalizedData.map((toy) => ({
        name: toy.name,
        price: toy.price,
        suppier: toy.supplier,
      }))
    )
  })
})
