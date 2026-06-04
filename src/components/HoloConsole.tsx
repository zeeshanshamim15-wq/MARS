import { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, X, TerminalSquare } from "lucide-react";
import { audioSfx } from "@/lib/audioSfx";

interface LogLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "header";
}

export default function HoloConsole({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [history, setHistory] = useState<LogLine[]>([
    { text: "=== MARS SECURE TERMINAL v2.0 ===", type: "header" },
    { text: "INITIALIZING PORTAL CONSOLE LINK...", type: "output" },
    { text: "ESTABLISHED SHA-4096 SOCKET TUNNEL CLIENT.", type: "success" },
    { text: "TYPE 'help' TO QUERY AVAILABLE SYSTEM NODES.", type: "output" },
    { text: "", type: "output" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        audioSfx.playBeep();
      }, 50);
    }
  }, [isOpen]);

  // Scroll to bottom when logs update
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [history]);

  // Global key listener for escape/exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
        audioSfx.playClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Play click sound on submit
    audioSfx.playClick();

    const newLines: LogLine[] = [
      { text: `guest@mars:~$ ${cmdStr}`, type: "input" }
    ];

    switch (trimmed) {
      case "help":
        newLines.push(
          { text: "Available Telemetry Operations:", type: "header" },
          { text: "  help      - Display terminal diagnostics guidelines.", type: "output" },
          { text: "  telemetry - Print active CPU, memory, and database coordinates.", type: "output" },
          { text: "  services  - Summarize the active automation core systems.", type: "output" },
          { text: "  logs      - Pull live system kernel logs.", type: "output" },
          { text: "  clear     - Cleanse input buffers.", type: "output" },
          { text: "  exit      - Close communication channel.", type: "output" }
        );
        break;
      case "telemetry":
        newLines.push(
          { text: "--- DIAGNOSTIC SYSTEM TELEMETRY ---", type: "header" },
          { text: "HOST_NODE: KOLKATA_MAIN_SERVER_01", type: "output" },
          { text: "GATEWAY_LATENCY: 12ms (OPTIMAL)", type: "output" },
          { text: "ACTIVE_THREADS: 48 (MARS_AGENTS)", type: "output" },
          { text: "DB_CONNECTIONS: Row-Level Isolated RLS Gates", type: "output" },
          { text: "SYSTEM_LOAD: 2.4% CPU // 182MB RAM", type: "output" },
          { text: "COMPLIANCE: India DPDP Audit Status: OK (100% compliant)", type: "success" }
        );
        break;
      case "services":
        newLines.push(
          { text: "--- MARS ACTIVE CORES ---", type: "header" },
          { text: "01. AUTOMATION (IA)    - n8n pipelines, WhatsApp Abdul ledger, Voice Agents.", type: "output" },
          { text: "02. WEB DEV & SEO      - Ultra-fast static/headless setups (Lighthouse 99+).", type: "output" },
          { text: "03. AI FILM & VFX      - Cinematic marketing and casting video pipelines.", type: "output" },
          { text: "04. CONSULTANCY        - Shared ownership embedded operational roadmaps.", type: "output" },
          { text: "05. STRATEGIC SEEDING  - Funding and services support (Roadmap).", type: "output" }
        );
        break;
      case "logs":
        newLines.push(
          { text: "--- PLATFORM EVENT LOGGER ---", type: "header" },
          { text: `[${new Date().toLocaleTimeString()}] ABDUL: Syncing webhook for client #0x48A... Verified.`, type: "success" },
          { text: `[${new Date().toLocaleTimeString()}] ORION: Writing correspondence letter draftINV-0007... Completed.`, type: "output" },
          { text: `[${new Date().toLocaleTimeString()}] SECURITY: consent verification database sweeps... 0 leaks.`, type: "success" },
          { text: `[${new Date().toLocaleTimeString()}] SYSTEM: Dynamic WebGL pixel ratio capped at 1.5. 60fps stable.`, type: "output" }
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "exit":
      case "close":
        onClose();
        return;
      default:
        newLines.push({
          text: `Command not found: '${cmdStr}'. Type 'help' to query available guidelines.`,
          type: "error"
        });
    }

    setHistory((prev) => [...prev, ...newLines, { text: "", type: "output" }]);
    setInputVal("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    audioSfx.playHover(); // Soft click sound while typing
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4 sm:p-8 animate-fade-in select-none">
      {/* Laser line overlay to make it look like a holographic CRT scan */}
      <div 
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 4px)"
        }}
      />
      
      <div className="relative w-full max-w-4xl h-[80vh] bg-black/90 border border-white/10 rounded-none shadow-[0_0_40px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.01] px-5 py-3">
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-4.5 w-4.5 text-white/70 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-white/55 uppercase">
              MARS_HOLOGRAPHIC_SHELL // CONSOLE_LINK
            </span>
          </div>
          <button
            onClick={() => {
              audioSfx.playClick();
              onClose();
            }}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Close terminal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Viewport content */}
        <div
          ref={viewportRef}
          className="flex-1 overflow-y-auto p-6 font-mono text-xs text-white/80 space-y-2 selection:bg-white/15 scrollbar-thin"
        >
          {history.map((line, idx) => {
            let colorClass = "text-white/60";
            if (line.type === "input") colorClass = "text-white font-semibold";
            if (line.type === "success") colorClass = "text-emerald-400 font-mono";
            if (line.type === "error") colorClass = "text-red-400 font-semibold";
            if (line.type === "header") colorClass = "text-white font-bold border-b border-white/5 pb-1 block mt-2 text-sm";

            return (
              <div key={idx} className={`${colorClass} leading-relaxed whitespace-pre-wrap break-words`}>
                {line.text}
              </div>
            );
          })}
        </div>

        {/* Prompt Input Line */}
        <div className="border-t border-white/10 bg-black/60 px-6 py-4 flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-400 shrink-0 select-none">guest@mars:~$</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex-1"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              placeholder="Enter active command guidelines..."
              className="w-full bg-transparent outline-none font-mono text-xs text-white placeholder-white/20 select-text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
