
import { useState, useEffect } from "react"

export default function useFetchBooks(query, page) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [numFound, setNumFound] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // fallback query kalau kosong
    const fallback = "the"
    const searchQuery = query && query.trim() !== "" ? query.trim() : fallback

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      searchQuery
    )}&page=${page}`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      })
      .then((data) => {
        let docs = data.docs || []

        // === filter manual di sisi client ===
        if (/^\d{3,4}$/.test(query)) {
          // input berupa angka → filter tahun
          docs = docs.filter(
            (book) => book.first_publish_year?.toString() === query
          )
        } else if (query?.toLowerCase().startsWith("author:")) {
          // input "author:nama"
          const authorName = query.replace(/author:/i, "").trim()
          docs = docs.filter((book) =>
            (book.author_name || [])
              .join(" ")
              .toLowerCase()
              .includes(authorName.toLowerCase())
          )
        }

        setBooks(docs)
        setNumFound(docs.length)
      })
      .catch((err) => {
        console.error("useFetchBooks error:", err)
        setError("Failed to fetch data")
        setBooks([])
        setNumFound(0)
      })
      .finally(() => setLoading(false))
  }, [query, page])

  return { books, loading, error, numFound }
}
