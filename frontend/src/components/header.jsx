
export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-2 bg-white shadow-sm border-b sticky top-0 z-50 w-full">
      {/* Left: Logo */}
      <div className="text-[#B92B27] font-extrabold text-2xl tracking-tight">
        Quora
      </div>

      {/* Middle: Search bar */}
      <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 w-[300px] border border-gray-300">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16 10.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search Quora"
          className="bg-transparent focus:outline-none ml-2 text-sm text-gray-700 placeholder-gray-500 w-full"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-3">
        {/* Menu Icon */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center font-bold text-white text-sm">
          R
        </div>
      </div>
    </header>
  );
}
