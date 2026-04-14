import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Loader from "./components/Loader";
import StarBackground from "./components/StarBackground";
import Announcements from "./components/Announcements";
import PastEvents from "./components/PastEvents";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import Contact from "./components/Contact";

export default function App() {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [loaderKey, setLoaderKey] = useState(0);

  useEffect(() => {
    // Atmosphere loading delay
    const timer = setTimeout(() => {
      setReady(true);
    }, 1200); // Shorter wait as requested
    return () => clearTimeout(timer);
  }, []);

  const restartLoader = () => {
    setReady(false);
    setLoaderKey(prev => prev + 1);
    setTimeout(() => setReady(true), 1200);
  };


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`relative min-h-screen selection:bg-cyan-500/30 overflow-hidden ${theme === 'light' ? 'text-black' : 'text-slate-100'}`}>
      <StarBackground theme={theme} />
      
      <Loader ready={ready} key={loaderKey} />

      <div className={`relative z-10 transition-all duration-1000 ${ready ? "opacity-100" : "opacity-0 blur-sm pointer-events-none"}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} restartLoader={restartLoader} />

        <main className="mx-auto max-w-6xl px-4 sm:px-6">
          <HeroSection ready={ready} theme={theme} />
          
          <div className="space-y-32 pb-32">
            <Announcements ready={ready} theme={theme} />
            
            <div className="cosmic-divider" />
            
            <PastEvents ready={ready} theme={theme} />
            
            <div className="cosmic-divider" />
            
            <Gallery ready={ready} theme={theme} />
            
            <div className="cosmic-divider" />
            
            <Team ready={ready} theme={theme} />
            
            <div className="cosmic-divider" />
            
            <Contact ready={ready} theme={theme} />
          </div>
        </main>

      </div>
    </div>
  );
}
