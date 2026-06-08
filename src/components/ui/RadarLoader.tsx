import { useEffect, useState } from "react";

export default function RadarLoader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[hsl(210_24%_5%)] text-foreground">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 filter blur-[60px]" />

      {/* Sci-Fi Radar Grid */}
      <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/5 bg-black/40 backdrop-blur-md">
        {/* Outer scanning ring */}
        <div className="absolute inset-0 rounded-full border border-emerald-500/15 animate-ping" style={{ animationDuration: "2.5s" }} />

        {/* Dynamic sweeping arm */}
        <div 
          className="absolute inset-1 rounded-full border border-transparent border-t-emerald-500/30 border-r-emerald-500/10 animate-spin" 
          style={{ animationDuration: "1.8s", animationTimingFunction: "linear" }}
        />

        {/* Inner static radar circles */}
        <div className="absolute h-24 w-24 rounded-full border border-white/5 flex items-center justify-center">
          <div className="absolute h-12 w-12 rounded-full border border-emerald-500/10" />
        </div>

        {/* Center blinking active node */}
        <div className="relative h-2 w-2 rounded-full bg-emerald-400">
          <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      {/* Loading telemetry text */}
      <div className="mt-8 flex flex-col items-center gap-1.5 font-mono select-none text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-1">
          <span>INGESTING_PORTAL_DATA{dots}</span>
        </div>
        <div className="text-[7.5px] uppercase tracking-widest text-white/30">
          SECURE_NODE_TUNNEL_LINK // ESTABLISHED
        </div>
      </div>
    </div>
  );
}
