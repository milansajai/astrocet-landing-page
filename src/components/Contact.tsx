import React, { useState } from "react";
import SectionHeader from "./SectionHeader";

export default function Contact({ ready, theme }: { ready: boolean, theme: 'light' | 'dark' }) {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "there");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const subject = encodeURIComponent(`Astrocet inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}${email ? ` <${email}>` : ""}`);

    setStatus("Opening your email client with a drafted message...");
    window.location.href = `mailto:astrocet@cet.ac.in?subject=${subject}&body=${body}`;
    event.currentTarget.reset();
  }

  return (
    <footer 
      id="contact" 
      className={`reveal scroll-mt-32 ${ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: "450ms" }}
    >
      <SectionHeader 
        eyebrow="Contact Us" 
        title="Reach Astrocet for collaborations or sky-night questions." 
        description="Use the form to draft an email, or follow the club on social channels."
        theme={theme}
      />

      <div className="mt-10 max-w-4xl mx-auto space-y-16">
        <form 
          className={`space-y-4 rounded-3xl border p-8 transition-all ${theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/[0.03] border-white/10 backdrop-blur-md' }`}
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className={`text-xs font-semibold uppercase tracking-[0.28em] ml-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-300/70'}`}>Name</span>
              <input 
                name="name" 
                required 
                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${theme === 'light' ? 'bg-white border-slate-200 text-black focus:border-cyan-400 focus:ring-cyan-100' : 'bg-slate-950/45 border-white/10 text-white focus:border-cyan-300/60 focus:ring-cyan-300/20'}`} 
                placeholder="Your name" 
                type="text" 
              />
            </label>
            <label className="space-y-2">
              <span className={`text-xs font-semibold uppercase tracking-[0.28em] ml-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-300/70'}`}>Email</span>
              <input 
                name="email" 
                required 
                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${theme === 'light' ? 'bg-white border-slate-200 text-black focus:border-cyan-400 focus:ring-cyan-100' : 'bg-slate-950/45 border-white/10 text-white focus:border-cyan-300/60 focus:ring-cyan-300/20'}`} 
                placeholder="name@example.com" 
                type="email" 
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className={`text-xs font-semibold uppercase tracking-[0.28em] ml-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-300/70'}`}>Message</span>
            <textarea 
              name="message" 
              required 
              rows={4} 
              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${theme === 'light' ? 'bg-white border-slate-200 text-black focus:border-cyan-400 focus:ring-cyan-100' : 'bg-slate-950/45 border-white/10 text-white focus:border-cyan-300/60 focus:ring-cyan-300/20'}`} 
              placeholder="Tell us about a collaboration, workshop, or observing request." 
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <button 
              type="submit" 
              className={`rounded-full px-10 py-3.5 text-sm font-bold transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${theme === 'light' ? 'bg-black text-white hover:bg-slate-800 focus-visible:ring-slate-400' : 'bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 hover:brightness-110 focus-visible:ring-cyan-300/70'}`}
            >
              Open Email Draft
            </button>
            <div className="text-right">
              <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-1 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>Official Inbox</p>
              <a href="mailto:astrocet@cet.ac.in" className={`text-sm font-bold transition-colors ${theme === 'light' ? 'text-black hover:text-cyan-600' : 'text-white hover:text-cyan-400'}`}>astrocet@cet.ac.in</a>
            </div>
          </div>

          {status ? <p className={`mt-4 text-center text-sm animate-pulse ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-200'}`}>{status}</p> : null}
        </form>

        <div className="flex flex-col items-center gap-8 py-4">
          <div className="flex items-center gap-10">
            <a 
              href="https://www.instagram.com/astro.cet/" 
              target="_blank" 
              rel="noreferrer" 
              className={`group flex items-center gap-3 transition-all hover:scale-110 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}
              title="Instagram"
            >
              <div className={`p-4 rounded-2xl border transition-all ${theme === 'light' ? 'bg-white border-slate-200 group-hover:border-cyan-400 group-hover:text-cyan-600 shadow-sm' : 'bg-white/[0.03] border-white/10 group-hover:border-cyan-300/40 group-hover:text-cyan-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]'}`}>
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </a>
            <a 
              href="https://in.linkedin.com/company/astrocet" 
              target="_blank" 
              rel="noreferrer" 
              className={`group flex items-center gap-3 transition-all hover:scale-110 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}
              title="LinkedIn"
            >
              <div className={`p-4 rounded-2xl border transition-all ${theme === 'light' ? 'bg-white border-slate-200 group-hover:border-cyan-400 group-hover:text-cyan-600 shadow-sm' : 'bg-white/[0.03] border-white/10 group-hover:border-cyan-300/40 group-hover:text-cyan-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]'}`}>
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className={`mt-20 py-8 border-t text-center transition-colors ${theme === 'light' ? 'border-slate-100' : 'border-white/5'}`}>
        <p className={`text-[10px] uppercase tracking-[0.5em] ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
          © {new Date().getFullYear()} ASTROCET — College of Engineering Trivandrum
        </p>
      </div>
    </footer>
  );
}
