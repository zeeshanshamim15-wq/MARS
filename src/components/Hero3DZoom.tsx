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

gsap.registerPlugin(ScrollTrigger);

// Helper for typewriter or log ticker effect
function LogTicker() {
  const [logs, setLogs] = useState<string[]>([
    "SYS: Syncing leads with CRM...",
    "AI_AGENTS: Handshake active via SSL/TLS...",
    "NET: Network latency optimized to 4.8ms"
  ]);

  useEffect(() => {
    const pool = [
      "CRM: Auto-synced 5 new leads.",
      "AI_DIALER: outbound call connection thread active.",
      "SYS: Scheduled discovery call booked for client.",
      "SYS: Operational check on all 3 active agents... PASSED",
      "FLOW: n8n workflow webhook executed successfully.",
      "SEO: Google Lighthouse speed score verified at 99/100.",
      "AUTO_SYNC: Ramesh ledger entry reconciled.",
      "EMAIL: Auto-followup sent to prospective lead."
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
  
  // Text Overlay Refs
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const t3Ref = useRef<HTMLDivElement>(null);

  // Widget Refs
  const w1Ref = useRef<HTMLDivElement>(null);
  const w2Ref = useRef<HTMLDivElement>(null);
  const w3Ref = useRef<HTMLDivElement>(null);
  const w4Ref = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const dashboard = dashboardRef.current;
      const w1 = w1Ref.current;
      const w2 = w2Ref.current;
      const w3 = w3Ref.current;
      const w4 = w4Ref.current;
      const t1 = t1Ref.current;
      const t2 = t2Ref.current;
      const t3 = t3Ref.current;
      
      const elements = [dashboard, w1, w2, w3, w4, t1, t2, t3].filter(Boolean);
      if (elements.length > 0) {
        gsap.set(elements, { clearProps: "all" });
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const dashboard = dashboardRef.current;
    
    const t1 = t1Ref.current;
    const t2 = t2Ref.current;
    const t3 = t3Ref.current;

    const w1 = w1Ref.current;
    const w2 = w2Ref.current;
    const w3 = w3Ref.current;
    const w4 = w4Ref.current;

    if (!section || !dashboard || !t1 || !t2 || !t3 || !w1 || !w2 || !w3 || !w4) return;

    // Reset initial dashboard styles (tilted, dim)
    gsap.set(dashboard, {
      rotateX: 15,
      scale: 0.82,
      z: -120,
      opacity: 0.15,
      transformPerspective: 1200,
      transformOrigin: "center center",
    });

    // Reset initial typography overlay styles
    gsap.set([t1, t2, t3], {
      opacity: 0,
      y: 20,
    });

    // Widgets start closer to center, fully hidden initially
    gsap.set([w1, w2, w3, w4], {
      opacity: 0,
      scale: 0.8,
    });
    
    // Initial drift offsets
    gsap.set(w1, { xPercent: -15, yPercent: -10, z: -50 });
    gsap.set(w2, { xPercent: 15, yPercent: -15, z: -50 });
    gsap.set(w3, { xPercent: -20, yPercent: 10, z: -50 });
    gsap.set(w4, { xPercent: 20, yPercent: 15, z: -50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=420%", // Increased scroll travel to slow down transitions
        pin: true,
        scrub: 1.2, // Smoother deceleration cushion
        anticipatePin: 1,
      },
    });

    // ── NARRATIVE SCROLL-TELLING TIMELINE ──

    // Text 1: Fades in quickly, stays longer, then fades out
    tl.to(t1, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.02);
    tl.to(t1, { opacity: 0, y: -15, duration: 0.15, ease: "power2.in" }, 0.28);

    // Text 2: Fades in quickly, stays longer, then fades out
    tl.to(t2, { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.40);
    tl.to(t2, { opacity: 0, y: -15, duration: 0.15, ease: "power2.in" }, 0.66);

    // Text 3: Fades in and stays
    tl.to(t3, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.78);


    // ── DASHBOARD ZOOM & PERSPECTIVE TIMELINE ──
    // Zoom in slowly over the entire scroll range
    tl.to(dashboard, {
      rotateX: 0,
      scale: 1,
      z: 0,
      duration: 1.0,
      ease: "none",
      force3D: true,
    }, 0);

    // Dashboard fades in to full focus right around the Text 3 transition
    tl.to(dashboard, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    }, 0.68);


    // ── PARALLAX WIDGETS TIMELINE (Staggered fade-in along with dashboard) ──

    // Widget 1: Inbound call bubble - Drifts up & left
    tl.to(w1, {
      opacity: 1,
      scale: 1,
      xPercent: -45,
      yPercent: -28,
      z: 80,
      duration: 0.28,
      ease: "power2.out",
      force3D: true,
    }, 0.70);

    // Widget 2: n8n automation connector - Drifts up & right
    tl.to(w2, {
      opacity: 1,
      scale: 1,
      xPercent: 45,
      yPercent: -35,
      z: 100,
      duration: 0.28,
      ease: "power2.out",
      force3D: true,
    }, 0.73);

    // Widget 3: Lighthouse dial - Drifts down & left
    tl.to(w3, {
      opacity: 1,
      scale: 1,
      xPercent: -55,
      yPercent: 30,
      z: 60,
      duration: 0.28,
      ease: "power2.out",
      force3D: true,
    }, 0.78);

    // Widget 4: Terminal console - Drifts down & right
    tl.to(w4, {
      opacity: 1,
      scale: 1,
      xPercent: 55,
      yPercent: 25,
      z: 90,
      duration: 0.28,
      ease: "power2.out",
      force3D: true,
    }, 0.75);

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
      className="relative min-h-fit md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent z-20 py-10 md:py-20 px-4"
    >
      {/* Custom styles matching brand style */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-transparent opacity-[0.03] pointer-events-none border-b border-white/5" 
           style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      
      {/* Container holding overlays and 3D portal (Reduced gap to bring text closer to picture) */}
      <div className="relative mx-auto w-full max-w-7xl flex flex-col items-center gap-4 md:gap-5 z-10 text-center">
        
        {/* MOBILE HEADLINE FALLBACK (Static arrangement for viewports < 768px) */}
        {isMobile ? (
          <div className="max-w-md px-4 text-center space-y-6 pt-4 pb-0 mb-2">
            <p className="text-[9px] font-mono uppercase tracking-[0.45em] text-white/35">
              01 // CORE_INFRASTRUCTURE
            </p>
            <h2 className="text-3xl font-light tracking-tight text-white leading-tight">
              You focus on <br className="block sm:hidden" />
              <span className="metallic-text-sweep font-bold">your business.</span>
            </h2>
            <h3 className="text-xl font-light text-white/85 leading-normal">
              We build the <br className="block sm:hidden" />
              <span className="metallic-text-sweep font-bold">invisible engine.</span>
            </h3>
            <p className="text-[11px] font-mono text-white/40 tracking-wider">
              AI, AUTOMATION & SYSTEMS. <br className="block sm:hidden" />
              <span className="metallic-text-sweep font-bold">WORKING 24/7.</span>
            </p>
          </div>
        ) : (
          /* DESKTOP NARRATIVE SCROLL-TELLING TEXT CONTAINER (Pushed down/closer to dashboard) */
          <div className="relative w-full h-16 flex items-center justify-center translate-y-6 md:translate-y-8">
            <div 
              ref={t1Ref} 
              className="absolute text-3xl md:text-5xl font-light tracking-tight text-white/95 leading-snug drop-shadow-md select-none"
            >
              You focus on <span className="metallic-text-sweep font-bold">your business.</span>
            </div>
            <div 
              ref={t2Ref} 
              className="absolute text-3xl md:text-5xl font-light tracking-tight text-white/95 leading-snug drop-shadow-md select-none"
            >
              We build the <span className="metallic-text-sweep font-bold">invisible engine.</span>
            </div>
            <div 
              ref={t3Ref} 
              className="absolute text-3xl md:text-5xl font-light tracking-tight text-white/95 leading-snug drop-shadow-md select-none"
            >
              AI, Automation & Systems. <span className="metallic-text-sweep font-bold">Working 24/7.</span>
            </div>
          </div>
        )}

        {/* 3D Perspective Animation Container */}
        <div 
          ref={containerRef}
          className={cn(
            "relative w-full flex flex-col md:flex-row items-center justify-center min-h-[420px] sm:min-h-[500px] md:min-h-[550px] gap-6",
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
              <div className="hidden sm:block tracking-[0.2em]">GROWTH_ENGINE // OUTCOMES</div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-wide">SYS: OPTIMIZED</span>
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
                    <span>CLIENT_GROWTH_CURVE</span>
                    <span className="text-emerald-400">+142% CONVERSION</span>
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
                    <span className="text-[6px] md:text-[7px] text-emerald-400 block tracking-wider font-semibold">MANUAL HOURS SAVED</span>
                    <span className="text-[9px] sm:text-xs text-white/70 block mt-0.5">124 hrs/mo</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
                    <span className="text-[6px] md:text-[7px] text-white/30 block tracking-wider">AUTO_CRM_SYNC</span>
                    <span className="text-[9px] sm:text-xs text-white/70 block mt-0.5">VERIFIED</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
                    <span className="text-[6px] md:text-[7px] text-emerald-400 block tracking-wider font-semibold">NEW LEADS SECURED</span>
                    <span className="text-[9px] sm:text-xs text-emerald-400 block mt-0.5">42 // LIVE</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Right */}
              <div className="hidden sm:flex w-36 bg-white/[0.01] border-l border-white/5 p-4 flex-col gap-3.5 text-left font-mono text-[8px] text-white/35">
                <div>
                  <span className="text-white/20 block">ACTIVE AI AGENTS</span>
                  <span className="text-emerald-400 block mt-0.5">3 OPERATIONAL</span>
                </div>
                <div>
                  <span className="text-white/20 block">ACTIVE INTEGRATIONS</span>
                  <span className="text-white/60 block mt-0.5">API_CRM_EMAILS</span>
                </div>
                <div>
                  <span className="text-white/20 block">WORKFLOWS AUTOMATED</span>
                  <span className="text-emerald-400/80 block mt-0.5">100% // DONE</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* PARALLAX FLOATING WIDGETS */}
            <div className={cn(
              isMobile ? "flex w-full overflow-x-auto snap-x snap-mandatory gap-4 pb-6 mt-6 hide-scrollbar px-6" : "contents"
            )}>
              {/* Widget 1: AI Call Bubble / Dialogue Script */}
              <div
                ref={w1Ref}
                className={cn(
                  "bg-black/85 border border-white/10 backdrop-blur-md p-3.5 rounded-xl text-left shadow-lg select-none",
                  isMobile ? "relative shrink-0 snap-center min-w-[85%] mt-0 w-auto" : "absolute w-[220px] md:w-[250px] z-20 pointer-events-none will-change-transform"
                )}
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 font-mono text-[7px] md:text-[9px]">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    🟢 AI Voice Agent
                  </span>
                  <span className="text-white/35 font-light">Just now</span>
                </div>
                <p className="text-[8.5px] md:text-[10px] text-white/80 font-light leading-relaxed pl-1 border-l border-emerald-400/50">
                  Call completed. Client qualified and consultation booked for tomorrow at 3 PM.
                </p>
                {/* Equalizer graphic */}
                <div className="flex gap-0.5 h-2.5 items-end justify-end mt-2 px-1">
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
                  "bg-black/85 border border-white/10 backdrop-blur-md p-3.5 rounded-xl text-left shadow-lg font-mono select-none",
                  isMobile ? "relative shrink-0 snap-center min-w-[85%] mt-0 w-auto" : "absolute w-[220px] md:w-[240px] z-20 pointer-events-none will-change-transform"
                )}
              >
                <div className="text-[6.5px] md:text-[7px] text-white/35 tracking-wider mb-2 font-semibold">⚡ AUTOMATED FLOW</div>
                <div className="flex items-center justify-between relative bg-white/[0.02] border border-white/5 p-2 rounded-lg font-mono">
                  <span className="text-white/65 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[7px] md:text-[8px]">Meta Ad</span>
                  <div className="h-[1px] flex-1 bg-emerald-400/40 mx-2 relative">
                    <span className="absolute top-1/2 left-0 h-1 w-1 bg-emerald-400 rounded-full -translate-y-1/2 animate-ping" />
                  </div>
                  <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[7px] md:text-[8px] font-semibold">AI Assistant</span>
                  <div className="h-[1px] flex-1 bg-emerald-400/40 mx-2 relative">
                    <span className="absolute top-1/2 left-0 h-1 w-1 bg-emerald-400 rounded-full -translate-y-1/2 animate-ping" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <span className="text-white/65 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[7px] md:text-[8px]">Calendar Booked</span>
                </div>
                <div className="flex justify-between items-center mt-2 px-0.5 text-[6.5px] md:text-[7px] text-white/30 font-mono">
                  <span>STATUS: ACTIVE_PIPELINE</span>
                  <span>FLOW_01</span>
                </div>
              </div>

              {/* Widget 3: Lighthouse Speedometer dial */}
              <div
                ref={w3Ref}
                className={cn(
                  "bg-black/85 border border-white/10 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center gap-3.5 select-none",
                  isMobile ? "relative shrink-0 snap-center min-w-[85%] mt-0 w-auto" : "absolute w-[160px] md:w-[185px] z-20 pointer-events-none will-change-transform"
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
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[9.5px] md:text-[11px] font-bold text-white">
                    99
                  </div>
                </div>
                <div className="text-left font-mono">
                  <span className="text-[6.5px] md:text-[7px] text-white/30 block uppercase tracking-wider">SEO_PERFORMANCE</span>
                  <span className="text-[9px] md:text-[10px] text-white/80 block font-semibold">Lighthouse // OK</span>
                </div>
              </div>

              {/* Widget 4: Active Log Stream console */}
              <div
                ref={w4Ref}
                className={cn(
                  "bg-black/85 border border-white/10 backdrop-blur-md p-4 rounded-xl text-left shadow-lg flex flex-col gap-2 select-none",
                  isMobile ? "relative shrink-0 snap-center min-w-[85%] mt-0 w-auto" : "absolute w-[230px] md:w-[260px] z-20 pointer-events-none will-change-transform"
                )}
              >
                <div className="flex justify-between items-center font-mono text-[7.5px] md:text-[9px] text-white/40 border-b border-white/5 pb-1.5 mb-1">
                  <span>⚡ Live CRM Activity</span>
                  <span className="text-emerald-400 font-semibold animate-pulse">ACTIVE</span>
                </div>
                <div className="flex flex-col gap-2 font-mono text-[8.5px] md:text-[10px] text-white/70">
                  <div className="flex items-start gap-1.5 leading-normal">
                    <span className="text-white/30 font-light shrink-0">[10:42 AM]</span>
                    <span><span className="text-emerald-400 font-semibold">✅ New Lead</span> (Instagram) added to Pipeline.</span>
                  </div>
                  <div className="flex items-start gap-1.5 leading-normal">
                    <span className="text-white/30 font-light shrink-0">[10:45 AM]</span>
                    <span><span className="text-emerald-400 font-semibold">💸 Invoice #1042</span> generated and sent.</span>
                  </div>
                  <div className="flex items-start gap-1.5 leading-normal">
                    <span className="text-white/30 font-light shrink-0">[10:46 AM]</span>
                    <span><span className="text-emerald-400 font-semibold">📨 Confirmation</span> email delivered.</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
