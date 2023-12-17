export interface OrderWebookXml {
  order_detail: {
    id: string
  }
}

export interface OrderSftpXml {
  order_detail: Order
}

export interface Order {
  id: string
  customer: string
  product: {
    name: string
    price: string
    qty: string
  }
}
