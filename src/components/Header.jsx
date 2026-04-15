import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/images/apple-music.jpg';
import { CiSearch } from "react-icons/ci";
import { songs } from '../data/Song';
import { albums } from '../data/Albums';

export default function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }
    const lower = q.toLowerCase();
    const matchedSongs = songs.filter(s =>
      s.name.toLowerCase().includes(lower) || s.singer.toLowerCase().includes(lower)
    ).map(s => ({ ...s, type: 'song' }));

    const matchedAlbums = albums.filter(a =>
      a.name.toLowerCase().includes(lower) || a.singer.toLowerCase().includes(lower)
    ).map(a => ({ ...a, type: 'album' }));

    setResults([...matchedSongs, ...matchedAlbums].slice(0, 8));
    setShowResults(true);
  };

  const handleResultClick = (item) => {
    setQuery('');
    setShowResults(false);
    if (item.type === 'album') {
      navigate(`/album/${item.id}`);
    }
  };

  return (
    <div className="flex items-center justify-between bg-[#323750] border-b border-[#1E2237] text-white h-full px-5 gap-4">
      {/* Logo */}
      <nav className="flex items-center gap-2.5 shrink-0">
        <img src={logo} alt="Logo" className="w-[40px] rounded-md"/>
        <span className="font-semibold text-sm hidden sm:block">Sound Wave</span>
      </nav>

      {/* Search */}
      <div className="relative flex-1 max-w-[500px]">
        <div className="flex items-center bg-[#272D43] rounded-full px-3 py-2 gap-2">
          <CiSearch size={18} color="#9ca3af"/>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            onFocus={() => query && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 150)}
            placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
            className="bg-transparent border-none outline-none text-sm text-white placeholder-[#6b7280] w-full"
          />
        </div>

        {/* Dropdown results */}
        {showResults && results.length > 0 && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-[#1E2237] border border-[#333] rounded-xl shadow-xl z-50 overflow-hidden">
            {results.map((item, i) => (
              <div
                key={`${item.type}-${item.id}-${i}`}
                onMouseDown={() => handleResultClick(item)}
                className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <img
                  src={item.type === 'album' ? item.image : item.src_img}
                  alt=""
                  className="w-9 h-9 rounded object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm text-white m-0 truncate">{item.name}</p>
                  <p className="text-xs text-[#9ca3af] m-0">{item.singer} · {item.type === 'album' ? 'Album' : 'Bài hát'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {showResults && query && results.length === 0 && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-[#1E2237] border border-[#333] rounded-xl shadow-xl z-50 px-4 py-3">
            <p className="text-sm text-[#6b7280] m-0">Không tìm thấy kết quả cho "{query}"</p>
          </div>
        )}
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <Link
          to="/register"
          className="text-sm text-white no-underline px-4 py-2 rounded-full hover:text-white/80 transition-colors"
        >
          Đăng ký
        </Link>
        <Link
          to="/login"
          className="bg-white text-[#323750] text-sm font-semibold no-underline px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
