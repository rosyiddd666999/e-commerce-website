import './App.css'
import axios from './config/axios.ts'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState<string>('Loading...')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get('/products')
        setData(JSON.stringify(response.data, null, 2))
        console.log('Connection success:', response.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || err.message)
        console.error('Connection error:', err)
      }
    }

    testConnection()
  }, [])

  return (
    <>
      <h1>Test Connection</h1>
      {error ? (
        <p style={{color: 'red'}}>Error: {error}</p>
      ) : (
        <pre style={{color: 'green', textAlign: 'left'}}>{data}</pre>
      )}
    </>
  )
}

export default App