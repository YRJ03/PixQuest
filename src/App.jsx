import { useState, useEffect } from "react";
import { CiLight, CiDark } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import BeforeSearch from "./components/BeforeSearch";
import smartphone from "../src/assets/smartphone-unscreen.gif";
import axios from "axios";

export default function Header() {
  const token = "rb5Wcel1i9ev7KQpqFucLTec1_wNTdWbeBOx0GeGgkc";

  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [liked, setLiked] = useState({});
  const [openOverlay, setOpenOverlay] = useState(null);

  // FETCH DATA
  const fetchData = async (newPage, searchQ) => {
    if (!searchQ.trim()) return;

    try {
      setLoading(true);
      const result = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchQ}&client_id=${token}&page=${newPage}&per_page=12`
      );

      setImages((prev) => {
        const merged = [...prev, ...result.data.results];

        return merged.filter((item, index, arr) => arr.findIndex((x) => x.id === item.id) === index);
      });

      setMore(result.data.results.length > 0);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching images:", err);
      setLoading(false);
    }
  };

  // SEARCH FROM INPUT
  const searchInput = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setImages([]);
    setPage(1);
    setActiveQuery(query);
    fetchData(1, query);
  };

  // LOAD MORE
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, activeQuery);
  };

  // THEME
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // LIKE
  const likeBtn = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // START SEARCH FOCUS FUNCTION
  const focusSearchBox = () => {
    const input = document.getElementById("search-input");
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // QUICK EXAMPLE FUNCTION
  const runDirectSearch = (query) => {
    setQuery(query);
    setActiveQuery(query);
    setImages([]);
    setPage(1);
    fetchData(1, query);
    focusSearchBox();
  };

  const downloadImage = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename || "image.jpg";
    link.click();
    URL.revokeObjectURL(link.href);
  };


  return (
    <section className="w-full">
      <header
        className={`w-full md:fixed top-0 left-0 z-50 md:shadow ${
          theme === "dark" ? "md:bg-black text-white" : "md:bg-white text-black"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between p-6 md:px-8 md:py-2">
          <div className="w-auto flex">
            <img src={smartphone} alt="logo" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 select-none" />
            <h1 className="font-mono font-extrabold px-2 text-3xl select-none flex items-center">
              <span>Pix</span>
              <span className={`${theme === 'dark' ? 'text-blue-500' : 'text-green-600'}`}>Quest</span>
            </h1>
          </div>

          <div className="flex items-center gap-5">
            {/* DESKTOP SEARCH */}
            <form onSubmit={searchInput} className="hidden md:flex items-center gap-2 rounded-xl overflow-hidden border">
              <input
                id="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search Images…"
                className={`outline-none w-[85%] text-sm px-4 py-2 rounded-l-md border-r ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
                }`}
              />
              <button type="submit">
                <FaSearch size={18} />
              </button>
            </form>

            {/* THEME BUTTON */}
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`p-1 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}`}>
              {theme === "light" ? <CiDark size={26} /> : <CiLight size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="w-full flex items-center justify-center md:hidden px-4 pb-3">
          <form onSubmit={searchInput} className="flex items-center gap-2 rounded-xl overflow-hidden border w-60">
            <input
              id="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search Images…"
              className={`outline-none w-[85%] text-sm px-4 py-2 rounded-l-md border-r ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
              }`}
            />
            <button type="submit">
              <FaSearch size={18} />
            </button>
          </form>
        </div>
      </header>

      {/* BEFORE SEARCH SCREEN */}
      <div
        className="
          flex items-center justify-center  
          md:mt-20 
        "
      >
        {activeQuery === "" && (
          <BeforeSearch
            onStartSearch={focusSearchBox}
            runSearch={runDirectSearch}
            setActiveQuery={setActiveQuery} 
            theme = {theme}
          />
        )}
      </div>

      {/* ACTIVE QUERY TITLE */}
      {activeQuery !== "" && (
        <div className="flex items-start justify-center py-4 font-mono rounded-md">
          <span className="px-6 text-2xl">{activeQuery}</span>
        </div>
      )}

      {/* LOADING */}
      {loading && <p className="text-center text-lg">Loading images...</p>}

      {/* IMAGE GRID */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-5 px-4">
        {images.map((img) => {
          const isLiked = liked[img.id] || false;
          const likeCount = img.likes + (isLiked ? 1 : 0);

          return (
            <div
              key={img.id}
              className="relative mb-5 break-inside-avoid rounded-md overflow-hidden group shadow-md hover:shadow-xl transition cursor-pointer"
              onClick={() => setOpenOverlay(openOverlay === img.id ? null : img.id)}
            >
              <img
                src={img.urls.small}
                alt={img.alt_description}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div
                className={`absolute inset-0 bg-black/40 transition-all duration-300 flex flex-col justify-between p-4 ${
                  openOverlay === img.id ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="absolute top-1 left-1 md:static flex items-center gap-1 md:gap-2">
                    <img src={img.user.profile_image.small} className="w-6 md:w-7 h-6 md:h-7 rounded-full" />
                    <span className="w-[55%] h-4 md:w-auto md:h-auto overflow-hidden text-white text-xs md:text-sm md:font-medium">
                      {img.user.name}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      likeBtn(img.id);
                    }}
                    className={`absolute top-1 right-1 md:static p-1 rounded-md text-xs md:text-sm font-semibold transition ${
                      isLiked ? "bg-red-500 text-white scale-110" : "bg-black/40 text-white hover:bg-black/60"
                    }`}
                  >
                    ❤️ {likeCount}
                  </button>
                </div>

                <div className="w-full flex items-center justify-center md:justify-between">
                  <h3 className="w-[53%] md:w-[60%] absolute bottom-2 left-1 md:static text-white text-xs md:text-sm font-semibold line-clamp-2">
                    {img.alt_description || "Beautiful Image"}
                  </h3>

                  <button
                    onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(img.urls.full, `${img.id}.jpg`);
                    }}
                    className="absolute bottom-3 right-1 md:static px-1 md:px-2 py-1 bg-white/90 text-black text-xs font-semibold rounded-md hover:bg-white">
                    Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEE MORE BUTTON */}
      {!loading && more && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="mt-4 active:scale-95 px-5 py-2 mb-10 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition text-sm md:text-lg relative font-medium"
          >
            See More
          </button>
        </div>
      )}
    </section>
  );
}
