import website from "../assets/website-unscreen.gif"
import arrow from "../assets/arrow-unscreen.gif"
import computer from "../assets/computer-unscreen.gif"
export default function BeforeSearch({ theme, runSearch }) {
    const handleQuickExample = (query) => {
        runSearch(query);
    };
    return (
    <div className={`w-full min-h-[60vh] flex items-center justify-center p-6 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
        <div className="max-w-3xl text-center space-y-4 md:space-y-6">
        {/* Search Icon */}
            <div className="mx-auto w-20 h-20 cursor-pointer rounded-2xl flex items-center justify-center  bg-gradient-to-br from-indigo-500 to-sky-400 shadow-2xl hover:scale-110 transition-all">
                <img src={computer} alt="" />
            </div>
        {/* Heading */}
        <h1 className="flex flex-col items-center text-3xl md:text-4xl font-extrabold leading-tight">
            <span className="inline-block mr-2">Discover stunning images</span>
            <span className="typewriter text-sky-400 text-2xl font-bold" aria-hidden="true">
            beautiful — unique — free
            </span>
        </h1>
        {/* Subtitle */}
        <p className="mx-auto max-w-xl text-sm md:text-base">
            <span className="shimmer inline-block px-1">
            Search from millions of photos — try "mountains", "city night", or "portrait".
            </span>
        </p>
        {/* Quick Examples */}
<div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
  {["mountains", "city night", "space", "nature", "hills", "animals", "art", "rocket"].map((item, i) => (
    <button
      key={i}
      onClick={() => handleQuickExample(item)}
      className={`px-2 py-1 md:px-4 md:py-2 flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm 
      ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-800'} transition`}
    >
      {/* ICON */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${theme === "dark" ? "text-sky-300" : "text-blue-500"} w-4 h-4`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12h18M3 6h18M3 18h18"
        />
      </svg>

      {/* TEXT */}
      <span className="capitalize">{item}</span>
    </button>
  ))}
</div>
        {/* Small Hint */}
        <div className="flex-col text-xs text-gray-500 flex items-center justify-center mt-5">
            <div className="flex items-center justify-center">
                <span className="hidden md:flex items-center gap-1 text-sm whitespace-nowrap">
                    Tip: You can visit my website 
                    <kbd className={`rounded border flex items-center justify-center ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}>
                        <img src={website} alt="web" className="w-8 h-8" />
                    </kbd>
                    and contact me anytime
                </span>
                <span className="flex md:hidden items-center gap-1 text-sm whitespace-nowrap">
                Tip: visit my website and contact me anytime
                </span>
                <svg className="w-5 h-5 animate-bounce text-red-600 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <a href="https://yuvitech.netlify.app/" className="flex items-center text-lg md:text-xl text-blue-500 font-mono font-bold rounded-md transition duration-300 relative group overflow-visible"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit YuviTech website">
                <img src={arrow} alt="arrow" className="w-8 h-8" />YuviTech
                <span className="absolute top-0 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border-blue-500"></span>
                <span className="absolute top-0 -right-2 w-2 h-2 border-t border-r opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border-blue-500"></span>
                <span className="absolute bottom-0 -left-1 w-2 h-2 border-b border-l opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border-blue-500"></span>
                <span className="absolute bottom-0 -right-2 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border-blue-500"></span>
            </a>
        </div>
    </div>
      {/* Animations */}
    <style>{`
        .typewriter{
            display:inline-block;
            overflow:hidden;
            white-space:nowrap;
            max-width:0;
            animation: typing 5s steps(30) infinite, blink .8s step-end infinite;
            border-right: 4px solid aqua;
            padding-right: 6px;
        }
        @keyframes typing {
            from { max-width: 0; }
            to { max-width: 22ch; }
        }
        /* Blink cursor — no change needed */
@keyframes blink {
  50% { border-color: transparent; }
}

/* Main shimmer container */
.shimmer {
  position: relative;
  overflow: hidden; /* text overflow safe */
}

/* Shimmer effect */
.shimmer::after {
  content: "";
  position: absolute;
  left: -40%;
  top: 0;
  height: 100%;
  width: 40%;
  transform: skewX(-20deg);
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0),
    rgba(255,255,255,0.22),
    rgba(255,255,255,0)
  );
  animation: shimmer 2.5s infinite linear;
  pointer-events: none;
}

/* Mobile (default) */
@keyframes shimmer {
  0% { left: -40%; }
  100% { left: 120%; }
}

/* Tablet */
@media (min-width: 640px) {
  .shimmer::after {
    width: 30%;         /* thinner light */
    animation-duration: 2s;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .shimmer::after {
    width: 25%;         /* even smoother */
    animation-duration: 1.6s;
  }
}

        @keyframes shimmer{
            0% { left: -40%; }
            100% { left: 120%; }
        }

        @media (prefers-reduced-motion: reduce) {
            .typewriter, .shimmer::after { animation: none !important; }
        }`}
    </style>
    </div>);
}
