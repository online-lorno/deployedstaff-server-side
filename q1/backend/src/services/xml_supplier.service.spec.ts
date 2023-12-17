import fs from 'fs'
import XmlSupplierService from './xml_supplier.service'

jest.mock('fs')

describe('XmlSupplierService', () => {
  let xmlSupplierService: typeof XmlSupplierService

  beforeEach(() => {
    xmlSupplierService = XmlSupplierService
  })

  it('should read the XML file and return the data', async () => {
    const mockData = [
      { name: 'XML Toy 1', price: 10 },
      { name: 'XML Toy 2', price: 20 },
    ]

    const mockXml = `
      <products>
        <product>
          <name>${mockData[0].name}</name>
          <price>${mockData[0].price}</price>
        </product>
        <product>
          <name>${mockData[1].name}</name>
          <price>${mockData[1].price}</price>
        </product>
      </products>
    `

    ;(fs.readFileSync as jest.Mock).mockReturnValue(mockXml)

    const data = await xmlSupplierService.getToys()

    expect(data).toEqual(
      mockData.map((toy) => ({ ...toy, price: toy.price.toString() }))
    )
  })
})
