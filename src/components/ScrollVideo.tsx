import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderLaserCard from "./ui/BorderLaserCard";
import WordReveal from "./ui/WordReveal";
import MetallicText from "./ui/MetallicText";
import { Terminal, Cpu, Globe, Video, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── constants ──────────────────────────────────────────── */

const CARD1_FRAMES = 185;
const CARD2_FRAMES = 125;
const CANVAS_W = 1462;
const CANVAS_H = 1900;

const card1Src = (i: number): string => {
  const num = String(i + 1).padStart(3, "0");
  return `/video frames/ezgif-frame-${num}.jpg`;
};

const card2Src = (i: number): string => {
  const num = String(i + 1).padStart(3, "0");
  return `/2nd card frame/ezgif-frame-${num}.jpg`;
};

/* ── helper components ──────────────────────────────────── */

// Layout-stable cipher decryption effect
interface MatrixDecryptProps {
  text: string;
  speed?: number;
  delay?: number;
  trigger?: any;
}

function MatrixDecrypt({ text, speed = 20, delay = 0, trigger }: MatrixDecryptProps) {
  const [displayText, setDisplayText] = useState("");
  const chars = "X01%@#$&*[]<>_?/\\+=!-:;";

  useEffect(() => {
    let iterations = 0;
    
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iterations) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        });

        if (iterations >= text.length) {
          clearInterval(interval);
        }
        iterations += 1;
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [text, speed, delay, trigger]);

  const scrambledPlaceholder = text
    .split("")
    .map(c => (c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
    .join("");

  return <>{displayText || scrambledPlaceholder}</>;
}

// Active Terminal Ticker reflecting current chapter logs
function TerminalLogs({ chapter }: { chapter: number }) {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLogs([]);
    if (chapter < 0) return;

    const logsPool = chapter === 0 ? [
      "SYSTEM: Initializing media capture core...",
      "INPUT: Loading frames from /video frames/...",
      "CAMERA: Optical tracking focus set to AUTO",
      "VFX: Ingesting frame buffer [EZGIF_185]",
      "ENGINE: Orion Frame Interpolator v2.4 initialized",
      "SYS: Frame rate locked at 60_FPS",
      "RENDER: Processing thread #12... OK",
      "MONITOR: GPU thermal diagnostics: 54C (NOMINAL)",
      "STATUS: Ingestion systems operating at 320% efficiency",
      "VFX: Frame compilation buffer flushed successfully."
    ] : [
      "SYSTEM: Syncing neural ledger database...",
      "COMM: WebSocket gateway handshake initiated...",
      "COMM: Bridge latency check: 4.2ms (EXCELLENT)",
      "KHATA: Syncing Ramesh ledger entry [EXP_0042]",
      "DB: Backup state replication completed.",
      "COMM: Voice model Hindi-English encoder initialized",
      "SYS: Security compliance handshake signed (CORE_SEC)",
      "MONITOR: API throughput node active: 10k req/s",
      "STATUS: Cognitive agent operations stabilized",
      "SYS: Embedded database operational check... PASSED"
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < logsPool.length) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}] ${logsPool[count]}`].slice(-3));
        count++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [chapter]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  if (chapter < 0) return null;

  return (
    <div 
      ref={containerRef}
      className="font-mono text-[9px] text-white/50 bg-black/60 p-2 md:p-3 border border-white/5 rounded-lg h-20 md:h-24 overflow-y-auto flex flex-col gap-1 w-full"
    >
      {logs.map((log, i) => (
        <div key={i} className="leading-relaxed truncate">
          <span className="text-white/30 mr-1.5">&gt;</span>
          {log}
        </div>
      ))}
      {logs.length === 0 && (
        <div className="text-white/30 animate-pulse">&gt; ESTABLISHING TRANSMISSION LINK...</div>
      )}
    </div>
  );
}

/* ── data datasets ───────────────────────────────────────── */

const CHAPTERS = [
  {
    num: "01",
    title: "COGNITIVE MEDIA & IMAGERY CAPTURE",
    tagline: "HIGH-THROUGHPUT GRAPHICS & SPATIAL VIRTUALIZATION",
    description: "Automated asset generation engines parsing raw cinematic scenes. Delivering optimized VFX pipelines, localized casting arrays, and real-time GPU rendering blocks to expand brand capability at zero operational margin.",
    telemetry: [
      { label: "SECTOR_ID", val: "GEN_VFX_NODE_01" },
      { label: "RESOLUTION", val: "8K_RAW_UNCOMPRESSED" },
      { label: "RENDER_CORE", val: "ORION_v2.4_STABLE" },
      { label: "GPU_DIAG", val: "87.4%_ACTIVE_CAP" }
    ]
  },
  {
    num: "02",
    title: "SYNAPTIC SYSTEM LOGISTICS & AI AGENTS",
    tagline: "COGNITIVE ACCOUNTING & EMBEDDED CRM CORES",
    description: "Organic integration of manual business workflows and automated neural models. Building localized voice execution dialers, Hindi-English ledger structures, and instant cross-border invoice generation.",
    telemetry: [
      { label: "SECTOR_ID", val: "COMM_CORE_NODE_02" },
      { label: "BRIDGE_LATENCY", val: "4.2ms_STABLE_SYNC" },
      { label: "LEDGER_PING", val: "KHATA_RESOLVED_TRUE" },
      { label: "AUTH_GATEWAY", val: "SSH_RSA_2048_SECURE" }
    ]
  }
];

/* ── main component ──────────────────────────────────────── */

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);

  const leftColumnRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const images1Ref = useRef<HTMLImageElement[]>([]);
  const images2Ref = useRef<HTMLImageElement[]>([]);
  const frame1Tracker = useRef({ frame: 0 });
  const frame2Tracker = useRef({ frame: 0 });
  const lastDrawn1 = useRef(-1);
  const lastDrawn2 = useRef(-1);

  const [loaded, setLoaded] = useState(false);
  const [activeChapter, setActiveChapter] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? 0 : -1;
    }
    return -1;
  }); // -1: Intro, 0: Chapter 1, 1: Chapter 2
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const drawFrame1 = useCallback((frameVal: number) => {
    const c = canvas1Ref.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) {
      const idx = Math.round(frameVal);
      const clamped = Math.max(0, Math.min(CARD1_FRAMES - 1, idx));
      if (clamped !== lastDrawn1.current) {
        const img = images1Ref.current[clamped];
        if (img) {
          ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
          ctx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);
          lastDrawn1.current = clamped;
        }
      }
    }
  }, []);

  const drawFrame2 = useCallback((frameVal: number) => {
    const c = canvas2Ref.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) {
      const idx = Math.round(frameVal);
      const clamped = Math.max(0, Math.min(CARD2_FRAMES - 1, idx));
      if (clamped !== lastDrawn2.current) {
        const img = images2Ref.current[clamped];
        if (img) {
          ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
          ctx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);
          lastDrawn2.current = clamped;
        }
      }
    }
  }, []);

  const handleMobileChapterSelect = (chapter: number) => {
    if (chapter === activeChapter) return;
    setActiveChapter(chapter);
    
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    if (!card1 || !card2) return;

    if (chapter === 0) {
      // Transition to chapter 1
      gsap.to(card2, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(card1, { opacity: 1, duration: 0.4, ease: "power2.inOut" });
      
      // Animate frame sequence
      gsap.fromTo(frame1Tracker.current,
        { frame: 0 },
        {
          frame: CARD1_FRAMES - 1,
          duration: 1.2,
          ease: "power1.inOut",
          snap: { frame: 1 },
          onUpdate: function() {
            const currentFrame = this.targets()[0].frame;
            setScrollProgress(currentFrame / (CARD1_FRAMES - 1));
            drawFrame1(currentFrame);
          }
        }
      );
    } else {
      // Transition to chapter 2
      gsap.to(card1, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(card2, { opacity: 1, duration: 0.4, ease: "power2.inOut" });
      
      // Animate frame sequence
      gsap.fromTo(frame2Tracker.current,
        { frame: 0 },
        {
          frame: CARD2_FRAMES - 1,
          duration: 1.2,
          ease: "power1.inOut",
          snap: { frame: 1 },
          onUpdate: function() {
            const currentFrame = this.targets()[0].frame;
            setScrollProgress(currentFrame / (CARD2_FRAMES - 1));
            drawFrame2(currentFrame);
          }
        }
      );
    }
  };

  /* ── 1. Preload sequence frames ────────────────────────── */
  useEffect(() => {
    let cancelled = false;

    const loadSequence = (
      count: number,
      srcFn: (i: number) => string,
    ): Promise<HTMLImageElement[]> => {
      const imgs: HTMLImageElement[] = new Array(count);
      return Promise.all(
        Array.from({ length: count }, (_, i) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = srcFn(i);
            img.onload = () => { imgs[i] = img; resolve(); };
            img.onerror = () => { resolve(); };
          }),
        ),
      ).then(() => imgs);
    };

    Promise.all([
      loadSequence(CARD1_FRAMES, card1Src),
      loadSequence(CARD2_FRAMES, card2Src),
    ]).then(([seq1, seq2]) => {
      if (!cancelled) {
        images1Ref.current = seq1;
        images2Ref.current = seq2;
        setLoaded(true);
      }
    });

    return () => { cancelled = true; };
  }, []);

  /* ── 2. Optimized canvas frame drawers ─────────────────── */
  // Replaced continuous requestAnimationFrame drawing loops with direct GSAP scroll trigger hook rendering.

  /* ── 3. 3D Mouse Parallax Tilt (Concept 3 integration) ── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = cardContainerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize coordinates -1 to 1
    const xNorm = x / (rect.width / 2);
    const yNorm = y / (rect.height / 2);

    gsap.to(card, {
      rotateY: xNorm * 15,    // Max Y rotation 15deg
      rotateX: -yNorm * 15,   // Max X rotation 15deg
      x: xNorm * 10,          // Subtle horizontal float displacement
      y: yNorm * 10,          // Subtle vertical float displacement
      transformPerspective: 1000,
      ease: "power3.out",
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    const card = cardContainerRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      ease: "power3.out",
      duration: 0.8,
    });
  };

  /* ── 4. Main GSAP Timeline & ScrollTrigger ────────────── */
  useEffect(() => {
    if (!loaded) return;

    const section = sectionRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const canvas1 = canvas1Ref.current;
    const canvas2 = canvas2Ref.current;
    const content = contentRef.current;
    const leftColumn = leftColumnRef.current;
    if (!section || !card1 || !card2 || !canvas1 || !canvas2 || !content || !leftColumn) return;

    // Size canvases
    canvas1.width = CANVAS_W;
    canvas1.height = CANVAS_H;
    canvas2.width = CANVAS_W;
    canvas2.height = CANVAS_H;

    // Draw initial frames
    const ctx1 = canvas1.getContext("2d");
    const first1 = images1Ref.current[0];
    if (ctx1 && first1) {
      ctx1.drawImage(first1, 0, 0, CANVAS_W, CANVAS_H);
      lastDrawn1.current = 0;
    }

    const ctx2 = canvas2.getContext("2d");
    const first2 = images2Ref.current[0];
    if (ctx2 && first2) {
      ctx2.drawImage(first2, 0, 0, CANVAS_W, CANVAS_H);
      lastDrawn2.current = 0;
    }

    if (isMobile) {
      // Mobile setup: no pin, immediate reveal
      gsap.set(leftColumn, { yPercent: 0, opacity: 1 });
      gsap.set(content, { yPercent: 0, opacity: 1 });
      gsap.set(card1, { opacity: 1 });
      gsap.set(card2, { opacity: 0 });
      
      setActiveChapter(0);
      
      // Initial autoplay on mobile mount
      gsap.fromTo(frame1Tracker.current,
        { frame: 0 },
        {
          frame: CARD1_FRAMES - 1,
          duration: 1.5,
          ease: "power1.inOut",
          snap: { frame: 1 },
          onUpdate: () => {
            const currentFrame = frame1Tracker.current.frame;
            setScrollProgress(currentFrame / (CARD1_FRAMES - 1));
            drawFrame1(currentFrame);
          }
        }
      );

      return () => {
        // Cleanup mobile state
      };
    }

    // Initial states
    gsap.set(leftColumn, { yPercent: 40, opacity: 0 });
    gsap.set(content, { yPercent: 30, opacity: 0 });
    gsap.set(card1, { opacity: 0 });
    gsap.set(card2, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 0.8,
        fastScrollEnd: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          
          // Phase mapping state triggers
          if (p < 0.10) {
            setActiveChapter(-1);
          } else if (p >= 0.10 && p < 0.52) {
            setActiveChapter(0);
          } else {
            setActiveChapter(1);
          }
        }
      },
    });

    /* Timeline choreography
     * Phase 1: 0.00 → 0.15 - Left Column (Title + Visualizer) & Right Column (Telemetry) slide up & fade in
     * Phase 2: 0.12 → 0.18 - Card 1 fades in
     * Phase 3: 0.18 → 0.52 - Card 1 frame scrubs (185 frames)
     * Phase 4: 0.52 → 0.58 - Card 2 overlaps Card 1 with crossfade
     * Phase 5: 0.58 → 0.94 - Card 2 frame scrubs (125 frames)
     */

    // Phase 1: Slide up & Fade in split layout immediately
    tl.to(leftColumn, {
      yPercent: 0,
      opacity: 1,
      duration: 0.15,
      ease: "power3.out",
    }, 0);

    tl.to(content, {
      yPercent: 0,
      opacity: 1,
      duration: 0.15,
      ease: "power3.out",
    }, 0);

    // Phase 2: Card 1 reveals
    tl.to(card1, {
      opacity: 1,
      duration: 0.06,
      ease: "power2.out",
    }, 0.12);

    // Phase 3: Card 1 scrubs
    tl.to(frame1Tracker.current, {
      frame: CARD1_FRAMES - 1,
      duration: 0.34,
      ease: "none",
      snap: { frame: 1 },
      onUpdate: () => {
        drawFrame1(frame1Tracker.current.frame);
      }
    }, 0.18);

    // Phase 4: Card 2 transitions (crossfade overlay)
    tl.to(card2, {
      opacity: 1,
      duration: 0.06,
      ease: "power2.inOut",
    }, 0.52);

    // Phase 5: Card 2 scrubs
    tl.to(frame2Tracker.current, {
      frame: CARD2_FRAMES - 1,
      duration: 0.36,
      ease: "none",
      snap: { frame: 1 },
      onUpdate: () => {
        drawFrame2(frame2Tracker.current.frame);
      }
    }, 0.58);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === section)
        .forEach((st) => st.kill());
    };
  }, [loaded, drawFrame1, drawFrame2, isMobile]);

  /* ── 5. Shared card styling ────────────────────────────── */
  const cardStyle: React.CSSProperties = {
    borderRadius: "1.25rem",
    overflow: "hidden",
    boxShadow: [
      "0 8px 32px hsl(0 0% 0% / 0.5)",
      "0 0 0 1px hsl(0 0% 100% / 0.05) inset",
    ].join(", "),
  };

  const cardHighlight = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent 10%, hsl(0 0% 100% / 0.15) 50%, transparent 90%)",
      }}
    />
  );

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center pt-28 md:pt-36 pb-20 bg-transparent"
    >
      {/* Split Cybernetic Grid */}
      <div className="relative mx-auto grid min-h-[70vh] w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-16 lg:px-24 z-10">
        
        {/* Left Column: Title Group + Tilting Portal Visualizer (Title placed here to fill empty space) */}
        <div 
          ref={leftColumnRef}
          className="flex flex-col gap-6 w-full text-left max-w-md md:max-w-[360px] mx-auto md:mx-0"
        >
          {/* Futuristic case-matching title block (Outfit/Inter, WordReveal + MetallicText) */}
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/35 mb-2.5">
              01 // CAPTURE_SYSTEMS
            </p>
            <h2 className="text-3xl font-light tracking-tight text-white md:text-4xl leading-tight">
              <WordReveal text="Our" /> <MetallicText text="Services" className="text-3xl md:text-4xl mt-1 inline-block" />
            </h2>
          </div>

          {/* Mobile Tab Selector */}
          {isMobile && (
            <div className="flex gap-2 w-full select-none z-30">
              <button
                onClick={() => handleMobileChapterSelect(0)}
                className={`flex-1 py-2 px-3 text-center border font-mono text-[9px] tracking-wider transition-all duration-300 rounded-lg ${
                  activeChapter === 0
                    ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.2)] font-semibold"
                    : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                }`}
              >
                [ 01_MEDIA ]
              </button>
              <button
                onClick={() => handleMobileChapterSelect(1)}
                className={`flex-1 py-2 px-3 text-center border font-mono text-[9px] tracking-wider transition-all duration-300 rounded-lg ${
                  activeChapter === 1
                    ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.2)] font-semibold"
                    : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                }`}
              >
                [ 02_SYSTEMS ]
              </button>
            </div>
          )}

          {/* Tilting Portal Visualizer (Concept 3 tilt + Concept 1 scanline) */}
          <div
            ref={cardContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[1462/1900] sm:aspect-[4/3] md:aspect-[389/591] md:max-h-[50vh] flex items-center justify-center cursor-crosshair transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* Active vertical laser scanning sweep line (Concept 1) */}
            {activeChapter >= 0 && (
              <div 
                className="absolute left-0 w-full h-[1.5px] pointer-events-none z-20 bg-gradient-to-r from-transparent via-white/70 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                style={{
                  animation: "laserSweep 3.2s ease-in-out infinite",
                }}
              />
            )}
            <style>{`
              @keyframes laserSweep {
                0% { top: 0%; opacity: 0.1; }
                10% { opacity: 0.8; }
                90% { opacity: 0.8; }
                100% { top: 100%; opacity: 0.1; }
              }
            `}</style>

            {/* Inner frame containers */}
            <div
              ref={card1Ref}
              className="absolute inset-0 w-full h-full gpu-accelerate"
              style={{ ...cardStyle, zIndex: 1 }}
            >
              {cardHighlight}
              <canvas
                ref={canvas1Ref}
                className="block h-full w-full object-cover"
                style={{ borderRadius: "inherit" }}
              />
            </div>

            <div
              ref={card2Ref}
              className="absolute inset-0 w-full h-full gpu-accelerate"
              style={{ ...cardStyle, zIndex: 2 }}
            >
              {cardHighlight}
              <canvas
                ref={canvas2Ref}
                className="block h-full w-full object-cover"
                style={{ borderRadius: "inherit" }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry Reader panel */}
        <div 
          ref={contentRef}
          className="flex flex-col justify-center text-left text-white/90 min-h-[320px] md:min-h-0 w-full"
        >
          {activeChapter >= 0 ? (
            <BorderLaserCard 
              className="p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-md flex flex-col justify-between border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] h-full min-h-[300px] sm:min-h-[380px] md:min-h-[460px]"
              borderRadius={24}
              duration={8}
            >
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 md:pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 md:h-4.5 md:w-4.5 text-white/70 animate-pulse" />
                  <span className="text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-white/60 uppercase">
                    <MatrixDecrypt text="SECTOR_DIAGNOSTICS" trigger={activeChapter} />
                  </span>
                </div>
                <div className="text-[10px] md:text-[11px] font-mono text-white/40 tracking-wider">
                  NODE // {CHAPTERS[activeChapter].num}
                </div>
              </div>

              {/* Title & Tagline with matrix decoding */}
              <div className="my-4 md:my-6">
                <div className="text-[8px] md:text-[9px] font-mono font-bold tracking-[0.3em] text-white/45 mb-1 md:mb-1.5 uppercase">
                  <MatrixDecrypt text={CHAPTERS[activeChapter].tagline} trigger={activeChapter} speed={10} />
                </div>
                <h3 className="text-lg md:text-2xl font-light tracking-wide text-white leading-snug">
                  <MatrixDecrypt text={CHAPTERS[activeChapter].title} trigger={activeChapter} speed={15} />
                </h3>
              </div>

              {/* Technical description details */}
              <p className="text-[11px] md:text-[13px] text-white/60 leading-relaxed font-light mb-4 md:mb-6 border-l-2 border-white/10 pl-3 md:pl-4">
                {CHAPTERS[activeChapter].description}
              </p>

              {/* Grid of raw telemetry coordinates */}
              <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                {CHAPTERS[activeChapter].telemetry.map((t, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-lg p-2 md:p-3 font-mono">
                    <div className="text-[7px] md:text-[8px] text-white/40 tracking-wider mb-0.5 md:mb-1 uppercase">
                      {t.label}
                    </div>
                    <div className="text-[10px] md:text-[11px] text-white/80 font-medium truncate">
                      <MatrixDecrypt text={t.val} trigger={activeChapter} speed={25} delay={idx * 100} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Live telemetry logs terminal */}
              <TerminalLogs chapter={activeChapter} />

              {/* Timeline progress line */}
              <div className="mt-6 flex items-center justify-between gap-4 font-mono text-[9px] text-white/35">
                <span>00_PROG</span>
                <div className="h-[2px] flex-1 bg-white/5 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-white/45 shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all duration-300 ease-out" 
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
                <span>100_LOCK</span>
              </div>
            </BorderLaserCard>
          ) : (
            // Empty / Standby Command deck status
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-2xl min-h-[460px] text-center font-mono bg-black/30 backdrop-blur-sm">
              <Cpu className="h-8 w-8 text-white/20 mb-4 animate-pulse" />
              <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase mb-1">
                Awaiting Telemetry Feed
              </span>
              <span className="text-[9px] text-white/20">
                SCROLL DOWN TO ESTABLISH LINK
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
