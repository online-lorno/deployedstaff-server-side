// Append to: /Users/leonard/PROJECTS/PERSONAL/deployedstaff-server-side/q1/backend/src/utils/dataNormalizer.spec.ts

import { ToyJson, ToyXml } from '../types/toys'
import { dataNormalizer } from './dataNormalizer'
import { randomBytes } from 'crypto'

jest.mock('crypto')

describe('dataNormalizer', () => {
  beforeEach(() => {
    ;(randomBytes as jest.Mock).mockReturnValue({
      toString: () => 'mockId',
    })
  })

  it('should normalize JSON data', () => {
    const jsonData = [
      { name: 'JSON Toy 1', price: '$10' },
      { name: 'JSON Toy 2', price: '$20' },
    ]

    const normalizedData = dataNormalizer(
      jsonData as unknown as ToyJson[],
      'JSON'
    )

    expect(normalizedData).toEqual([
      {
        id: 'mockId',
        supplier: 'toyuniverse.com',
        name: 'JSON Toy 1',
        price: 10,
      },
      {
        id: 'mockId',
        supplier: 'toyuniverse.com',
        name: 'JSON Toy 2',
        price: 20,
      },
    ])
  })

  it('should normalize XML data', () => {
    const xmlData = [
      { name: 'XML Toy 1', price: '$10' },
      { name: 'XML Toy 2', price: '$20' },
    ]

    const normalizedData = dataNormalizer(xmlData as unknown as ToyXml[], 'XML')

    expect(normalizedData).toEqual([
      { id: 'mockId', supplier: 'kidsworld.com', name: 'XML Toy 1', price: 10 },
      { id: 'mockId', supplier: 'kidsworld.com', name: 'XML Toy 2', price: 20 },
    ])
  })

  it('should normalize CSV data', () => {
    const csvData = [
      { 'Product name': 'CSV Toy 1', Price: '$10' },
      { 'Product name': 'CSV Toy 2', Price: '$20' },
    ]

    const normalizedData = dataNormalizer(csvData, 'CSV')

    expect(normalizedData).toEqual([
      { id: 'mockId', supplier: 'toyshop.co.nz', name: 'CSV Toy 1', price: 10 },
      { id: 'mockId', supplier: 'toyshop.co.nz', name: 'CSV Toy 2', price: 20 },
    ])
  })
})
