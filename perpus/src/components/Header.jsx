import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white dark:text-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BookFinder
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-md transition-colors"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
