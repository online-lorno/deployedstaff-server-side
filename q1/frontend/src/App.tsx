import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Toy {
  id: number
  name: string
  price: number
  supplier: string
}

function App() {
  const [suppliers, setSuppliers] = useState<string[]>([])
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [toys, setToys] = useState<Toy[]>([])

  useEffect(() => {
    const getToys = async () => {
      const response = await fetch('http://localhost:5001/toys')
      const data: Toy[] = await response.json()
      setToys(data)

      const uniqueSuppliers = Array.from(
        new Set(data.map((toy: Toy) => toy.supplier))
      )
      setSuppliers(uniqueSuppliers)
    }
    getToys()
  }, [])

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h2>Vite + React</h2>

      <div className="toyshop">
        <select
          onChange={(e) => setSelectedSupplier(e.target.value)}
          value={selectedSupplier}
        >
          <option value="">Select a toyshop</option>
          {suppliers.map((supplier) => (
            <option key={supplier} value={supplier}>
              {supplier}
            </option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              {/* <th>Supplier</th> */}
            </tr>
          </thead>
          <tbody>
            {toys
              .filter(
                (toy) => !selectedSupplier || toy.supplier === selectedSupplier
              )
              .map((toy) => (
                <tr key={toy.id}>
                  <td>{toy.name}</td>
                  <td>{toy.price}</td>
                  {/* <td>{toy.supplier}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
