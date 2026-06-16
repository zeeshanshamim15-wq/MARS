import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Zap, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Activity 
} from "lucide-react";
import { cn } from "@/lib/utils";
import WordReveal from "./ui/WordReveal";
import MetallicText from "./ui/MetallicText";

gsap.registerPlugin(ScrollTrigger);

// Helper for typewriter or log ticker effect
function LogTicker() {
  const [logs, setLogs] = useState<string[]>([
    "SYS: Initializing MARS OS v3.0...",
    "DB: Handshake active via SSL/TLS...",
    "NET: Network latency optimized to 4.8ms"
  ]);

  useEffect(() => {
    const pool = [
      "DB: Secure Khata instance resolved.",
      "AI_DIALER: Call connection thread #12 active.",
      "API: Fetching supersonic outbound ping.",
      "SYS: Embedded database operational check... PASSED",
      "FLOW: n8n workflow webhook executed successfully.",
      "SEO: Perfect Google Lighthouse score verified.",
      "GPU: Core temperature stable at 52°C.",
      "VFX: Real-time rendering pipeline cached."
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const randomLog = pool[Math.floor(Math.random() * pool.length)];
        return [...prev, `[${time}] ${randomLog}`].slice(-4);
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[8px] text-emerald-400/70 bg-black/60 p-2.5 border border-white/5 rounded-lg h-20 overflow-y-auto flex flex-col gap-1 w-full select-none">
      {logs.map((log, i) => (
        <div key={i} className="truncate tracking-tight leading-normal">
          <span className="text-emerald-500/40 mr-1">&gt;</span>
          {log}
        </div>
      ))}
    </div>
  );
}

export default function Hero3DZoom() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  const w1Ref = useRef<HTMLDivElement>(null);
  const w2Ref = useRef<HTMLDivElement>(null);
  const w3Ref = useRef<HTMLDivElement>(null);
  const w4Ref = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const dashboard = dashboardRef.current;
    const w1 = w1Ref.current;
    const w2 = w2Ref.current;
    const w3 = w3Ref.current;
    const w4 = w4Ref.current;

    if (!section || !dashboard || !w1 || !w2 || !w3 || !w4) return;

    // Reset initial styles for desktop GSAP animation
    gsap.set(dashboard, {
      rotateX: 15,
      scale: 0.85,
      z: -120,
      opacity: 0.5,
      transformPerspective: 1200,
      transformOrigin: "center center",
    });

    // Widgets start closer to the center, hidden/subtle
    gsap.set([w1, w2, w3, w4], {
      opacity: 0,
      scale: 0.8,
    });
    
    // Position individual initial locations for parallax drift
    gsap.set(w1, { xPercent: -15, yPercent: -10, z: -50 });
    gsap.set(w2, { xPercent: 15, yPercent: -15, z: -50 });
    gsap.set(w3, { xPercent: -20, yPercent: 10, z: -50 });
    gsap.set(w4, { xPercent: 20, yPercent: 15, z: -50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Core Animation Timeline
    tl.to(dashboard, {
      rotateX: 0,
      scale: 1,
      z: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      force3D: true,
    }, 0);

    // Widget 1: Inbound call bubble - Drifts up & left
    tl.to(w1, {
      opacity: 1,
      scale: 1,
      xPercent: -45,
      yPercent: -28,
      z: 80,
      duration: 0.85,
      ease: "power1.out",
      force3D: true,
    }, 0.1);

    // Widget 2: n8n automation connector - Drifts up & right
    tl.to(w2, {
      opacity: 1,
      scale: 1,
      xPercent: 45,
      yPercent: -35,
      z: 100,
      duration: 0.85,
      ease: "power1.out",
      force3D: true,
    }, 0.05);

    // Widget 3: Lighthouse dial - Drifts down & left
    tl.to(w3, {
      opacity: 1,
      scale: 1,
      xPercent: -55,
      yPercent: 30,
      z: 60,
      duration: 0.85,
      ease: "power1.out",
      force3D: true,
    }, 0.15);

    // Widget 4: Terminal console - Drifts down & right
    tl.to(w4, {
      opacity: 1,
      scale: 1,
      xPercent: 55,
      yPercent: 25,
      z: 90,
      duration: 0.85,
      ease: "power1.out",
      force3D: true,
    }, 0.08);

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === section)
        .forEach((st) => st.kill());
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="core-zoom-portal"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent z-20 py-20 px-4"
    >
      {/* Background blueprint grid styling specifically matching website details */}
      <div className="absolute inset-0 bg-transparent opacity-[0.03] pointer-events-none border-b border-white/5" 
           style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      
      {/* Container holding title and 3D portal */}
      <div className="relative mx-auto w-full max-w-7xl flex flex-col items-center gap-10 md:gap-14 z-10 text-center">
        
        {/* Visual Title Header */}
        <div className="max-w-2xl px-4 flex flex-col items-center">
          <p className="text-[9px] font-mono uppercase tracking-[0.45em] text-white/35 mb-2.5">
            01 // INTEGRATION_MATRIX
          </p>
          <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl leading-tight">
            <WordReveal text="Unified" /> <MetallicText text="Infrastructure" className="text-3xl md:text-5xl mt-1.5 inline-block" />
          </h2>
          <p className="text-xs text-white/40 max-w-sm mt-3 leading-relaxed font-light">
            {isMobile 
              ? "Sleek, secure, autonomous integrations driving enterprise performance."
              : "Scroll to zoom into the MARS custom control interface."}
          </p>
        </div>

        {/* 3D Perspective Animation Container */}
        <div 
          ref={containerRef}
          className={cn(
            "relative w-full flex items-center justify-center min-h-[420px] sm:min-h-[500px] md:min-h-[550px]",
            !isMobile && "perspective-[1500px] preserve-3d"
          )}
        >
          
          {/* CENTERPIECE: MARS OS Mockup Dashboard Card */}
          <div
            ref={dashboardRef}
            className={cn(
              "w-full max-w-[90%] sm:max-w-[70%] md:max-w-[660px] aspect-[16/10] bg-black/60 border border-white/10 backdrop-blur-xl rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative z-10",
              !isMobile && "will-change-transform preserve-3d"
            )}
          >
            {/* Header bar */}
            <div className="h-8 bg-white/[0.03] border-b border-white/5 px-4 flex items-center justify-between text-[8px] md:text-[9px] font-mono text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/10 border border-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/10 border border-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/10 border border-white/15" />
                <span className="ml-2 font-semibold text-white/60 tracking-wider">MARS_OS_v3.0.0</span>
              </div>
              <div className="hidden sm:block tracking-[0.2em]">CORE // DIAGNOSTICS</div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-wide">SYS: SECURE</span>
              </div>
            </div>

            {/* Main Window Workspace */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar Left */}
              <div className="w-10 md:w-12 bg-white/[0.01] border-r border-white/5 py-4 flex flex-col items-center gap-4 text-white/30">
                <Cpu className="h-4 w-4 text-emerald-400/80" />
                <Terminal className="h-4 w-4" />
                <Globe className="h-4 w-4" />
                <Zap className="h-4 w-4" />
                <div className="h-px w-4 bg-white/5 my-1" />
                <Activity className="h-4 w-4 animate-pulse" />
              </div>

              {/* Central Content Panel */}
              <div className="flex-1 p-4 md:p-5 flex flex-col justify-between gap-4">
                
                {/* SVG Performance Line Graph */}
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 flex flex-col justify-between h-[110px] md:h-[130px] relative">
                  <div className="flex items-center justify-between font-mono text-[8px] text-white/35">
                    <span>TRANSACTION_THROUGHPUT</span>
                    <span className="text-emerald-400">+142% SPEED</span>
                  </div>
                  <div className="flex-1 w-full flex items-end pt-2">
                    <svg viewBox="0 0 500 130" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="glow-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="rgba(16, 185, 129, 0.2)" />
                          <stop offset="100%" stop-color="rgba(16, 185, 129, 0)" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M 0 100 Q 50 110 100 80 T 200 65 T 300 90 T 400 35 T 500 15" 
                        fill="none" 
                        stroke="rgba(16, 185, 129, 0.7)" 
                        strokeWidth="2"
                        className="stroke-emerald-400" 
                      />
                      <path 
                        d="M 0 100 Q 50 110 100 80 T 200 65 T 300 90 T 400 35 T 500 15 L 500 130 L 0 130 Z" 
                        fill="url(#glow-grad)" 
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom stats layout */}
                <div className="grid grid-cols-3 gap-2 text-left font-mono">
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
                    <span className="text-[7px] text-white/30 block tracking-wider">CPU_LOAD</span>
                    <span className="text-[10px] sm:text-xs text-white/70 block mt-0.5">14.8% // LOW</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
                    <span className="text-[7px] text-white/30 block tracking-wider">LEDGER_SYNC</span>
                    <span className="text-[10px] sm:text-xs text-white/70 block mt-0.5">VERIFIED</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
                    <span className="text-[7px] text-white/30 block tracking-wider">EDGE_LATENCY</span>
                    <span className="text-[10px] sm:text-xs text-emerald-400 block mt-0.5">4.2ms // OK</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Right */}
              <div className="hidden sm:flex w-36 bg-white/[0.01] border-l border-white/5 p-4 flex-col gap-3.5 text-left font-mono text-[8px] text-white/35">
                <div>
                  <span className="text-white/20 block">DEPLOY_ZONE</span>
                  <span className="text-white/60 block mt-0.5">ASUS_LOCAL_SERVER</span>
                </div>
                <div>
                  <span className="text-white/20 block">SECURE_TUNNEL</span>
                  <span className="text-white/60 block mt-0.5">SSH_RSA_2048</span>
                </div>
                <div>
                  <span className="text-white/20 block">DB_QUERIES</span>
                  <span className="text-emerald-400/80 block mt-0.5">OPTIMIZED // 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* PARALLAX FLOATING WIDGETS */}

          {/* Widget 1: AI Call Bubble / Dialogue Script */}
          <div
            ref={w1Ref}
            className={cn(
              "absolute bg-black/85 border border-white/10 backdrop-blur-md p-3 md:p-3.5 rounded-xl text-left w-[220px] md:w-[250px] shadow-lg select-none",
              isMobile ? "relative inset-auto mt-4" : "z-20 pointer-events-none will-change-transform"
            )}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 font-mono text-[7px] md:text-[8px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE_CALL // VOICE_AI
              </span>
              <span className="text-white/30">00:45_SEC</span>
            </div>
            <p className="text-[8px] md:text-[9px] text-white/80 font-mono leading-relaxed pl-1 border-l border-emerald-400/30">
              "AI Outbound: 'Call answered. Webhook payload matched. Verification code accepted. Booking client audit session...'"
            </p>
            {/* Equilizer graphic */}
            <div className="flex gap-0.5 h-3.5 items-end justify-end mt-2 px-1">
              <span className="w-0.5 bg-emerald-400/70 h-2 animate-pulse" />
              <span className="w-0.5 bg-emerald-400/90 h-3 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 bg-emerald-400/50 h-1.5 animate-pulse" style={{ animationDelay: '0.4s' }} />
              <span className="w-0.5 bg-emerald-400/80 h-3 animate-pulse" style={{ animationDelay: '0.1s' }} />
              <span className="w-0.5 bg-emerald-400/40 h-1 animate-pulse" />
            </div>
          </div>

          {/* Widget 2: n8n workflow node connection */}
          <div
            ref={w2Ref}
            className={cn(
              "absolute bg-black/85 border border-white/10 backdrop-blur-md p-3.5 rounded-xl text-left w-[200px] md:w-[220px] shadow-lg font-mono text-[8px] md:text-[9px] select-none",
              isMobile ? "relative inset-auto mt-4" : "z-20 pointer-events-none will-change-transform"
            )}
          >
            <div className="text-[7px] text-white/30 tracking-wider mb-2">INTELLIGENT_AUTOMATION_NODE</div>
            <div className="flex items-center justify-between relative bg-white/[0.02] border border-white/5 p-2 rounded-lg">
              <span className="text-white/60 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[8px]">Webhook</span>
              <div className="h-[1px] flex-1 bg-emerald-400/50 mx-2.5 relative">
                <span className="absolute top-1/2 left-0 h-1.5 w-1.5 bg-emerald-400 rounded-full -translate-y-1/2 animate-ping" />
              </div>
              <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px]">n8n_Agent</span>
            </div>
            <div className="flex justify-between items-center mt-2.5 px-0.5 text-[7px] text-white/30">
              <span>STATUS: STABLE_SYNC</span>
              <span>NODE_04</span>
            </div>
          </div>

          {/* Widget 3: Lighthouse Speedometer dial */}
          <div
            ref={w3Ref}
            className={cn(
              "absolute bg-black/85 border border-white/10 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center gap-3.5 w-[160px] md:w-[185px] select-none",
              isMobile ? "relative inset-auto mt-4" : "z-20 pointer-events-none will-change-transform"
            )}
          >
            {/* SVG circle gauge */}
            <div className="relative h-10 w-10 shrink-0">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="text-white/5"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeWidth="3"
                  strokeDasharray="99, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] md:text-[11px] font-bold text-white">
                99
              </div>
            </div>
            <div className="text-left font-mono">
              <span className="text-[7px] text-white/30 block uppercase tracking-wider">SEO_PERFORMANCE</span>
              <span className="text-[10px] text-white/80 block font-semibold">Lighthouse // OK</span>
            </div>
          </div>

          {/* Widget 4: Active Log Stream console */}
          <div
            ref={w4Ref}
            className={cn(
              "absolute bg-black/85 border border-white/10 backdrop-blur-md p-3.5 rounded-xl text-left w-[230px] md:w-[260px] shadow-lg flex flex-col gap-2",
              isMobile ? "relative inset-auto mt-4" : "z-20 pointer-events-none will-change-transform"
            )}
          >
            <div className="flex justify-between items-center font-mono text-[7px] text-white/30 border-b border-white/5 pb-1">
              <span>LIVE_INTEGRATION_LOGS</span>
              <span className="text-emerald-400">STREAMING</span>
            </div>
            <LogTicker />
          </div>

        </div>
      </div>
    </section>
  );
}
