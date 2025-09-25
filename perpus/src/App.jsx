import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import Header from './components/Header'

export default function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:key" element={<BookDetail />} />
        </Routes>
      </main>
    </Router>
  )
}
