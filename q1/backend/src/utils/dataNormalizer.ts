import { randomBytes } from 'crypto'
import { Toy, ToyJson, ToyCsv, DataFormat, ToyXml } from '../types/toys'

export function dataNormalizer(
  data: ToyJson[] | ToyCsv[] | ToyXml[],
  format: DataFormat
): Toy[] {
  let normalizedData: Toy[] = []

  switch (format) {
    case 'JSON':
      normalizedData = (data as ToyJson[]).map((item: ToyJson) => ({
        id: randomBytes(16).toString('hex'),
        supplier: 'toyuniverse.com',
        name: item.name,
        price: Number(item.price.toString().replace('$', '')),
      }))
      break
    case 'XML':
      normalizedData = (data as ToyXml[]).map((item: ToyXml) => ({
        id: randomBytes(16).toString('hex'),
        supplier: 'kidsworld.com',
        name: item.name,
        price: Number(item.price.toString().replace('$', '')),
      }))
      break
    case 'CSV':
      normalizedData = (data as ToyCsv[]).map((item: ToyCsv) => ({
        id: randomBytes(16).toString('hex'),
        supplier: 'toyshop.co.nz',
        name: item['Product name'],
        price: Number(item.Price.replace('$', '')),
      }))
      break
    default:
      throw new Error(`Unsupported format: ${format}`)
  }

  return normalizedData
}
