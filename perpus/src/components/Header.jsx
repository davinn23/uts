// src/components/Header.jsx
import perpusLogo from "../assets/perpus.png"
import DarkMode from "./DarkMode"

export default function Header({ onReset }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* klik logo untuk reset */}
        <div
          className="flex items-center space-x-2 group cursor-pointer"
          onClick={onReset}
        >
          <img
            src={perpusLogo}
            alt="BookFinder Logo"
            className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="hidden sm:inline-block font-bold text-white text-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500">
            BookFinder
          </span>
        </div>

        <DarkMode />
      </div>
    </header>
  )
}
