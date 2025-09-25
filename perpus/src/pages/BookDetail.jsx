import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Loader from "../components/Loader"

export default function BookDetail() {
  const { key } = useParams()
  const [bookDetail, setBookDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`https://openlibrary.org/works/${key}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Book not found")
        return res.json()
      })
      .then((data) => setBookDetail(data))
      .catch(() => setError("Failed to load book details"))
      .finally(() => setLoading(false))
  }, [key])

  if (loading) return <Loader />

  if (error)
    return (
      <div className="max-w-3xl mx-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow transition-colors duration-500">
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 underline mb-4 inline-block"
        >
          ← Back to list
        </Link>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    )

  if (!bookDetail)
    return (
      <div className="max-w-3xl mx-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow transition-colors duration-500">
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 underline mb-4 inline-block"
        >
          ← Back to list
        </Link>
        <p className="text-gray-700 dark:text-gray-300">Book not found.</p>
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow transition-colors duration-500">
      <Link
        to="/"
        className="text-blue-600 dark:text-blue-400 underline mb-4 inline-block"
      >
        ← Back to list
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {bookDetail.title}
      </h1>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        {typeof bookDetail.description === "string"
          ? bookDetail.description
          : bookDetail.description?.value || "No description available."}
      </p>

      {bookDetail.subjects && (
        <div className="mb-4">
          <h2 className="font-semibold text-xl mb-2 text-gray-900 dark:text-gray-100">
            Subjects:
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {bookDetail.subjects.map((subject, idx) => (
              <li key={idx}>{subject}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
