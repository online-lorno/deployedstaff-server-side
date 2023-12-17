import axios from 'axios'
import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import { ToyCsv } from '../types/toys'

class CsvSupplierService {
  private static instance: CsvSupplierService
  private baseURL: string

  private constructor() {
    this.baseURL = 'https://api.supplier3.com'
  }

  public static getInstance(): CsvSupplierService {
    if (!CsvSupplierService.instance) {
      CsvSupplierService.instance = new CsvSupplierService()
    }

    return CsvSupplierService.instance
  }

  public async getToys(): Promise<ToyCsv[]> {
    try {
      // const response = await axios.get(`${this.baseURL}/toys`)
      // return response.data

      const result: ToyCsv[] = await new Promise((resolve, reject) => {
        const results: ToyCsv[] = []

        fs.createReadStream(path.resolve(__dirname, '../constants/data.csv'))
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', (error) => reject(error))
      })
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default CsvSupplierService.getInstance()
