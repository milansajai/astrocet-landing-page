import SectionHeader from "./SectionHeader";
import { announcements } from "../utils/data";

export default function Announcements({ ready, theme }: { ready: boolean, theme: 'light' | 'dark' }) {
  return (
    <section 
      id="announcements" 
      className={`reveal scroll-mt-32 ${ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: "80ms" }}
    >
      <SectionHeader 
        eyebrow="Announcements" 
        title="Fresh observing sessions, workshops, and sky nights." 
        description="A clean read on what the club is doing next, from rooftop sessions to practical imaging workshops."
        theme={theme}
      />

      <div className={`mt-8 divide-y overflow-hidden rounded-3xl border transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-200 divide-slate-200 shadow-sm' : 'bg-white/[0.03] border-white/10 divide-white/10 backdrop-blur-sm'}`}>
        {announcements.map((item, index) => (
          <article 
            key={item.title} 
            className={`grid gap-4 px-5 py-6 sm:px-6 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center transition-colors hover:bg-black/5 dark:hover:bg-white/5`}
            style={{ transitionDelay: `${120 + index * 80}ms` }}
          >
            <time className={`text-xs font-semibold uppercase tracking-[0.3em] ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-200/70'}`}>{item.date}</time>
            <div className="space-y-1">
              <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>{item.title}</h3>
              <p className={`text-sm leading-6 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300/80'}`}>{item.detail}</p>
            </div>
            <div className={`text-xs font-semibold uppercase tracking-[0.26em] md:text-right ${theme === 'light' ? 'text-violet-600' : 'text-violet-200/80'}`}>{item.tag}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
