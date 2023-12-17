export interface ToyCsv {
  'Product name': string
  Price: string
}

export interface ToyJson {
  name: string
  price: number
}

export interface ToyXml {
  name: string
  price: number
}

export interface ToyXmlResponse {
  products: {
    product: [
      {
        name: [string]
        price: [number]
      }
    ]
  }
}

export interface Toy {
  id: string
  supplier: string
  name: string
  price: number
}

export type DataFormat = 'JSON' | 'XML' | 'CSV'
