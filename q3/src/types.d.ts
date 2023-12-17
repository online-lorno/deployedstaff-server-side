export interface Barber {
  id: number
  name: string
  start_shift: Date
  end_shift: Date
}

export interface Appointment {
  barber_id: number
  start_time: Date
  end_time: Date
}

export interface Queue {
  id: number
  arrival_time: Date
  customer_name: string
}
