import { useEffect, useState } from "react";
import { Cpu, Globe, Video, TrendingUp } from "lucide-react";

export default function HudVisualizer({ activeIndex }: { activeIndex: number }) {
  const [fade, setFade] = useState(false);
  const [localIndex, setLocalIndex] = useState(activeIndex);

  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => {
      setLocalIndex(activeIndex);
      setFade(false);
    }, 200); // Quick crossfade transition
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-full max-w-[240px] md:max-w-[360px] aspect-square flex items-center justify-center z-10 select-none gpu-accelerate">
      <style>{`
        @keyframes spinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinCounterClockwise {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.35; }
          50% { opacity: 0.85; }
          100% { opacity: 0.35; }
        }
        .anim-spin-cw {
          animation: ${isMobile ? "none" : "spinClockwise 25s linear infinite"};
        }
        .anim-spin-ccw {
          animation: ${isMobile ? "none" : "spinCounterClockwise 15s linear infinite"};
        }
        .anim-pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* SVG HUD rings */}
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full text-white/5"
        fill="none"
      >
        <defs>
          <filter id="hudGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="glassGlaze" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Glowing glass glaze backdrop */}
        <circle cx="150" cy="150" r="135" fill="url(#glassGlaze)" className="anim-pulse-glow" />

        {/* Circular text path (rotating) */}
        <g className="origin-[150px_150px] anim-spin-cw">
          <path
            id="hudTextPath"
            d="M 150 150 m -115 0 a 115 115 0 1 1 230 0 a 115 115 0 1 1 -230 0"
            fill="none"
            stroke="none"
          />
          <text fill="rgba(255, 255, 255, 0.45)" className="font-mono text-[7px] tracking-[0.25em]" filter="url(#hudGlow)">
            <textPath href="#hudTextPath">
              MARS ACTIVE SYSTEM NODES // PROTOCOL 0x51F2 // STABLE STATE LINK // CORE DIAGNOSTICS // 
            </textPath>
          </text>
        </g>

        {/* Outer dashed compass ring */}
        <circle
          cx="150"
          cy="150"
          r="135"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />
        <circle
          cx="150"
          cy="150"
          r="125"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.2"
          strokeDasharray="4 8 20 8"
          className="origin-[150px_150px] anim-spin-ccw"
        />

        {/* Diagonal coordinates grid */}
        <line x1="45" y1="45" x2="255" y2="255" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="255" y1="45" x2="45" y2="255" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

        {/* Central visualizer ring */}
        <circle
          cx="150"
          cy="150"
          r="95"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
        />
        <circle
          cx="150"
          cy="150"
          r="80"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1.2"
          strokeDasharray="40 10 5 10"
          className="origin-[150px_150px] anim-spin-cw"
          filter="url(#hudGlow)"
          style={{ stroke: "rgba(255,255,255,0.55)" }}
        />

        {/* Inner static radar scope ticks */}
        <circle
          cx="150"
          cy="150"
          r="55"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Laser target brackets */}
        <path d="M 120 70 L 150 70" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" filter="url(#hudGlow)" />
        <path d="M 180 70 L 150 70" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" filter="url(#hudGlow)" />
        <path d="M 120 230 L 150 230" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" filter="url(#hudGlow)" />
        <path d="M 180 230 L 150 230" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" filter="url(#hudGlow)" />

        {/* Pulsing telemetry target dots (stars inside the scope) */}
        <circle cx="110" cy="120" r="2.5" fill="#FFFFFF" className="anim-pulse-glow" filter="url(#hudGlow)" />
        <circle cx="190" cy="110" r="1.5" fill="#FFFFFF" className="anim-pulse-glow" style={{ animationDelay: '1.5s' }} filter="url(#hudGlow)" />
        <circle cx="130" cy="190" r="2.0" fill="#FFFFFF" className="anim-pulse-glow" style={{ animationDelay: '0.8s' }} filter="url(#hudGlow)" />
        <circle cx="170" cy="175" r="1.8" fill="#FFFFFF" className="anim-pulse-glow" style={{ animationDelay: '2.2s' }} filter="url(#hudGlow)" />

        {/* Radar scope crosshairs */}
        <line x1="150" y1="20" x2="150" y2="40" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" filter="url(#hudGlow)" />
        <line x1="150" y1="260" x2="150" y2="280" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" filter="url(#hudGlow)" />
        <line x1="20" y1="150" x2="40" y2="150" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" filter="url(#hudGlow)" />
        <line x1="260" y1="150" x2="280" y2="150" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" filter="url(#hudGlow)" />
      </svg>

      {/* Floating Center Icon & Telemetry overlay with fade translation */}
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          fade ? "opacity-0 scale-90 blur-sm" : "opacity-100 scale-100 blur-0"
        }`}
      >
        <div className="relative flex flex-col items-center pointer-events-auto">
          <div className="h-16 w-16 rounded-full bg-black/90 border border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.18),0_0_10px_rgba(255,255,255,0.1)] backdrop-blur-md z-10 transition-transform duration-300 hover:scale-105">
            {localIndex === 0 && <Cpu className="h-7 w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] anim-pulse-glow" />}
            {localIndex === 1 && <Globe className="h-7 w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] anim-pulse-glow" />}
            {localIndex === 2 && <Video className="h-7 w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] anim-pulse-glow" />}
            {localIndex === 3 && <TrendingUp className="h-7 w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] anim-pulse-glow" />}
          </div>

          {/* Numerical coordinates below core */}
          <div className="absolute top-[68px] flex flex-col items-center w-max">
            <div className="font-mono text-[9px] text-white/70 tracking-[0.2em] uppercase">
              {localIndex === 0 && "CORE_SYS // ACT_01"}
              {localIndex === 1 && "DEV_OPS  // ACT_02"}
              {localIndex === 2 && "GEN_VFX  // ACT_03"}
              {localIndex === 3 && "STRAT_OPS// ACT_04"}
            </div>
            <div className="font-mono text-[8px] text-white/40 mt-1 select-none">
              {localIndex === 0 && "INGESTION: 100_NOMINAL"}
              {localIndex === 1 && "LHQ_PF: 99_OPTIMIZED"}
              {localIndex === 2 && "GEN_RATE: 60FPS_4K"}
              {localIndex === 3 && "ROI_VERT: 4.2X_CHECK"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
