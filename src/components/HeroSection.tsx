import { useState } from "react";

export default function HeroSection({ ready, theme }: { ready: boolean, theme: 'light' | 'dark' }) {
  // Pick a random image on initial render
  const [randomImage] = useState(() => {
    const images = [
      "galleryimg1.JPG",
      "galleryimg2.JPG",
      "galleryimg3.JPG",
      "galleryimg4.JPG",
      "galleryimg5.JPG",
      "galleryimg6.JPG",
      "galleryimg7.JPG",
      "galleyimg8.JPG", // Typo in filename retained exactly
    ];
    return images[Math.floor(Math.random() * images.length)];
  });

  return (
    <section 
      id="top" 
      className={`relative min-h-[90vh] flex flex-col justify-center px-4 pb-12 transition-all duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto w-full pt-10">
        {/* Left Column: Text Content */}
        <div className="space-y-6">
          <h1 className={`text-6xl md:text-7xl font-bitcount font-black tracking-tight leading-[1.1] ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            WHERE CAMPUS <br />
            MEETS THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              COSMOS
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-xl leading-relaxed font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            AstroCET is the esteemed astronomy club of the College of Engineering Trivandrum (CET). 
            AstroCET has embarked on a journey of astronomical proportions over the past year.
          </p>


          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a 
              href="#announcements" 
              className={`rounded-full px-8 py-4 text-sm font-bold transition-all hover:scale-105 active:scale-95 ${theme === 'light' ? 'bg-black text-white hover:bg-slate-800' : 'bg-white text-black hover:bg-slate-200'}`}
            >
              UPCOMING NIGHTS →
            </a>
            <a 
              href="#gallery" 
              className={`flex items-center gap-2 text-sm font-bold transition-colors ${theme === 'light' ? 'text-slate-900 hover:text-cyan-600' : 'text-white hover:text-cyan-400'}`}
            >
              CAPTURED STILLS 
              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current">
                <span className="ml-0.5 mt-0.5 border-t-[4px] border-t-transparent border-l-[6px] border-l-current border-b-[4px] border-b-transparent"></span>
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Illustration/Image */}
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={import.meta.env.BASE_URL + "gallery/" + randomImage} 
            alt="Observation Session" 
            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
          />
          <div className={`absolute inset-0 ring-1 ring-inset ${theme === 'light' ? 'ring-black/5' : 'ring-white/10'}`} />
        </div>
      </div>

    </section>
  );
}


