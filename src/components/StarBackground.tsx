
export default function StarBackground({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div 
      className={`fixed inset-0 z-0 transition-all duration-1000 ${theme === 'light' ? 'bg-white' : 'bg-[#02030a]'}`}
      aria-hidden="true"
    >
      {/* Stars Layer 1 (Drifting) */}
      <div 
        className="space-bg pointer-events-none fixed inset-0 opacity-100 transition-opacity duration-1000" 
      />
      
      {/* Nebula (Themed via CSS) */}
      <div className="nebula pointer-events-none fixed inset-0 transition-all duration-1000" style={{ opacity: 'var(--nebula-opacity)' }} />
      
      {/* Drifting Moon (Crescent) */}
      <div 
        className={`absolute top-[8%] right-[12%] w-20 h-20 transition-all duration-[3000ms] ease-out pointer-events-none ${theme === 'light' ? 'opacity-30 scale-90 translate-x-10 grayscale' : 'opacity-50 scale-100 translate-x-0'}`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400 dark:text-slate-100 fill-current filter drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] animate-float-slow">
          <path d="M50,10 A40,40 0 1,0 90,50 A35,35 0 1,1 50,10" />
        </svg>
      </div>

      <div className="noise-overlay pointer-events-none fixed inset-0 z-1 opacity-[0.03]" />
    </div>
  );
}
