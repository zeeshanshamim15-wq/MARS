import { useEffect, useState, useRef } from "react";
import { audioSfx } from "@/lib/audioSfx";
import { Terminal as TerminalIcon } from "lucide-react";

interface NodePing {
  id: number;
  x: number;
  y: number;
  label: string;
}

const METROPOLIS_NODES = [
  { label: "KOLKATA", x: 75, y: 55 },
  { label: "MUMBAI", x: 25, y: 65 },
  { label: "DELHI", x: 42, y: 30 },
  { label: "BENGALURU", x: 35, y: 80 },
  { label: "CHENNAI", x: 48, y: 85 },
  { label: "HYDERABAD", x: 38, y: 70 },
  { label: "PUNE", x: 24, y: 68 },
  { label: "AHMEDABAD", x: 20, y: 48 }
];

const FEED_MESSAGES = [
  "NODE_PING: {CITY} // AGENT_ACTIVE",
  "ROUTING_LEAD: {CITY} // SUCCESS",
  "DB_SYNC: {CITY} // ROW_LEVEL_SECURE",
  "WEBHOOK_INBOUND: {CITY} // AUTHENTICATED",
  "CONSENT_SWEEP: {CITY} // AUDIT_PASS",
  "TELEMETRY_LATENCY: {CITY} // 12ms RESPONSE"
];

export default function TelemetryRadar() {
  const [pings, setPings] = useState<NodePing[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial log
    setLogs([
      `[${new Date().toLocaleTimeString()}] NETWORK_GATEWAY: ONLINE`,
      `[${new Date().toLocaleTimeString()}] CRYPTO_TUNNEL: ACTIVE // Port 8082`
    ]);

    const triggerRandomPing = () => {
      // Pick a random node
      const node = METROPOLIS_NODES[Math.floor(Math.random() * METROPOLIS_NODES.length)];
      // Pick a random template
      const template = FEED_MESSAGES[Math.floor(Math.random() * FEED_MESSAGES.length)];
      const message = template.replace("{CITY}", node.label);

      // Create new ping
      const pingId = Date.now() + Math.random();
      setPings((prev) => [...prev, { id: pingId, x: node.x, y: node.y, label: node.label }]);

      // Add to logs
      setLogs((prev) => {
        const next = [...prev, `[${new Date().toLocaleTimeString()}] ${message}`];
        // Limit to last 20 logs
        if (next.length > 20) next.shift();
        return next;
      });

      // Optional sound chirp (low volume beep)
      audioSfx.playHover();

      // Clean up ping after 1.5 seconds
      setTimeout(() => {
        setPings((prev) => prev.filter((p) => p.id !== pingId));
      }, 1500);
    };

    // Trigger periodically
    const interval = setInterval(triggerRandomPing, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border border-white/5 bg-black/60 p-5 md:p-6 relative">
        {/* Radar Map Column */}
        <div className="md:col-span-7 relative h-72 border border-white/10 bg-black/80 overflow-hidden flex flex-col justify-between p-4">
          {/* HUD Top Bar details */}
          <div className="flex justify-between items-center text-[8px] text-white/40 tracking-wider">
            <span>GRID_RESOLUTION: 240x180_NODES</span>
            <span className="text-emerald-400 animate-pulse">ACTIVE_INFRASTRUCTURE_BLIPS</span>
          </div>

          {/* Dotted Grid Background */}
          <div 
            className="absolute inset-0 z-0 opacity-15"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.45) 1px, transparent 1px)",
              backgroundSize: "16px 16px"
            }}
          />

          {/* Map Vector Rings (Simulation) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <circle cx="50%" cy="50%" r="60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="50%" cy="50%" r="120" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

            {/* Glowing active radar sweep line */}
            <circle cx="50%" cy="50%" r="90" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
          </svg>

          {/* Dynamic Radar Pings */}
          {pings.map((ping) => (
            <div
              key={ping.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: `${ping.x}%`, top: `${ping.y}%` }}
            >
              {/* Outer pulsing ring */}
              <div className="absolute h-10 w-10 border border-emerald-500/80 rounded-full animate-ping opacity-60" />
              {/* Inner dot */}
              <div className="h-2 w-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
              {/* Text label next to blip */}
              <span className="absolute left-4 text-[7px] text-white bg-black/80 border border-white/10 px-1 py-0.5 whitespace-nowrap tracking-widest leading-none">
                {ping.label}
              </span>
            </div>
          ))}

          {/* Static simulated dot markers for nodes */}
          {METROPOLIS_NODES.map((node, idx) => (
            <div
              key={idx}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-30"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="h-1.5 w-1.5 bg-white/40 rounded-full" />
            </div>
          ))}

          {/* HUD bottom details */}
          <div className="flex justify-between items-end text-[7px] text-white/30 z-20">
            <span>SECURE GATEWAY: MUMBAI_TUNNEL_04</span>
            <span>PING: OK</span>
          </div>
        </div>

        {/* Console Text Feed Column */}
        <div className="md:col-span-5 flex flex-col h-72 border border-white/10 bg-black/90 p-4 font-mono select-none">
          <div className="flex items-center gap-1.5 text-[9px] text-white/50 tracking-wider border-b border-white/10 pb-2 mb-2">
            <TerminalIcon className="h-3 w-3 text-white/30" />
            <span>LIVE_TELEMETRY_LOGS</span>
          </div>

          <div
            ref={logContainerRef}
            className="flex-1 overflow-y-auto text-[9px] space-y-1.5 text-white/60 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
          >
            {logs.map((log, idx) => (
              <div key={idx} className="leading-normal break-all">
                {log.includes("SUCCESS") || log.includes("OK") || log.includes("PASS") ? (
                  <span className="text-emerald-400">{log}</span>
                ) : (
                  <span>{log}</span>
                )}
              </div>
            ))}
          </div>

          <div className="text-[7px] text-white/20 mt-2 border-t border-white/10 pt-2 flex justify-between">
            <span>AUDIT STATE: COMPLIANT DPDP-26</span>
            <span>SHIELD: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
