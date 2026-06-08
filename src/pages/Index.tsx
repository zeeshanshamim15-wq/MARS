import { lazy, Suspense, useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";
import MetallicText from "@/components/ui/MetallicText";
import WordReveal from "@/components/ui/WordReveal";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import RoiAllocator from "@/components/RoiAllocator";
import {
  Cpu,
  Globe,
  Video,
  Briefcase,
  Terminal,
  Send,
  ShieldCheck,
  Zap,
  Sparkles,
  Database,
  Radio,
  CheckCircle2,
  Mail,
  Lock
} from "lucide-react";

const HeroCanvas = lazy(() => import("@/components/ParticleSphere/HeroCanvas"));
const ScrollVideo = lazy(() => import("@/components/ScrollVideo"));
import HudVisualizer from "@/components/HudVisualizer";

gsap.registerPlugin(ScrollTrigger);

const DOSSIERS = [
  {
    tag: "CASE_01",
    client: "B2B Technology Firm",
    stats: "+320% Efficiency",
    quote: "MARS designed an automated objection-handling cold-caller that operates with zero manual overhead. It resolved our core scaling blocker in less than 30 days.",
    rep: "CEO, Enterprise Tech"
  },
  {
    tag: "CASE_02",
    client: "Regional Retail Chain",
    stats: "+120% Traffic // +45% Rev",
    quote: "Our slow loading site was rebuilt from scratch. Load speeds went to 99 on Lighthouse and our sales increased instantly. They took full ownership of the rollout.",
    rep: "Founder, Multi-Store Retail"
  },
  {
    tag: "CASE_03",
    client: "Service-Based SMB",
    stats: "4.2x ROI Sync Growth",
    quote: "They embedded directly inside our workflow, mapped operations, and deployed automatic client booking routes that cut our acquisition costs in half.",
    rep: "Operations VP, SMB Logistics"
  }
];

// Sub-component for isolated log terminal to prevent global console re-renders
const TelemetryLogsTerminal = memo(function TelemetryLogsTerminal({ logPool }: { logPool: string[] }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs([]);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < logPool.length) {
        setLogs((prev) => [...prev, logPool[idx]]);
        idx++;
      } else {
        idx = 0;
        setLogs([]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [logPool]);

  return (
    <div className="font-mono text-[9px] text-emerald-400/80 bg-black/60 p-4 border border-white/5 rounded-xl h-24 overflow-y-auto flex flex-col gap-1 w-full scrollbar-none select-none">
      {logs.map((log, i) => (
        <div key={i} className="leading-relaxed flex gap-2">
          <span className="text-emerald-500/50">&gt;</span>
          <span>{log}</span>
        </div>
      ))}
      {logs.length < logPool.length && (
        <div className="text-emerald-500/30 animate-pulse">&gt; STREAMING NETWORK REGISTRY TELEMETRY...</div>
      )}
    </div>
  );
});

// Sub-component for the heavy SVG chart grid to avoid redraws on scrolling logs
const TelemetryScopeChart = memo(function TelemetryScopeChart({
  nodes,
  scraped,
  linePath,
  areaPath,
}: {
  nodes: { x: number; y: number }[];
  scraped: number | string;
  linePath: string;
  areaPath: string;
}) {
  return (
    <div className="relative bg-[#020202] border border-white/5 rounded-xl p-3 h-48 flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 390 190" className="w-full h-full text-white/5" fill="none">
        <defs>
          <linearGradient id="scopeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
          </linearGradient>
        </defs>

        {/* High Tech Grid */}
        <line x1="20" y1="30" x2="370" y2="30" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        <line x1="20" y1="60" x2="370" y2="60" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        <line x1="20" y1="90" x2="370" y2="90" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        <line x1="20" y1="120" x2="370" y2="120" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        <line x1="20" y1="150" x2="370" y2="150" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />

        <line x1="70" y1="20" x2="70" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        <line x1="120" y1="20" x2="120" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        <line x1="170" y1="20" x2="170" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        <line x1="220" y1="20" x2="220" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        <line x1="270" y1="20" x2="270" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        <line x1="320" y1="20" x2="320" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />

        {/* Glowing line paths */}
        <path
          d={areaPath}
          fill="url(#scopeGradient)"
          className="transition-all duration-700 ease-in-out"
        />

        <path
          d={linePath}
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-700 ease-in-out"
          style={{ filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))" }}
        />

        {/* Dynamic dots coordinates */}
        {nodes.map((p, pIdx) => (
          <g key={pIdx} className="transition-all duration-700 ease-in-out">
            <circle cx={p.x} cy={p.y} r="3" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
            <circle cx={p.x} cy={p.y} r="6" stroke="#10B981" strokeWidth="0.5" fill="none" className="animate-pulse" />
          </g>
        ))}
      </svg>

      {/* Oscilloscope coordinates overlay */}
      <div className="absolute top-4 left-4 font-mono text-[7px] text-emerald-400/50 space-y-0.5 pointer-events-none">
        <div>X_REF: 120.402</div>
        <div>Y_REF: {scraped}</div>
        <div>SIG_PRECISION: 99.80%</div>
      </div>
    </div>
  );
});

// Interactive Market Telemetry Console Component
function MarketTelemetryConsole() {
  const [sector, setSector] = useState<"clinics" | "gyms" | "realestate" | "saas">("clinics");

  const sectorMetrics = useMemo(() => ({
    clinics: {
      scraped: 2450,
      pings: "2,380/2,450 Verified",
      rate: "97.1%",
      nodes: [
        { x: 20, y: 140 },
        { x: 70, y: 95 },
        { x: 120, y: 120 },
        { x: 170, y: 60 },
        { x: 220, y: 85 },
        { x: 270, y: 35 },
        { x: 320, y: 70 },
        { x: 370, y: 25 }
      ],
      logPool: [
        "SCRAPE: Target matching 'clinics' initialized...",
        "Scraping nodes: Kolkata Central Division",
        "Found 140 localized coordinates.",
        "HLR Ping check starting...",
        "Node 0x4B3 verified: Status OK",
        "Node 0x2A1 verified: Status OK",
        "Scraping batch finalized. CRM Sync active.",
        "Pushing 132 verified nodes to client database."
      ]
    },
    gyms: {
      scraped: 1120,
      pings: "1,090/1,120 Verified",
      rate: "97.3%",
      nodes: [
        { x: 20, y: 150 },
        { x: 70, y: 125 },
        { x: 120, y: 80 },
        { x: 170, y: 100 },
        { x: 220, y: 50 },
        { x: 270, y: 75 },
        { x: 320, y: 45 },
        { x: 370, y: 30 }
      ],
      logPool: [
        "SCRAPE: Target matching 'fitness_centers' initialized...",
        "Scraping nodes: East Zone Gyms Directory",
        "Found 98 localized coordinates.",
        "HLR Ping check starting...",
        "Node 0x9F4 verified: Status OK",
        "Node 0x1E5 verified: Status OK",
        "Scraping batch finalized. CRM Sync active.",
        "Pushing 92 verified nodes to client database."
      ]
    },
    realestate: {
      scraped: 4320,
      pings: "4,110/4,320 Verified",
      rate: "95.1%",
      nodes: [
        { x: 20, y: 160 },
        { x: 70, y: 140 },
        { x: 120, y: 100 },
        { x: 170, y: 110 },
        { x: 220, y: 75 },
        { x: 270, y: 60 },
        { x: 320, y: 35 },
        { x: 370, y: 20 }
      ],
      logPool: [
        "SCRAPE: Target matching 'real_estate_agents' initialized...",
        "Scraping nodes: Premium Residential Segment",
        "Found 220 localized coordinates.",
        "HLR Ping check starting...",
        "Node 0x5D2 verified: Status OK",
        "Node 0x8C1 verified: Status OK",
        "Scraping batch finalized. CRM Sync active.",
        "Pushing 204 verified nodes to client database."
      ]
    },
    saas: {
      scraped: 890,
      pings: "870/890 Verified",
      rate: "97.7%",
      nodes: [
        { x: 20, y: 130 },
        { x: 70, y: 110 },
        { x: 120, y: 90 },
        { x: 170, y: 80 },
        { x: 220, y: 60 },
        { x: 270, y: 40 },
        { x: 320, y: 50 },
        { x: 370, y: 15 }
      ],
      logPool: [
        "SCRAPE: Target matching 'saas_tech_firms' initialized...",
        "Scraping nodes: IT Tech Hub Registry",
        "Found 64 localized coordinates.",
        "HLR Ping check starting...",
        "Node 0x7A4 verified: Status OK",
        "Node 0x3F5 verified: Status OK",
        "Scraping batch finalized. CRM Sync active.",
        "Pushing 61 verified nodes to client database."
      ]
    }
  }), []);

  const current = sectorMetrics[sector];

  const makeLinePath = useCallback((points: { x: number; y: number }[]) => {
    return points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "");
  }, []);

  const makeAreaPath = useCallback((points: { x: number; y: number }[]) => {
    const linePath = makeLinePath(points);
    return `${linePath} L 370 180 L 20 180 Z`;
  }, [makeLinePath]);

  const currentLinePath = useMemo(() => makeLinePath(current.nodes), [current.nodes, makeLinePath]);
  const currentAreaPath = useMemo(() => makeAreaPath(current.nodes), [current.nodes, makeAreaPath]);

  return (
    <section
      id="telemetry"
      className="relative flex min-h-screen items-center justify-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            Analytics Engine
          </p>
          <h2 className="text-4xl font-light leading-tight md:text-5xl flex flex-col items-center">
            <WordReveal text="Market Telemetry" />{" "}
            <span className="inline-block mt-1">
              <MetallicText text="Console" className="text-4xl md:text-5xl font-semibold" />
            </span>
          </h2>
          <p className="text-xs text-white/45 mt-4">
            Real-time localized directory scraping and multi-channel verification maps.
          </p>
        </div>

        {/* Console grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: Controls and Stats (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <BorderLaserCard className="p-6 bg-black/40 flex flex-col justify-between h-full" borderRadius={24}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-4">
                    01_Select_Audit_Target
                  </h3>
                  
                  {/* Selector Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {(["clinics", "gyms", "realestate", "saas"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSector(s)}
                        className={`text-[10px] font-mono uppercase px-3 py-2 border text-left flex items-center justify-between transition ${
                          sector === s
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-white/5 text-white/50 border-white/5 hover:border-white/10"
                        }`}
                      >
                        <span>{s === "realestate" ? "Real Estate" : s === "saas" ? "SaaS / Tech" : s}</span>
                        {sector === s && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono">
                    02_Audit_KPIs
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 font-mono">
                      <div className="text-lg font-bold text-white tracking-tight">{current.scraped}</div>
                      <div className="text-[7px] uppercase tracking-wider text-white/40 mt-1">Scraped Nodes</div>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 font-mono">
                      <div className="text-lg font-bold text-emerald-400 tracking-tight">{current.rate}</div>
                      <div className="text-[7px] uppercase tracking-wider text-white/40 mt-1">Verify Rate</div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 font-mono">
                      <div className="text-lg font-bold text-blue-400 tracking-tight">99.8%</div>
                      <div className="text-[7px] uppercase tracking-wider text-white/40 mt-1">Data Precision</div>
                    </div>
                  </div>
                </div>

                {/* Simulated Scope Scanning Vector */}
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full border border-emerald-500/30 flex items-center justify-center overflow-hidden shrink-0">
                    <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-500/20 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
                    <Database className="h-4 w-4 text-emerald-400/80 animate-pulse" />
                  </div>
                  <div className="font-mono text-[9px] text-white/50 leading-relaxed">
                    <div className="text-white/80 font-bold uppercase">HLR_SCANNING_ACTIVE</div>
                    <div>Pinging localized registry coordinates on Vobiz VOIP gateways...</div>
                  </div>
                </div>
              </div>
            </BorderLaserCard>
          </div>

          {/* Right Panel: Interactive Oscilloscope Graph & Live logs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <BorderLaserCard className="p-6 bg-[#070707]/90 flex flex-col gap-4" borderRadius={24}>
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">TELEMETRY_DENSITY_SCOPE</span>
                </div>
                <span className="text-[8px] font-mono text-white/35">NODE: {sector.toUpperCase()}_MAP // GATEWAY_OK</span>
              </div>

              {/* Glowing SVG Oscilloscope Chart */}
              <TelemetryScopeChart
                nodes={current.nodes}
                scraped={current.scraped}
                linePath={currentLinePath}
                areaPath={currentAreaPath}
              />

              {/* Real-time scrolling logs */}
              <TelemetryLogsTerminal logPool={current.logPool} />
            </BorderLaserCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const sphereRef = useRef<Group | null>(null);
  const morphProgressRef = useRef(0);
  const explodeProgressRef = useRef(0);

  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", need: "Automation", message: "" });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Redesign state variables
  const [activeNode, setActiveNode] = useState(0);
  const [activeDossier, setActiveDossier] = useState(0);
  const [hoveredService, setHoveredService] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [diagnosticPercent, setDiagnosticPercent] = useState(0);
  const [diagnosticDone, setDiagnosticDone] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const heroEl = document.getElementById("home");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSwiperScroll = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Filter out style elements and spacer containers using snap-center class
    const cards = Array.from(swiper.children).filter(
      (child) => child.classList.contains("snap-center")
    );
    if (cards.length === 0) return;

    const swiperCenter = swiper.getBoundingClientRect().left + swiper.clientWidth / 2;
    let closestIndex = -1;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - swiperCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex >= 0 && closestIndex < 4 && closestIndex !== hoveredService) {
      setHoveredService(closestIndex);
    }
  };

  const scrollToCard = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const cards = Array.from(swiper.children).filter(
      (child) => child.classList.contains("snap-center")
    );
    const card = cards[index] as HTMLElement;
    if (card) {
      const containerWidth = swiper.clientWidth;
      const cardOffsetLeft = card.offsetLeft;
      const cardWidth = card.clientWidth;
      const targetScrollLeft = cardOffsetLeft - (containerWidth - cardWidth) / 2;

      swiper.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
      setHoveredService(index);
    }
  };

  useEffect(() => {
    const diag = [
      "ESTABLISHING SECURE PROTOCOL LINK...",
      "CHECKING GATEWAY ROUTERS... ONLINE",
      "MONITORING ENCRYPTED SOCKETS: SECURE",
      "DIAGNOSTIC STATUS: READY_FOR_LOGS"
    ];
    let current = 0;
    const interval = setInterval(() => {
      if (current < diag.length) {
        setDiagnosticLogs(prev => [...prev, diag[current]]);
        setDiagnosticPercent(Math.floor(((current + 1) / diag.length) * 100));
        current++;
      } else {
        setDiagnosticDone(true);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const handleDecryptDossier = (idx: number) => {
    setIsDecrypting(true);
    setActiveDossier(idx);
    setTimeout(() => {
      setIsDecrypting(false);
    }, 850);
  };

  useEffect(() => {
    let frameId = 0;
    let timeline: gsap.core.Timeline | null = null;

    const setupScrollAnimation = () => {
      const sphere = sphereRef.current;
      const trigger = scrollRootRef.current;

      if (!sphere || !trigger) {
        frameId = requestAnimationFrame(setupScrollAnimation);
        return;
      }

      ScrollTrigger.config({ limitCallbacks: true });

      const isMobileDevice = window.innerWidth < 768;
      const sphereScale = isMobileDevice ? 0.62 : 1.0;

      gsap.set(sphere.position, { x: 0, y: isMobileDevice ? 0.5 : 0, z: 0 });
      gsap.set(sphere.scale, { x: sphereScale, y: sphereScale, z: sphereScale });
      gsap.set(sphere.rotation, { x: 0, y: 0, z: 0 });

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: isMobileDevice ? "+=120%" : "+=180%",
          scrub: isMobileDevice ? 0.5 : 1.2,
          fastScrollEnd: true,
          onUpdate: (self) => {
            explodeProgressRef.current = self.progress;
          }
        },
      });

      // Spin the sphere and move it downward on scroll before it blasts
      timeline
        .to(sphere.rotation, { y: Math.PI * 2.5, x: Math.PI * 0.6, ease: "none" }, 0)
        .to(sphere.position, { y: isMobileDevice ? -2.2 : -2.8, ease: "power1.out" }, 0);

      ScrollTrigger.refresh();
    };

    frameId = requestAnimationFrame(setupScrollAnimation);

    return () => {
      cancelAnimationFrame(frameId);
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
    };
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setIsTransmitting(true);
    setTerminalLogs([]);
    setIsCompleted(false);

    // Send functional email in parallel with terminal logs
    fetch("https://formsubmit.co/ajax/mars.iqsystem@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `New Inquiry from MARS Homepage: ${form.name}`,
        name: form.name,
        email: form.email,
        need: form.need,
        message: form.message
      })
    })
    .then(res => res.json())
    .then(data => console.log("Email transmission completed:", data))
    .catch(err => console.error("Email transmission failed:", err));

    const logs = [
      "INITIALIZING DATA PACKET UPLOAD...",
      "RESOLVING SERVER DOMAIN: MARS_SECURE_TUNNEL...",
      "ENCRYPTING PAYLOAD WITH QUANTUM HASH...",
      `ISOLATING TENANT SCOPES (CLIENT: ${form.name.toUpperCase()})...`,
      "STAGING INQUIRY META CHANNELS...",
      `ROUTING TO KOLKATA HEADQUARTERS VIA GATEWAY...`,
      "TRANSMISSION COMPLETE. STATUS: 200 OK."
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[currentLogIdx]}`]);
        currentLogIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTransmitting(false);
          setIsCompleted(true);
        }, 800);
      }
    }, 450);
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <div 
        className="pointer-events-none fixed inset-0 z-[-1] h-screen w-screen"
        style={{ display: isHeroVisible ? "block" : "none" }}
      >
        <Suspense fallback={null}>
          <HeroCanvas sphereRef={sphereRef} morphProgressRef={morphProgressRef} explodeProgressRef={explodeProgressRef} />
        </Suspense>
      </div>

      <Navbar />

      <main ref={scrollRootRef} className="relative z-10">
        
        {/* REDESIGNED: Futuristic Space HUD Hero */}
        <section
          id="home"
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-[hsl(0_0%_96%)]"
        >
          {/* Ambient Grid overlay and HUD lines */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="absolute inset-x-10 top-24 bottom-10 border border-white/5 rounded-[40px] pointer-events-none z-0 hidden lg:block">
            {/* HUD Status tags */}
            <div 
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "`" }));
              }}
              className="absolute top-6 left-8 text-[9px] font-mono uppercase tracking-[0.25em] text-white/30 flex items-center gap-2 pointer-events-auto cursor-pointer hover:text-white transition duration-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYS_ONLINE // SECURE_CON_0x8
            </div>
            <div className="absolute top-6 right-8 text-[9px] font-mono uppercase tracking-[0.25em] text-white/30">
              LOC: 22.5726° N, 88.3639° E
            </div>
            <div className="absolute bottom-6 left-8 text-[9px] font-mono uppercase tracking-[0.25em] text-white/30">
              EST // CORP_2024
            </div>
            <div className="absolute bottom-6 right-8 text-[9px] font-mono uppercase tracking-[0.25em] text-white/30">
              MARS_WEBSITE_V2.0
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Sci-fi badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] sm:text-xs text-white/60 w-fit mb-8 backdrop-blur-md max-w-full text-center leading-normal break-words">
              <Sparkles className="h-3.5 w-3.5 text-white/80 animate-pulse shrink-0" />
              Embedded Growth & Systems Automation Studio
            </div>
            
            <h1 className="text-balance text-4xl sm:text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
              <WordReveal text="Stop Managing." />
              <br />
              <MetallicText text="Start Scaling." className="text-4xl sm:text-5xl md:text-7xl mt-2 sm:mt-3 inline-block" />
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-white/55 md:text-lg">
              From market analysis to deep API operations, we engineer custom digital infrastructure that runs and scales your enterprise autonomously.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-6 sm:px-0 w-full sm:w-auto">
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-none bg-white px-8 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.02] shadow-lg shadow-white/10"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-none border border-white/15 bg-white/5 backdrop-blur-md px-8 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
              >
                Transmission Terminal
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/30 flex flex-col items-center gap-2 select-none animate-bounce">
            Scroll To Initiate
          </div>
        </section>

        {/* Scroll-scrubbed video showcase */}
        <Suspense fallback={null}>
          <ScrollVideo />
        </Suspense>

        {/* REDESIGNED: Bento Grid Active Verticals */}
        <section
          id="services"
          className="relative grid min-h-screen items-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] md:grid-cols-2 md:px-16 lg:px-24"
        >
          {/* Column 1: HUD Interactive Visualizer */}
          <div className="hidden md:flex items-center justify-center min-h-[350px] w-full">
            <HudVisualizer activeIndex={hoveredService} />
          </div>

          {/* Column 2: Right column contains a gorgeous Bento Grid */}
          <div className="mx-auto max-w-2xl lg:max-w-3xl text-left w-full flex flex-col gap-8 min-w-0">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
                Active Verticals
              </p>
              <h2 className="text-3xl sm:text-4xl font-light leading-tight md:text-5xl">
                <WordReveal text="Systems that" /> <MetallicText text="do the work." className="text-3xl sm:text-4xl md:text-5xl mt-1 inline-block" />
              </h2>
              <p className="mt-4 text-xs text-white/45">
                {isMobile ? "Swipe horizontally to cycle through active cores." : "Hover to activate border scanning vectors."}
              </p>
            </div>

            {/* Mobile HUD display */}
            {isMobile && (
              <div className="flex md:hidden items-center justify-center py-2 w-full">
                <HudVisualizer activeIndex={hoveredService} />
              </div>
            )}

            {/* Bento Grid / Swiper */}
            {isMobile ? (
              <div className="w-full flex flex-col gap-6 max-w-full overflow-hidden">
                {/* Horizontal Swiper Deck wrapper that clips outer horizontal overflow */}
                <div className="w-full overflow-hidden py-4">
                  <div 
                    ref={swiperRef}
                    onScroll={handleSwiperScroll}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <style dangerouslySetInnerHTML={{__html: `
                      .no-scrollbar::-webkit-scrollbar {
                        display: none;
                      }
                    `}} />

                    {/* Left spacer to center first card */}
                    <div className="w-[8vw] shrink-0 pointer-events-none" />

                    {/* Vertical 1: Automation */}
                    <Link
                      to="/services/automation"
                      className={`w-[84vw] shrink-0 snap-center transition-all duration-500 ease-out origin-center gpu-accelerate block ${
                        hoveredService === 0 
                          ? "scale-100 opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.12)]" 
                          : "scale-[0.85] opacity-40 blur-[0.3px]"
                      }`}
                    >
                      <BorderLaserCard className="p-4 sm:p-5 flex flex-col justify-between bg-black/40 min-h-[230px] h-full animate-crt-scan" borderRadius={isMobile ? 0 : 20} duration={6}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="h-9 w-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center">
                              <Cpu className="h-4.5 w-4.5 text-white/80" />
                            </div>
                            <span className="text-[8px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-none font-semibold font-mono">
                              CORE_SYS
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-white mb-2">01. Automation (IA)</h3>
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            Custom voice agents, support chatbots, n8n pipelines, and system database integrations.
                          </p>
                        </div>
                        {/* Live widget */}
                        <div className="mt-4 p-2 rounded-none bg-white/5 font-mono text-[8px] text-emerald-400/80 border border-white/5 space-y-1">
                          <div className="flex justify-between"><span>[RUN] abdul_voice_agent</span><span className="text-emerald-500 animate-pulse">● ACTIVE</span></div>
                          <div>&gt; Syncing Razorpays webhooks... OK</div>
                        </div>
                      </BorderLaserCard>
                    </Link>

                    {/* Vertical 2: Web Dev */}
                    <Link
                      to="/services/web-dev"
                      className={`w-[84vw] shrink-0 snap-center transition-all duration-500 ease-out origin-center gpu-accelerate block ${
                        hoveredService === 1 
                          ? "scale-100 opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.12)]" 
                          : "scale-[0.85] opacity-40 blur-[0.3px]"
                      }`}
                    >
                      <BorderLaserCard className="p-4 sm:p-5 flex flex-col justify-between bg-black/40 min-h-[230px] h-full animate-crt-scan" borderRadius={isMobile ? 0 : 20} duration={7}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="h-9 w-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center">
                              <Globe className="h-4.5 w-4.5 text-white/80" />
                            </div>
                            <span className="text-[8px] uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-none font-semibold font-mono">
                              DEV_OPS
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-white mb-2">02. Web Dev & SEO</h3>
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            Ultra-fast responsive storefronts and static platforms, optimized for crawlers and conversions.
                          </p>
                        </div>
                        {/* Live widget */}
                        <div className="mt-4 flex items-center justify-between p-2 rounded-none bg-white/5 font-mono text-[8px] text-white/50 border border-white/5">
                          <span>LIGHTHOUSE_PERF:</span>
                          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                            <span className="h-1.5 w-16 bg-white/10 rounded-none overflow-hidden block relative">
                              <span className="absolute left-0 top-0 bottom-0 w-[99%] bg-emerald-400 rounded-none" />
                            </span>
                            <span>99+</span>
                          </div>
                        </div>
                      </BorderLaserCard>
                    </Link>

                    {/* Vertical 3: Filmmaking */}
                    <Link
                      to="/services/filmmaking"
                      className={`w-[84vw] shrink-0 snap-center transition-all duration-500 ease-out origin-center gpu-accelerate block ${
                        hoveredService === 2 
                          ? "scale-100 opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.12)]" 
                          : "scale-[0.85] opacity-40 blur-[0.3px]"
                      }`}
                    >
                      <BorderLaserCard className="p-4 sm:p-5 flex flex-col justify-between bg-black/40 min-h-[230px] h-full animate-crt-scan" borderRadius={isMobile ? 0 : 20} duration={5}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="h-9 w-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center">
                              <Video className="h-4.5 w-4.5 text-white/80" />
                            </div>
                            <span className="text-[8px] uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-none font-semibold font-mono">
                              GEN_VFX
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-white mb-2">03. AI Film & VFX</h3>
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            Cinematic video commercials generated with custom voice narration overlays and synthetic casting.
                          </p>
                        </div>
                        {/* Live widget */}
                        <div className="mt-4 flex items-center justify-between p-2 rounded-none bg-white/5 font-mono text-[8px] text-white/50 border border-white/5">
                          <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-none bg-red-500 animate-pulse" /><span>REC_STREAM</span></div>
                          <span>60_FPS // 4K</span>
                        </div>
                      </BorderLaserCard>
                    </Link>

                    {/* Vertical 4: Consulting */}
                    <Link
                      to="/services/consulting"
                      className={`w-[84vw] shrink-0 snap-center transition-all duration-500 ease-out origin-center gpu-accelerate block ${
                        hoveredService === 3 
                          ? "scale-100 opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.12)]" 
                          : "scale-[0.85] opacity-40 blur-[0.3px]"
                      }`}
                    >
                      <BorderLaserCard className="p-4 sm:p-5 flex flex-col justify-between bg-black/40 min-h-[230px] h-full animate-crt-scan" borderRadius={isMobile ? 0 : 20} duration={8}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="h-9 w-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center">
                              <Briefcase className="h-4.5 w-4.5 text-white/80" />
                            </div>
                            <span className="text-[8px] uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-none font-semibold font-mono">
                              STRAT_OPS
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-white mb-2">04. Strategic Consulting</h3>
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            Embedding with your team to audit pipelines, design custom architectures, and drive operational scaling.
                          </p>
                        </div>
                        {/* Live widget */}
                        <div className="mt-4 flex items-center justify-between p-2 rounded-none bg-white/5 font-mono text-[8px] text-white/50 border border-white/5">
                          <span>ENTERPRISE_ROI:</span>
                          <span className="text-emerald-400 font-bold font-mono">4.2x (VERIFIED)</span>
                        </div>
                      </BorderLaserCard>
                    </Link>

                    {/* Right spacer to center last card */}
                    <div className="w-[8vw] shrink-0 pointer-events-none" />
                  </div>
                </div>

                {/* Pagination Indicators */}
                <div className="flex justify-center gap-2 mt-2 select-none">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => {
                        scrollToCard(index);
                      }}
                      className={`h-1 rounded-none transition-all duration-300 ${
                        hoveredService === index
                          ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                          : "w-2.5 bg-white/20"
                      }`}
                      aria-label={`Go to service ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {/* Vertical 1: Automation */}
                <Link to="/services/automation" onMouseEnter={() => setHoveredService(0)} className="w-full h-full block cursor-pointer">
                  <BorderLaserCard className="p-6 flex flex-col justify-between bg-black/40 min-h-[220px] h-full" borderRadius={20} duration={6}>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Cpu className="h-4.5 w-4.5 text-white/80" />
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold font-mono">
                          CORE_SYS
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">01. Automation (IA)</h3>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Custom voice agents, support chatbots, n8n pipelines, and system database integrations.
                      </p>
                    </div>
                    {/* Live widget */}
                    <div className="mt-4 p-2 rounded bg-white/5 font-mono text-[8px] text-emerald-400/80 border border-white/5 space-y-1">
                      <div className="flex justify-between"><span>[RUN] abdul_voice_agent</span><span className="text-emerald-500 animate-pulse">● ACTIVE</span></div>
                      <div>&gt; Syncing Razorpays webhooks... OK</div>
                    </div>
                  </BorderLaserCard>
                </Link>

                {/* Vertical 2: Web Dev */}
                <Link to="/services/web-dev" onMouseEnter={() => setHoveredService(1)} className="w-full h-full block cursor-pointer">
                  <BorderLaserCard className="p-6 flex flex-col justify-between bg-black/40 min-h-[220px] h-full" borderRadius={20} duration={7}>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Globe className="h-4.5 w-4.5 text-white/80" />
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold font-mono">
                          DEV_OPS
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">02. Web Dev & SEO</h3>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Ultra-fast responsive storefronts and static platforms, optimized for crawlers and conversions.
                      </p>
                    </div>
                    {/* Live widget */}
                    <div className="mt-4 flex items-center justify-between p-2 rounded bg-white/5 font-mono text-[8px] text-white/50 border border-white/5">
                      <span>LIGHTHOUSE_PERF:</span>
                      <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                        <span className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden block relative">
                          <span className="absolute left-0 top-0 bottom-0 w-[99%] bg-emerald-400 rounded-full" />
                        </span>
                        <span>99+</span>
                      </div>
                    </div>
                  </BorderLaserCard>
                </Link>

                {/* Vertical 3: Filmmaking */}
                <Link to="/services/filmmaking" onMouseEnter={() => setHoveredService(2)} className="w-full h-full block cursor-pointer">
                  <BorderLaserCard className="p-6 flex flex-col justify-between bg-black/40 min-h-[220px] h-full" borderRadius={20} duration={5}>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Video className="h-4.5 w-4.5 text-white/80" />
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full font-semibold font-mono">
                          GEN_VFX
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">03. AI Film & VFX</h3>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Cinematic video commercials generated with custom voice narration overlays and synthetic casting.
                      </p>
                    </div>
                    {/* Live widget */}
                    <div className="mt-4 flex items-center justify-between p-2 rounded bg-white/5 font-mono text-[8px] text-white/50 border border-white/5">
                      <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /><span>REC_STREAM</span></div>
                      <span>60_FPS // 4K</span>
                    </div>
                  </BorderLaserCard>
                </Link>

                {/* Vertical 4: Consulting */}
                <Link to="/services/consulting" onMouseEnter={() => setHoveredService(3)} className="w-full h-full block cursor-pointer">
                  <BorderLaserCard className="p-6 flex flex-col justify-between bg-black/40 min-h-[220px] h-full" borderRadius={20} duration={8}>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Briefcase className="h-4.5 w-4.5 text-white/80" />
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold font-mono">
                          STRAT_OPS
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">04. Strategic Consulting</h3>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Embedding with your team to audit pipelines, design custom architectures, and drive operational scaling.
                      </p>
                    </div>
                    {/* Live widget */}
                    <div className="mt-4 flex items-center justify-between p-2 rounded bg-white/5 font-mono text-[8px] text-white/50 border border-white/5">
                      <span>ENTERPRISE_ROI:</span>
                      <span className="text-emerald-400 font-bold font-mono">4.2x (VERIFIED)</span>
                    </div>
                  </BorderLaserCard>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* NEW SECTION: Core Operations Ingestion Pipeline */}
        <section
          id="operations"
          className="relative flex flex-col min-h-screen items-center justify-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] border-t border-white/5"
        >
          <div className="mx-auto max-w-6xl w-full">
            <div className="text-center mb-16">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
                Operational Framework
              </p>
              <h2 className="text-4xl font-light leading-tight md:text-5xl">
                <WordReveal text="Core Operations" />{" "}
                <span className="inline-block"><WordReveal text="Ingestion Pipeline" className="font-semibold mars-text-gradient" /></span>
              </h2>
              <p className="text-xs text-white/40 mt-2">How data traverses our embedded automation system networks.</p>
            </div>

            {/* Interactive SVG Flow Diagram */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
              {/* Telemetry Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <BorderLaserCard className="p-4 sm:p-6 bg-black/40 min-h-[220px] flex flex-col justify-between" borderRadius={24}>
                  <div>
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                      <Terminal className="h-4 w-4 text-white/50" />
                      <span className="text-[10px] font-mono tracking-widest text-white/50">INGESTION_NODE_LOGS</span>
                    </div>

                    <div className="space-y-3 font-mono text-[10px] text-white/60">
                      {activeNode === 0 && (
                        <>
                          <div className="text-emerald-400">&gt; Node_01: INTAKE_GATEWAY</div>
                          <div>- Accepts client queries via HTTPS SSH channels.</div>
                          <div>- Severs raw transmission packets.</div>
                          <div>- Status: MONITORING_PORTS</div>
                        </>
                      )}
                      {activeNode === 1 && (
                        <>
                          <div className="text-blue-400">&gt; Node_02: ORION_SANITIZER</div>
                          <div>- Scrubs data payloads for compliance checks.</div>
                          <div>- Strips raw passwords or variables.</div>
                          <div>- Status: SCRUBBING_RUNNING</div>
                        </>
                      )}
                      {activeNode === 2 && (
                        <>
                          <div className="text-purple-400">&gt; Node_03: ABDUL_AI_AGENT</div>
                          <div>- Resolves context structures using LLMs.</div>
                          <div>- Routes actions (voice, database, CRM triggers).</div>
                          <div>- Status: RUNNING_CORES</div>
                        </>
                      )}
                      {activeNode === 3 && (
                        <>
                          <div className="text-amber-400">&gt; Node_04: MANUAL_AUDIT</div>
                          <div>- Fallback auditing triggers.</div>
                          <div>- Quality assurance logs checked.</div>
                          <div>- Status: AUDIT_STABLE</div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-white/30 italic">Tap over pipeline nodes to scan logs.</div>
                </BorderLaserCard>
              </div>

              {/* Ingestion Nodes Row (Horizontal layout on mobile, click/tap active stepper) */}
              <div className="lg:col-span-8 relative flex flex-row flex-wrap justify-around sm:justify-between items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-[32px] border border-white/5 bg-white/[0.01]">
                {/* SVG Connections background */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12%" y1="50%" x2="38%" y2="50%" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="38%" y1="50%" x2="62%" y2="50%" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="62%" y1="50%" x2="88%" y2="50%" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="5,5" />
                    {/* Glowing flow dots */}
                    <circle cx="25%" cy="50%" r="3" fill="#34d399">
                      <animate attributeName="cx" from="12%" to="38%" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50%" cy="50%" r="3" fill="#60a5fa">
                      <animate attributeName="cx" from="38%" to="62%" dur="3.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="3.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="75%" cy="50%" r="3" fill="#c084fc">
                      <animate attributeName="cx" from="62%" to="88%" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>

                {/* Node 1 */}
                <div
                  onClick={() => setActiveNode(0)}
                  onMouseEnter={() => setActiveNode(0)}
                  className={`relative z-10 h-12 w-12 sm:h-20 sm:w-20 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center cursor-pointer transition border ${
                    activeNode === 0 ? "bg-white text-black border-white" : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Send className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
                  <span className="text-[7px] sm:text-[8px] font-mono mt-1 font-semibold uppercase tracking-wider">INTAKE</span>
                </div>

                {/* Node 2 */}
                <div
                  onClick={() => setActiveNode(1)}
                  onMouseEnter={() => setActiveNode(1)}
                  className={`relative z-10 h-12 w-12 sm:h-20 sm:w-20 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center cursor-pointer transition border ${
                    activeNode === 1 ? "bg-white text-black border-white" : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  }`}
                >
                  <ShieldCheck className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
                  <span className="text-[7px] sm:text-[8px] font-mono mt-1 font-semibold uppercase tracking-wider">SANITIZER</span>
                </div>

                {/* Node 3 */}
                <div
                  onClick={() => setActiveNode(2)}
                  onMouseEnter={() => setActiveNode(2)}
                  className={`relative z-10 h-12 w-12 sm:h-20 sm:w-20 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center cursor-pointer transition border ${
                    activeNode === 2 ? "bg-white text-black border-white" : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Cpu className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
                  <span className="text-[7px] sm:text-[8px] font-mono mt-1 font-semibold uppercase tracking-wider">AGENT_AI</span>
                </div>

                {/* Node 4 */}
                <div
                  onClick={() => setActiveNode(3)}
                  onMouseEnter={() => setActiveNode(3)}
                  className={`relative z-10 h-12 w-12 sm:h-20 sm:w-20 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center cursor-pointer transition border ${
                    activeNode === 3 ? "bg-white text-black border-white" : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  }`}
                >
                  <CheckCircle2 className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
                  <span className="text-[7px] sm:text-[8px] font-mono mt-1 font-semibold uppercase tracking-wider">AUDIT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION: Market Telemetry Console */}
        <MarketTelemetryConsole />

        {/* REDESIGNED: Glassmorphic About Bento Row */}
        <section
          id="about"
          className="relative flex flex-col min-h-screen items-center justify-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] border-t border-white/5"
        >
          <div className="mx-auto max-w-6xl w-full">
            <div className="text-center mb-16">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
                Philosophy
              </p>
              <h2 className="text-3xl sm:text-4xl font-light leading-tight md:text-5xl">
                <WordReveal text="A small studio." />{" "}
                <span className="inline-block"><WordReveal text="High signal." className="font-semibold mars-text-gradient" /></span>
              </h2>
              <p className="text-xs text-white/40 mt-2">Driven by practical execution, not recommendations.</p>
            </div>

            {/* Bento Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
              {/* Card 1 */}
              <div className="mars-glass-card rounded-[24px] p-5 sm:p-8 border border-white/5 bg-white/[0.01]">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-5 w-5 text-white/90" />
                </div>
                <h3 className="text-lg font-medium text-white mb-3">Evidence-First & Ownership</h3>
                <p className="text-xs text-white/55 leading-relaxed">
                  Every recommendation is backed by competitor audits and system diagnostics. We take full ownership of results, treating client enterprises as if they were our own.
                </p>
              </div>

              {/* Card 2 */}
              <div className="mars-glass-card rounded-[24px] p-5 sm:p-8 border border-white/5 bg-white/[0.01]">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Zap className="h-5 w-5 text-white/90" />
                </div>
                <h3 className="text-lg font-medium text-white mb-3">Futuristic Autonomous Goal</h3>
                <p className="text-xs text-white/55 leading-relaxed">
                  We work toward a future where a CEO speaks a simple task aloud (e.g. &ldquo;Log statement results&rdquo;), and custom back-office systems complete the pipeline autonomously.
                </p>
              </div>

              {/* Card 3 */}
              <div className="mars-glass-card rounded-[24px] p-5 sm:p-8 border border-white/5 bg-white/[0.01]">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Database className="h-5 w-5 text-white/90" />
                </div>
                <h3 className="text-lg font-medium text-white mb-3">Rigid Compliance Gates</h3>
                <p className="text-xs text-white/55 leading-relaxed">
                  India DPDP Act compliance guides our automation builds. We enforce data minimisation, secure API key vaults, and strict database tenant isolation rules.
                </p>
              </div>
            </div>

            {/* Decrypted Mainframe Testimonials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-16 pt-16 border-t border-white/5">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <p className="mb-3 text-[10px] uppercase font-mono tracking-widest text-emerald-400">
                  DECRYPTION_PANEL_V2.0
                </p>
                <h3 className="text-2xl font-light tracking-tight text-white mb-4">
                  Decrypted <span className="font-semibold text-white/90">Dossiers</span>
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-6">
                  Select a secure client record block to decrypt actual representative outcome telemetry and satisfaction quotes.
                </p>

                <div className="flex flex-col gap-2.5">
                  {DOSSIERS.map((dos, dIdx) => (
                    <button
                      key={dIdx}
                      onClick={() => handleDecryptDossier(dIdx)}
                      className={`h-11 px-4 rounded-xl font-mono text-[10px] tracking-wider text-left transition border flex items-center justify-between ${
                        activeDossier === dIdx
                          ? "bg-white text-black border-white font-semibold"
                          : "bg-white/5 text-white/70 border-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span>{dos.tag} // {dos.client}</span>
                      {isDecrypting && activeDossier === dIdx ? (
                        <span className="text-[9px] animate-pulse">DECRYPTING...</span>
                      ) : (
                        <span className="text-[9px] opacity-40">DECRYPTED_OK</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 flex">
                <BorderLaserCard className="p-5 sm:p-8 bg-black/60 shadow-2xl backdrop-blur-2xl flex-1 flex flex-col justify-between" borderRadius={24}>
                  <div>
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-6">
                      <Terminal className="h-4 w-4 text-white/40" />
                      <span className="text-[10px] font-mono tracking-widest text-white/50">SECURE_CLIENT_DATA_OUTPUT</span>
                    </div>

                    {isDecrypting ? (
                      <div className="py-12 flex flex-col items-center justify-center gap-3 font-mono text-xs text-emerald-400">
                        <span className="h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <span className="animate-pulse tracking-widest">RUNNING DECRYPTION CYCLES...</span>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="font-mono text-[10px] text-white/40 flex justify-between">
                          <span>CLIENT: {DOSSIERS[activeDossier].client}</span>
                          <span>IMPACT: {DOSSIERS[activeDossier].stats}</span>
                        </div>
                        <blockquote className="text-sm italic leading-relaxed text-white/80">
                          &ldquo;{DOSSIERS[activeDossier].quote}&rdquo;
                        </blockquote>
                        <div className="border-t border-white/5 pt-4">
                          <p className="text-[10px] text-white/40 font-mono">REPRESENTATIVE: {DOSSIERS[activeDossier].rep}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-[9px] font-mono text-emerald-500/60 border-t border-white/5 pt-3 mt-6 flex justify-between">
                    <span>SECURITY_STAMP: PASS</span>
                    <span>SSH_ENCRYPTED: TRUE</span>
                  </div>
                </BorderLaserCard>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tactical ROI / Resource Allocator */}
        <RoiAllocator />

        {/* REDESIGNED: Interactive Inquiry Terminal Contact */}
        <section
          id="contact"
          className="relative flex min-h-screen items-center justify-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] border-t border-white/5"
        >
          <div className="mx-auto max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Terminal Left */}
            <div className="md:col-span-5 flex flex-col justify-center">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
                Secure Channel
              </p>
              <h2 className="text-3xl font-light leading-tight md:text-5xl mb-6">
                <WordReveal text="Transmit" />{" "}
                <span className="inline-block"><WordReveal text="Query" className="font-semibold mars-text-gradient" /></span>
              </h2>
              <p className="text-xs text-white/50 leading-relaxed mb-6">
                Initiate a data transmission packet to link with our embedded strategic planners. Our response gate is typically active within one business day.
              </p>

              <div className="space-y-4 text-xs text-white/40">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/30" />
                  <span>mars.iqsystem@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Radio className="h-4 w-4 text-white/30 animate-pulse" />
                  <span>Kolkata HQ Active (24h Window)</span>
                </div>
              </div>
            </div>

            {/* Form Right (Interactive terminal) */}
            <div className="md:col-span-7 w-full">
              <BorderLaserCard className="p-4 sm:p-8 relative bg-black/60 shadow-2xl backdrop-blur-xl" borderRadius={24}>
                {!isCompleted ? (
                  <form onSubmit={handleTransmit} className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Terminal className="h-4 w-4 text-white/50" />
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">TRANSMISSION_INPUT_CONSOLE</span>
                    </div>

                    {!diagnosticDone ? (
                      <div className="space-y-3 font-mono text-[9.5px] text-white/50 bg-black/40 border border-white/5 rounded-xl p-4 min-h-[220px] flex flex-col justify-between select-none">
                        <div>
                          <div className="flex gap-2 items-center text-white/40 border-b border-white/5 pb-2 mb-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                            <span>RUNNING_CLIENT_DIAGNOSTICS_CHECKS...</span>
                          </div>
                          <div className="space-y-1.5">
                            {diagnosticLogs.map((log, dIdx) => (
                              <div key={dIdx} className="flex gap-2">
                                <span className="text-emerald-500">&gt;</span>
                                <span>{log}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-emerald-400">
                          <span>SYSTEM_LOAD: VALIDATING</span>
                          <span>{diagnosticPercent}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-fade-in">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Client Name</label>
                          <input
                            type="text"
                            required
                            disabled={isTransmitting}
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="ENTER FULL NAME"
                            className="w-full h-11 px-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-none md:rounded-xl text-white outline-none transition disabled:opacity-50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Email Coordinates</label>
                          <input
                            type="email"
                            required
                            disabled={isTransmitting}
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="ENTER EMAIL ADDRESS"
                            className="w-full h-11 px-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-none md:rounded-xl text-white outline-none transition disabled:opacity-50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Enterprise Needs</label>
                          <select
                            disabled={isTransmitting}
                            value={form.need}
                            onChange={(e) => setForm({ ...form, need: e.target.value })}
                            className="w-full h-11 px-4 text-xs bg-white/5 border border-white/10 rounded-none md:rounded-xl text-white/80 outline-none hover:bg-white/10 focus:bg-white/10 transition disabled:opacity-50 appearance-none cursor-pointer"
                          >
                            <option value="Automation" className="bg-[#0A0A0A] text-white">Intelligent Automation Systems</option>
                            <option value="WebDev" className="bg-[#0A0A0A] text-white">Web Development & SEO</option>
                            <option value="Filmmaking" className="bg-[#0A0A0A] text-white">AI Filmmaking & VFX</option>
                            <option value="Consulting" className="bg-[#0A0A0A] text-white">Embedded Strategic Growth</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Operational Message</label>
                          <textarea
                            disabled={isTransmitting}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="ENTER DETAILS ON BOTTLE-NECKS OR PROJECT OBJECTIVES..."
                            className="w-full h-24 p-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-none md:rounded-xl text-white outline-none resize-none transition disabled:opacity-50"
                          />
                        </div>

                        {isTransmitting ? (
                          <div className="space-y-2 border border-white/5 bg-black/40 rounded-none md:rounded-xl p-4 font-mono text-[9px] text-emerald-400">
                            {terminalLogs.map((log, lIdx) => (
                              <div key={lIdx} className="flex gap-2">
                                <span className="text-emerald-500 shrink-0">&gt;&gt;</span>
                                <span className="leading-relaxed">{log}</span>
                              </div>
                            ))}
                            <div className="flex gap-2 items-center text-emerald-300">
                              <span className="text-emerald-500 animate-pulse">&gt;&gt;</span>
                              <span className="animate-pulse">TRANSMITTING PACKETS...</span>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="w-full h-11 bg-white hover:bg-white/95 text-black font-semibold text-xs rounded-none md:rounded-xl flex items-center justify-center gap-2 transition hover:scale-[1.01]"
                          >
                            <Send className="h-3.5 w-3.5" />
                            TRANSMIT DATA PACKET
                          </button>
                        )}
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="text-center py-10 space-y-6 animate-fade-in select-none">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">Packet Transmission Successful</h4>
                      <p className="text-xs text-white/50 mt-2 max-w-sm mx-auto leading-relaxed">
                        Secure SSH tunnel closed. Your query logs have been compiled and routed directly to our embedded team coordinates.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCompleted(false)}
                      className="inline-flex h-9 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 px-5 text-xs text-white/80 transition"
                    >
                      Transmit New Log
                    </button>
                  </div>
                )}
              </BorderLaserCard>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
