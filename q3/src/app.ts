import express from 'express'

import { Barber, Appointment, Queue } from './types'
// Example usage:
const barbers: Barber[] = [
  {
    id: 1,
    name: 'Barber 1',
    start_shift: new Date('2023-01-01T08:00:00'),
    end_shift: new Date('2023-01-01T16:00:00'),
  },
  // Add more barbers as needed
]
const appointments: Appointment[] = [
  {
    barber_id: 1,
    start_time: new Date('2023-01-01T08:00:00'),
    end_time: new Date('2023-01-01T08:30:00'),
  },
  // Add more appointments as needed
]
const queue: Queue[] = [
  {
    id: 1,
    arrival_time: new Date('2023-01-01T08:00:00'),
    customer_name: 'Customer 1',
  },
  {
    id: 2,
    arrival_time: new Date('2023-01-01T08:10:00'),
    customer_name: 'Customer 2',
  },
  // Add more customers to the queue as needed
]

const app = express()

// Middleware for parsing JSON
app.use(express.json())

app.get('/waiting-time', async (req, res) => {
  try {
    if (!req.query.queue_id) {
      return res.status(400).json({ error: 'Missing queue_id' })
    }
    const waitingTime = calculateWaitingTime(+req.query.queue_id)
    res.json({ waitingTime })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Calculate waiting time based on barbers' schedules, appointments, and queue
function calculateWaitingTime(queue_id: number): number {
  const serviceInterval = 30 // minutes
  const timeChecked = new Date('2023-01-01T08:15:00') // time when customer checks queue waiting time

  // Sort appointments and barbers by start time
  const sortedAppointments = [...appointments].sort(
    (a, b) => a.start_time.getTime() - b.start_time.getTime()
  )
  const sortedBarbers = [...barbers].sort(
    (a, b) => a.start_shift.getTime() - b.start_shift.getTime()
  )

  // // Calculate the number of barbers available at each appointment
  // const barbersAvailable: number[] = []
  // sortedAppointments.forEach((appointment) => {
  //   const overlappingAppointments = appointments.filter(
  //     (a) =>
  //       a.start_time < appointment.end_time &&
  //       a.end_time > appointment.start_time
  //   )
  //   const overlappingBarbers = sortedBarbers.filter(
  //     (b) =>
  //       b.start_shift <= appointment.end_time &&
  //       b.end_shift >= appointment.start_time
  //   )
  //   barbersAvailable.push(
  //     overlappingAppointments.length + overlappingBarbers.length
  //   )
  // })

  // // Calculate the number of barbers available for each customer in the queue
  // const barbersForQueue: number[] = []
  // queue.forEach((customer) => {
  //   const overlappingAppointments = sortedAppointments.filter(
  //     (a) =>
  //       a.start_time <= customer.arrival_time &&
  //       a.end_time > customer.arrival_time
  //   )
  //   const overlappingBarbers = sortedBarbers.filter(
  //     (b) =>
  //       b.start_shift <= customer.arrival_time &&
  //       b.end_shift > customer.arrival_time &&
  //       !appointments.some(
  //         (a) =>
  //           a.barber_id === b.id &&
  //           a.start_time <= customer.arrival_time &&
  //           a.end_time > customer.arrival_time
  //       )
  //   )
  //   barbersForQueue.push(
  //     overlappingAppointments.length + overlappingBarbers.length
  //   )
  // })

  // // Calculate the total waiting time
  // let totalWaitingTime = 0
  // for (let i = 0; i < queue.length; i++) {
  //   totalWaitingTime +=
  //     Math.max(0, barbersForQueue[i] - barbersAvailable[i]) * serviceInterval
  // }

  // return totalWaitingTime

  return 0
}

// Start the server on port 5001
const port = 5001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
