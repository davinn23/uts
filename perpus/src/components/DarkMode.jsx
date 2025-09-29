import { useState, useEffect } from "react"
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
    }
  }, [])

  const toggle = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setDarkMode(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setDarkMode(true)
    }
  }

  return (
    <button
      onClick={toggle}
      className="relative w-16 h-8 rounded-full transition-colors duration-300 bg-gray-300 dark:bg-gray-700 flex items-center"
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${
          darkMode ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {darkMode ? (
          <MoonIcon className="w-4 h-4 text-gray-800" />
        ) : (
          <SunIcon className="w-4 h-4 text-yellow-500" />
        )}
      </span>
    </button>
  )
}
