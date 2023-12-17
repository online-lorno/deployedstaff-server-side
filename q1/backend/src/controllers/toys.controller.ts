import { Request, Response } from 'express'
import JsonSupplierService from '../services/json_supplier.service'
import XmlSupplierService from '../services/xml_supplier.service'
import CsvSupplierService from '../services/csv_supplier.service'
import { dataNormalizer } from '../utils/dataNormalizer'

class ToysController {
  private jsonSupplierService: typeof JsonSupplierService
  private xmlSupplierService: typeof XmlSupplierService
  private csvSupplierService: typeof CsvSupplierService

  constructor() {
    this.jsonSupplierService = JsonSupplierService
    this.xmlSupplierService = XmlSupplierService
    this.csvSupplierService = CsvSupplierService
  }

  public getToys = async (req: Request, res: Response): Promise<void> => {
    try {
      const toysFromJsonSupplier = dataNormalizer(
        await this.jsonSupplierService.getToys(),
        'JSON'
      )
      const toysFromXmlSupplier = dataNormalizer(
        await this.xmlSupplierService.getToys(),
        'XML'
      )
      const toysFromCsvSupplier = dataNormalizer(
        await this.csvSupplierService.getToys(),
        'CSV'
      )

      const normalizedToys = [
        ...toysFromJsonSupplier,
        ...toysFromXmlSupplier,
        ...toysFromCsvSupplier,
      ]

      res.json(normalizedToys)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}

export default ToysController
