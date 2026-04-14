import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { galleryItems, createArtwork, isGalleryBaseItem } from "../utils/data";

export default function Gallery({ ready, theme }: { ready: boolean, theme: 'light' | 'dark' }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const processedItems = galleryItems.map((item, index) => {
    const isClockwise = index % 2 === 0;
    const tiltClass = `orbit-tilt-${(index % 3) + 1}`;

    return {
      title: item.title,
      subtitle: item.subtitle,
      src: isGalleryBaseItem(item) ? createArtwork(item) : item.src,
      radius: 180 + (index % 4) * 85,
      speed: 40 + (index % 3) * 25,
      delay: -index * 12,
      isClockwise,
      tiltClass
    };
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section
      id="gallery"
      className={`reveal scroll-mt-32 overflow-hidden pt-24 pb-0 ${ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: "310ms" }}
    >
      <SectionHeader
        eyebrow="Interactive Swarm"
        title="Club moments at a glimpse"
        description="Click any circle to pause the system and explore the details."
        theme={theme}
      />

      {/* Orbit Container */}
      {/* Orbit Container */}
      <div
        className="relative h-[750px] w-full flex flex-col items-center justify-center perspective-[1200px] mx-auto overflow-visible"
      >
        {processedItems.map((item, index) => (
          <div
            key={item.title}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${item.tiltClass} pointer-events-none`}
            style={{
              width: `${item.radius * 2}px`,
              height: `${item.radius * 2}px`,
            }}
          >
            <div
              className={`orbit-container w-full h-full ${item.isClockwise ? 'orbit-spin-cw' : 'orbit-spin-ccw'}`}
              style={{
                '--orbit-speed': `${item.speed}s`,
                '--orbit-delay': `${item.delay}s`,
                animationPlayState: selectedIdx !== null ? 'paused' : 'running',
              } as React.CSSProperties}
            >
              <button
                onClick={() => setSelectedIdx(index)}
                type="button"
                className={`lift-hover group absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto aspect-square w-12 sm:w-16 rounded-full border border-white/10 bg-white/[0.03] p-1 shadow-[0_6px_22px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${item.isClockwise ? 'planet-counter-cw' : 'planet-counter-ccw'}`}
                style={{
                  '--orbit-speed': `${item.speed}s`,
                  '--orbit-delay': `${item.delay}s`,
                  animationPlayState: selectedIdx !== null ? 'paused' : 'running',
                } as React.CSSProperties}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="relative z-10 h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-125 select-none"
                />
                <div className="absolute inset-x-[-40%] bottom-[-1.8rem] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[9px] font-black uppercase tracking-widest text-cyan-400 truncate">{item.title}</p>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl transition-all duration-300 animate-in fade-in"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Close Button UI Fix: Large, easy to click, and proper z-index */}
          <button
            type="button"
            className="absolute top-10 right-10 z-[210] h-14 w-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all hover:scale-110 active:scale-95 group"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIdx(null);
            }}
            aria-label="Close lightbox"
          >
            <span className="text-4xl font-light group-hover:rotate-90 transition-transform duration-300">×</span>
          </button>

          <div
            className="relative max-w-5xl w-full flex flex-col items-center gap-10 animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-auto max-h-[75vh] w-auto rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.15)] border border-white/10 bg-white/5">
              <img
                src={processedItems[selectedIdx].src}
                alt={processedItems[selectedIdx].title}
                className="max-h-[75vh] w-auto h-full object-contain"
              />
            </div>

            <div className="text-center space-y-3">
              <h3 className="text-white text-3xl md:text-5xl font-black font-bitcount tracking-[0.1em]">{processedItems[selectedIdx].title}</h3>
              <p className="text-cyan-400 font-bold tracking-[0.3em] text-[10px] md:text-sm uppercase">{processedItems[selectedIdx].subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
