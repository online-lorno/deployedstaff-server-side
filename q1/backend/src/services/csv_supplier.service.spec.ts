import fs from 'fs'
import CsvSupplierService from './csv_supplier.service'

describe('CsvSupplierService', () => {
  let csvSupplierService: typeof CsvSupplierService

  beforeEach(() => {
    csvSupplierService = CsvSupplierService
  })

  it('should read the CSV file and return the data', async () => {
    const mockData = [
      { name: 'CSV Toy 1', price: '10' },
      { name: 'CSV Toy 2', price: '20' },
    ]

    jest.spyOn(fs, 'createReadStream').mockImplementation(() => {
      const Readable = require('stream').Readable
      const s = new Readable()
      s.push('name,price\nCSV Toy 1,10\nCSV Toy 2,20')
      s.push(null)
      return s
    })

    const data = await csvSupplierService.getToys()

    expect(data).toEqual(mockData)
  })
})
