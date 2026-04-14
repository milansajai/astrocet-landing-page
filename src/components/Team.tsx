import React, { useRef, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { teamMembers } from "../utils/data";

export default function Team({ ready, theme }: { ready: boolean, theme: 'light' | 'dark' }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = React.useState(false);

  // Triple for extra buffer room during fast scrolls
  const displayMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || isInteracting) return;

    let animationFrame: number;
    const scroll = () => {
      if (scroller) {
        scroller.scrollLeft += 0.5; // Very slow crawl
        
        // Loop back seamlessly
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft -= scroller.scrollWidth / 2;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInteracting]);

  return (
    <section
      id="team"
      className={`reveal scroll-mt-32 overflow-hidden py-0 pb-20 ${ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: "380ms" }}
    >
      <SectionHeader
        eyebrow="The Crew"
        title="A core team keeping the club's celestial mission alive"
        description="navigating the observatory rhythm..."
        theme={theme}
      />

      <div className="relative group mt-10 overflow-hidden">
        {/* Horizontal Scroller Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 no-scrollbar cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayMembers.map((member, idx) => (
            <div
              key={`${member.name}-${idx}`}
              className="shrink-0 w-[280px] md:w-[320px]"
            >
              <div className={`relative h-full overflow-hidden rounded-3xl border p-6 transition-all duration-500 hover:scale-[1.02] ${theme === 'light' ? 'bg-white border-slate-200 shadow-sm hover:shadow-xl' : 'bg-white/[0.03] border-white/10 backdrop-blur-xl hover:bg-white/[0.06]'}`}>

                {/* Profile Image Container */}
                <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl bg-slate-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(member.name)}`;
                    }}
                    className="h-full w-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-at-bottom from-transparent to-black/60" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className={`text-xl font-black font-bitcount tracking-[0.05em] ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500">
                      {member.role}
                    </p>
                  </div>

                  <p className={`text-sm leading-6 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300/80'}`}>
                    {member.detail}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={`mailto:${member.email}`}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:scale-110 ${theme === 'light' ? 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
                      title="Email Member"
                    >
                      <span className="text-xs">✉</span>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:scale-110 ${theme === 'light' ? 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
                      title="LinkedIn Profile"
                    >
                      <span className="text-xs">in</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placebo View Full Team Button */}
      <div className="mt-12 flex justify-center">
        <button 
          className={`group relative overflow-hidden rounded-full border px-10 py-4 font-bold tracking-[0.2em] transition-all duration-500 hover:scale-105 active:scale-95 ${theme === 'light' ? 'border-slate-200 bg-white text-slate-900 shadow-xl' : 'border-white/10 bg-white/5 text-white backdrop-blur-md'}`}
        >
          <span className="relative z-10 transition-colors uppercase text-sm">View Full Team</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </button>
      </div>
    </section>
  );
}
