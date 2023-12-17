// import axios from 'axios'
import DataJSON from '../constants/data.json'
import { ToyJson } from '../types/toys'

class JsonSupplierService {
  private static instance: JsonSupplierService
  private baseURL: string

  private constructor() {
    this.baseURL = 'https://api.supplier1.com'
  }

  public static getInstance(): JsonSupplierService {
    if (!JsonSupplierService.instance) {
      JsonSupplierService.instance = new JsonSupplierService()
    }

    return JsonSupplierService.instance
  }

  public async getToys(): Promise<ToyJson[]> {
    try {
      // const response = await axios.get(`${this.baseURL}/toys`)
      // return response.data

      return DataJSON
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default JsonSupplierService.getInstance()
