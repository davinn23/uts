import { useState, useEffect } from 'react'

export default function useFetchBooks(title, page) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [numFound, setNumFound] = useState(0)

  useEffect(() => {
    if (!title) {
      setBooks([])
      setNumFound(0)
      return
    }

    setLoading(true)
    setError(null)

    fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&page=${page}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        setBooks(data.docs)
        setNumFound(data.numFound)
      })
      .catch(() => setError('Failed to fetch data'))
      .finally(() => setLoading(false))
  }, [title, page])

  return { books, loading, error, numFound }
}
