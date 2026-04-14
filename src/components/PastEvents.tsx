import { useState } from "react";
import { useInView } from "react-intersection-observer";
import SectionHeader from "./SectionHeader";
import { pastEvents } from "../utils/data";

export default function PastEvents({ ready, theme }: { ready: boolean, theme: 'light' | 'dark' }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section 
      id="events" 
      className={`reveal scroll-mt-32 ${ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: "170ms" }}
    >
      <SectionHeader 
        eyebrow="Past Events" 
        title="A chronological trail of our cosmic journey." 
        description="Click any event card to explore the full story, posters, and highlights from our previous sessions."
        theme={theme}
      />

      <div className="mt-16 space-y-24">
        {pastEvents.map((item, index) => (
          <EventCard 
            key={item.title}
            item={item}
            index={index}
            isExpanded={expandedIdx === index}
            onToggle={() => toggleExpand(index)}
            theme={theme}
          />
        ))}
      </div>
    </section>
  );
}

function EventCard({ item, index, isExpanded, onToggle, theme }: any) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-12 group transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Image Side */}
      <div 
        className={`w-full md:w-1/2 flex justify-center ${isEven ? 'md:order-1' : 'md:order-2'} ${inView ? 'reveal-left visible' : 'reveal-left'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div 
          className={`relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 shadow-2xl hover:scale-[1.02] hover:shadow-cyan-500/10 ${isExpanded ? 'ring-4 ring-cyan-500/40' : 'ring-1 ring-white/10'}`}
          onClick={onToggle}
        >
          <img 
            src={item.image} 
            alt={item.title} 
            className="aspect-[4/5] md:aspect-[3/4] w-full max-w-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white text-xs font-bold tracking-widest uppercase">Click to expand story</span>
          </div>
        </div>
      </div>

      {/* Text Side */}
      <div 
        className={`w-full md:w-1/2 text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'} ${inView ? 'reveal-right visible' : 'reveal-right'}`}
        style={{ transitionDelay: `${(index * 100) + 200}ms` }}
      >
        <time className={`text-xs font-semibold uppercase tracking-[0.4em] ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-300'}`}>
          {item.date}
        </time>
        <h3 className={`mt-4 text-3xl md:text-4xl font-black font-bitcount tracking-tight ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          {item.title}
        </h3>
        
        {/* Accordion Detail */}
        <div 
          className={`mt-6 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
        >
          <p className={`text-base md:text-lg leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            {item.detail}
          </p>
          <div className="mt-8 pt-4 border-t border-white/10">
            <button 
              onClick={onToggle}
              className="text-xs font-bold text-cyan-500 hover:text-cyan-400 tracking-widest uppercase transition-colors"
            >
              Close story ↑
            </button>
          </div>
        </div>

        {!isExpanded && (
          <button 
            onClick={onToggle}
            className={`mt-8 px-6 py-2.5 rounded-full border text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:scale-105 active:scale-95 ${theme === 'light' ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}
          >
            Read More
          </button>
        )}
      </div>
    </div>
  );
}
