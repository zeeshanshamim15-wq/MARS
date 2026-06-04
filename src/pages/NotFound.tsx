import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShieldAlert, Terminal, RefreshCw } from "lucide-react";
import { audioSfx } from "@/lib/audioSfx";

export default function NotFound() {
  const location = useLocation();
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Play error beep diagnostic chime
    audioSfx.playBeep();

    // Small blinking loading dots simulation
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[hsl(210_24%_3%)] text-red-500 font-mono flex items-center justify-center p-4 overflow-hidden select-none crt-scanline hologram-grid">
      {/* Red ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-2xl border border-red-500/20 bg-black/90 p-6 md:p-8 shadow-[0_0_50px_rgba(239,68,68,0.08)]">
        {/* Bracket corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/60" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/60" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/60" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/60" />

        {/* Console Header */}
        <div className="flex items-center justify-between border-b border-red-500/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-red-500/80">
              SYS_SECURITY_ALERT // CRITICAL_ROUTE_FAIL
            </span>
          </div>
          <span className="text-[9px] text-red-500/40">CODE: 0x404</span>
        </div>

        {/* Output Diagnostics log */}
        <div className="space-y-4 text-xs md:text-sm text-red-500/80 leading-relaxed mb-8">
          <div className="font-bold text-red-500 border border-red-500/30 bg-red-500/5 p-3 text-center mb-6">
            [ ERROR 404: SECTOR CORRUPTED. SIGNAL LOST. ]
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-red-500/40 shrink-0">1.</span>
              <span>GATEWAY_STATUS: ROUTE_UNRESOLVED</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500/40 shrink-0">2.</span>
              <span>TARGET_SECTOR: {location.pathname}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500/40 shrink-0">3.</span>
              <span>ESTABLISHING_LINK: FAILED // TIMEOUT</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500/40 shrink-0">4.</span>
              <span>DIAGNOSTIC: Coordinate vector does not exist in active ledger matrices.</span>
            </div>
          </div>
        </div>

        {/* Action Prompt */}
        <div className="border-t border-red-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] text-red-500/55 tracking-wider uppercase flex items-center gap-1.5">
            <RefreshCw className="h-3 w-3 animate-spin text-red-500/40" />
            <span>RE-CONFIGURING ROUTER GATEWAYS{dots}</span>
          </div>

          <Link
            to="/"
            onMouseEnter={() => audioSfx.playHover()}
            onClick={() => audioSfx.playSuccess()}
            className="w-full sm:w-auto text-center px-6 py-2.5 bg-red-950/20 border border-red-500 text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-widest text-[10px] font-bold font-mono rounded-none"
          >
            [ RETURN TO CORE ]
          </Link>
        </div>
      </div>
    </div>
  );
}
