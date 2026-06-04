import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import { Terminal, Database, Cpu, Radio, Shield, HelpCircle } from "lucide-react";
import { audioSfx } from "@/lib/audioSfx";

type LogEntry = {
  timestamp: string;
  category: "SYSTEM" | "ABDUL" | "ORION" | "SECURITY";
  type: "INFO" | "UPGRADE" | "SUCCESS" | "WARN";
  message: string;
};

const LOGS_DATABASE: LogEntry[] = [
  {
    timestamp: "2026-06-04 15:30:12",
    category: "ABDUL",
    type: "SUCCESS",
    message: "Routed ledger transaction validation sync for client #0x48A (razorpay webhook verified)."
  },
  {
    timestamp: "2026-06-04 12:10:45",
    category: "SECURITY",
    type: "INFO",
    message: "Enforced consent validation verification sweep (India DPDP DP-2023 check). Zero leaks reported."
  },
  {
    timestamp: "2026-06-03 09:15:33",
    category: "ORION",
    type: "UPGRADE",
    message: "Orion OCR pipelines upgraded to support Gemini 1.5 Pro multimodal receipts parsing. Processing duration decreased by 40%."
  },
  {
    timestamp: "2026-06-02 18:24:50",
    category: "SYSTEM",
    type: "INFO",
    message: "Tenant isolation checks executed across Row-Level Security gates. Database isolation verification: PASS."
  },
  {
    timestamp: "2026-06-01 11:05:12",
    category: "ABDUL",
    type: "SUCCESS",
    message: "Integrated Tally Prime API bridges. Direct XML synchronizations configured for Pro tier clients."
  },
  {
    timestamp: "2026-05-30 14:40:22",
    category: "ORION",
    type: "SUCCESS",
    message: "Deployed WhatsApp automation agent 'Abdul' Voice-Note transcriber interface. ElevenLabs speech synthesis active."
  },
  {
    timestamp: "2026-05-28 09:00:00",
    category: "SECURITY",
    type: "WARN",
    message: "Client #0x12B database query threshold limits triggered. Auto-seeded buffer expanded dynamically."
  },
  {
    timestamp: "2026-05-27 16:32:10",
    category: "SYSTEM",
    type: "UPGRADE",
    message: "Global routing configuration optimized. Swapped Lenis smooth scroll layout triggers back to native CSS ScrollToTop for 2.4x canvas render performance."
  }
];

export default function Logs() {
  const [filter, setFilter] = useState<"ALL" | "SYSTEM" | "ABDUL" | "ORION" | "SECURITY">("ALL");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredLogs = LOGS_DATABASE.filter(
    log => filter === "ALL" || log.category === filter
  );

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-36 md:pt-44 pb-32 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            Platform Telemetry
          </p>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white">
            <WordReveal text="System Log" />{" "}
            <span className="inline-block"><WordReveal text="Kernels" className="font-semibold mars-text-gradient" /></span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            Real-time platform logs, system updates, and automated agent configurations.
          </p>
        </div>

        {/* Console Box */}
        <div className="max-w-5xl mx-auto">
          <BorderLaserCard className="p-5 sm:p-8 bg-black/60 shadow-2xl backdrop-blur-2xl" borderRadius={isMobile ? 0 : 24}>
            
            {/* Filter controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-white/50" />
                <span className="text-xs font-mono tracking-widest text-white/60">FILTER_CONSOLE_SCOPES</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(["ALL", "SYSTEM", "ABDUL", "ORION", "SECURITY"] as const).map(cat => (
                  <button
                    key={cat}
                    onMouseEnter={() => audioSfx.playHover()}
                    onClick={() => {
                      audioSfx.playClick();
                      setFilter(cat);
                    }}
                    className={`h-7 px-3.5 rounded-none font-mono text-[10px] tracking-wider transition ${
                      filter === cat
                        ? "bg-white text-black font-semibold"
                        : "bg-white/5 text-white/60 border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Logs Window */}
            <div className="space-y-4 font-mono text-xs select-none max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, idx) => {
                  let typeColor = "text-blue-400";
                  if (log.type === "SUCCESS") typeColor = "text-emerald-400";
                  if (log.type === "UPGRADE") typeColor = "text-purple-400";
                  if (log.type === "WARN") typeColor = "text-amber-400";

                  let categoryIcon = <Database className="h-3 w-3" />;
                  if (log.category === "ABDUL") categoryIcon = <Cpu className="h-3 w-3" />;
                  if (log.category === "ORION") categoryIcon = <Radio className="h-3 w-3" />;
                  if (log.category === "SECURITY") categoryIcon = <Shield className="h-3 w-3" />;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-none md:rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition flex flex-col md:flex-row gap-3 items-start md:items-center"
                    >
                      <div className="text-[10px] text-white/35 shrink-0 select-none">
                        [{log.timestamp}]
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-2 py-0.5 rounded-none md:rounded-md text-[9px] uppercase tracking-wider text-white/60 shrink-0">
                        {categoryIcon}
                        <span>{log.category}</span>
                      </div>
                      <div className={`text-[9px] font-semibold uppercase tracking-widest ${typeColor} shrink-0`}>
                        {log.type}
                      </div>
                      <div className="text-white/70 leading-relaxed font-sans text-xs">
                        {log.message}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-white/30 text-xs">
                  No system logs found under this filter scope.
                </div>
              )}
            </div>

            <div className="border-t border-white/5 pt-6 mt-6 flex justify-between items-center text-[10px] font-mono text-white/40">
              <div>HOSTED NODE: KOLKATA_MAIN_01</div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>INTEGRATION SECURE HANDSHAKES: OK</span>
              </div>
            </div>
          </BorderLaserCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
