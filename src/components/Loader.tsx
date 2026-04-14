
export default function Loader({ ready }: { ready: boolean }) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#02030a] transition-opacity duration-[800ms] ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}>
      <div className={`relative text-center transition-all duration-[2800ms] cubic-bezier(0.2, 0.8, 0.2, 1) ${ready ? "scale-[2.5] opacity-0 blur-2xl" : "scale-[0.5] opacity-100"}`}>
        <div className="absolute inset-[-5rem] rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />
        <div className="font-bitcount loader-word text-[clamp(2rem,8vw,5rem)] leading-none tracking-[0.4em] text-white/95 transition-all">
          ASTROCET
        </div>
      </div>
    </div>
  );
}
