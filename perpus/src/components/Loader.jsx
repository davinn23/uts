// src/Components/Loader.jsx
export default function Loader() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="relative w-16 h-12">
        {/* Kiri halaman */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-blue-500 rounded-l-md animate-pulse"></div>
        {/* Kanan halaman */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-blue-700 rounded-r-md animate-pulse"></div>
        {/* Tulang buku */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white"></div>
      </div>
    </div>
  );
}
