export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6 transition-colors duration-500">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
      >
        Prev
      </button>

      <span className="text-gray-700 dark:text-gray-300">
        {page} / {totalPages || 1}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
      >
        Next
      </button>
    </div>
  )
}
