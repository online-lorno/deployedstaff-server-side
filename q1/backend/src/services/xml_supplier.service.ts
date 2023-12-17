import axios from 'axios'
import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'
import { ToyXml, ToyXmlResponse } from '../types/toys'

class XmlSupplierService {
  private static instance: XmlSupplierService
  private baseURL: string

  private constructor() {
    this.baseURL = 'https://api.supplier2.com'
  }

  public static getInstance(): XmlSupplierService {
    if (!XmlSupplierService.instance) {
      XmlSupplierService.instance = new XmlSupplierService()
    }

    return XmlSupplierService.instance
  }

  public async getToys(): Promise<ToyXml[]> {
    try {
      // const response = await axios.get(`${this.baseURL}/toys`)
      // return response.data

      const parser = new xml2js.Parser()
      const result: ToyXmlResponse = await parser.parseStringPromise(
        fs.readFileSync(path.resolve(__dirname, '../constants/data.xml'))
      )
      return result.products.product.map((product) => ({
        name: product.name[0],
        price: product.price[0],
      }))
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default XmlSupplierService.getInstance()
