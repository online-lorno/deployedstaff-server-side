import JsonSupplierService from './json_supplier.service'

describe('JsonSupplierService', () => {
  let jsonSupplierService: typeof JsonSupplierService

  beforeEach(() => {
    jsonSupplierService = JsonSupplierService
  })

  it('should return the toys data', async () => {
    const mockData = [
      { name: 'JSON Toy 1', price: 10 },
      { name: 'JSON Toy 2', price: 20 },
    ]

    jest.spyOn(jsonSupplierService, 'getToys').mockResolvedValue(mockData)

    const data = await jsonSupplierService.getToys()

    expect(data).toEqual(mockData)
  })
})
