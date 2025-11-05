import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useCustomAPI = (initialURL) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchData() {
    try {
      const response = await axios.get(initialURL)
      setProducts(response.data)
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [initialURL])

  return { products, loading, error }
}

export default useCustomAPI
