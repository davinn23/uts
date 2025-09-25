import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  // book.key = "/works/OL12345W" → ambil "OL12345W"
  const bookKey = book.key?.replace('/works/', '') || ''

  return (
    <Link to={`/book/${bookKey}`} className="block border rounded-md p-4 hover:shadow-lg transition cursor-pointer h-full">
      <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
      <p className="text-sm text-gray-700 mb-1">{book.author_name?.join(', ') || 'Unknown Author'}</p>
      <p className="text-xs text-gray-500">First published: {book.first_publish_year || 'N/A'}</p>
    </Link>
  )
}
