import { useState, useEffect } from "react";

export default function Navbar({ theme, toggleTheme, restartLoader }: { theme: 'light' | 'dark', toggleTheme: () => void, restartLoader?: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-4 transition-colors duration-300">
      <nav 
        className={`mx-auto max-w-6xl px-4 transition-all duration-1000 hover:duration-500 ease-in-out will-change-transform sm:px-6 ${scrolled ? 'scale-[0.92] opacity-80 translate-y-1' : 'scale-100 opacity-100'} hover:scale-100 hover:opacity-100 group`}
      >
        <div className={`flex items-center justify-between rounded-full border px-4 py-3 transition-colors duration-1000 hover:duration-500 ${theme === 'light' ? 'bg-white/80 group-hover:bg-white/100 border-slate-200' : 'bg-slate-950/65 group-hover:bg-slate-950/95 border-white/10'} backdrop-blur-xl shadow-lg`}>
          <button 
            onClick={restartLoader}
            className={`flex items-center gap-3 text-sm font-semibold tracking-[0.22em] transition-opacity hover:opacity-70 ${theme === 'light' ? 'text-black' : 'text-white/90'}`}
          >
            <span className="font-bitcount">ASTROCET</span>
          </button>

          <div className={`hidden items-center gap-7 text-[10px] font-bold uppercase tracking-[0.28em] md:flex ${theme === 'light' ? 'text-slate-600' : 'text-slate-300/80'}`}>
            <a className="transition-colors hover:text-cyan-500" href="#top">HOME</a>
            <a className="transition-colors hover:text-cyan-500" href="#announcements">ANNOUNCEMENTS</a>
            <a className="transition-colors hover:text-cyan-500" href="#events">EVENTS</a>
            <a className="transition-colors hover:text-cyan-500" href="#gallery">GALLERY</a>
            <a className="transition-colors hover:text-cyan-500" href="#team">TEAM</a>
            
            <button 
              onClick={toggleTheme}
              className={`ml-4 p-2 w-10 h-10 flex items-center justify-center rounded-full border transition-all ${theme === 'light' ? 'border-slate-200 hover:bg-slate-100' : 'border-white/10 hover:bg-white/5'}`}
              aria-label="Toggle theme"
            >
              <span className="text-xl leading-none">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
