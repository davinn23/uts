import { useState } from "react"
import useFetchBooks from "../hooks/useFetchBooks"
import BookCard from "../components/BookCard"
import Pagination from "../components/Pagination"
import Loader from "../components/Loader"
import Header from "../components/Header"

export default function Home() {
  const [searchTitle, setSearchTitle] = useState("") // default kosong
  const [page, setPage] = useState(1)

  const handleReset = () => {
    setSearchTitle("")
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="px-4 py-6">
        <HomeWithPagination
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  )
}

function HomeWithPagination({ searchTitle, setSearchTitle, page, setPage }) {
  const pageApi = Math.ceil(page / 10) || 1
  const pageClientIndex = (page - 1) % 10

  const { books, loading, error, numFound } = useFetchBooks(searchTitle, pageApi)
  const totalPages = Math.ceil(numFound / 10)

  const displayedBooks = books.slice(
    pageClientIndex * 10,
    pageClientIndex * 10 + 10
  )

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Input */}
      <input
        type="text"
        className="border border-gray-300 dark:border-gray-700 p-2 mb-6 w-full max-w-md rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 transition-colors duration-500"
        placeholder="Search by title, year, or author (contoh: author:knuth)"
        value={searchTitle}
        onChange={(e) => {
          setSearchTitle(e.target.value)
          setPage(1)
        }}
      />

      {/* Loader */}
      {loading && <Loader />}

      {/* Error */}
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

      {/* No Results */}
      {!loading && !error && displayedBooks.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No books found.
        </p>
      )}

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-colors duration-500">
        {displayedBooks.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  )
}
