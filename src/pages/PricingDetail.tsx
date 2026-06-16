import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { 
  ArrowLeft, 
  Check, 
  ChevronRight,
  Globe, 
  Zap, 
  Video, 
  Briefcase, 
  TrendingUp, 
  Database, 
  Sparkles, 
  Send, 
  BarChart3, 
  Sparkle,
  Cpu,
  Radio,
  Shield,
  Activity,
  Terminal,
  Play,
  Search,
  MessageSquare,
  BadgeDollarSign,
  PhoneCall,
  Info,
  Table
} from "lucide-react";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import { PRICING_SERVICES } from "@/data/pricingData";
import { PLANS, ADDONS, INTERACTION_COSTS } from "./Pricing";

// Helper map to translate service ID to Lucide Icon
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "web-dev": Globe,
  "automation": Zap,
  "filmmaking": Video,
  "consulting": Briefcase,
  "investment": TrendingUp,
  "ai-engineering": Database,
  "brand-design": Sparkles,
  "lead-gen": Send,
  "market-analysis": BarChart3
};

// ==========================================
// 1. WEB DEV SIMULATOR: LIGHTHOUSE OPTIMIZER
// ==========================================
function LighthouseSimulator() {
  const [gzip, setGzip] = useState(true);
  const [split, setSplit] = useState(true);
  const [routing, setRouting] = useState(true);
  const [css, setCss] = useState(false);
  const [score, setScore] = useState(45);
  const [animating, setAnimating] = useState(false);

  // Compute target score based on selections
  const targetScore = 45 + (gzip ? 12 : 0) + (split ? 14 : 0) + (routing ? 15 : 0) + (css ? 13 : 0);

  useEffect(() => {
    setAnimating(true);
    const interval = setInterval(() => {
      setScore(prev => {
        if (prev < targetScore) return Math.min(targetScore, prev + 2);
        if (prev > targetScore) return Math.max(targetScore, prev - 2);
        clearInterval(interval);
        setAnimating(false);
        return prev;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [targetScore]);

  return (
    <div className="mars-glass-card border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
        <Activity className="h-3.5 w-3.5 text-blue-400" />
        Lighthouse Performance Sandbox
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-white/5 transition">
            <input type="checkbox" checked={gzip} onChange={e => setGzip(e.target.checked)} className="accent-blue-500" />
            <div>
              <p className="text-xs font-medium text-white">Enable Gzip & WebP Compression</p>
              <p className="text-[10px] text-white/40">Decreases asset size by up to 70%</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-white/5 transition">
            <input type="checkbox" checked={split} onChange={e => setSplit(e.target.checked)} className="accent-blue-500" />
            <div>
              <p className="text-xs font-medium text-white">Code Splitting & Lazy Loading</p>
              <p className="text-[10px] text-white/40">Loads Javascript dynamically on request</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-white/5 transition">
            <input type="checkbox" checked={routing} onChange={e => setRouting(e.target.checked)} className="accent-blue-500" />
            <div>
              <p className="text-xs font-medium text-white">Next-Gen Edge Network Routing</p>
              <p className="text-[10px] text-white/40">Resolves assets closer to client geography</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-white/5 transition">
            <input type="checkbox" checked={css} onChange={e => setCss(e.target.checked)} className="accent-blue-500" />
            <div>
              <p className="text-xs font-medium text-white">Inline Critical CSS Path</p>
              <p className="text-[10px] text-white/40">Removes render-blocking style imports</p>
            </div>
          </label>
        </div>

        {/* Speed Dial Gauge */}
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative flex items-center justify-center h-32 w-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke={score >= 90 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444"} 
                strokeWidth="6" 
                fill="transparent" 
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-3xl font-mono font-bold tracking-tighter ${score >= 90 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-red-500"}`}>
                {score}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase mt-0.5">Performance</span>
            </div>
          </div>
          <p className="text-[10px] font-mono text-white/40 mt-4">
            Simulated Load Speed: <span className="text-white">{(Math.max(0.18, 4.2 - (score - 45) * 0.08)).toFixed(2)}s</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. AUTOMATION: WORKFLOW AUTOMATION BUILDER
// ==========================================
function WorkflowBuilderSimulator() {
  const [status, setStatus] = useState<"IDLE" | "TRIGGER" | "AGENT" | "DATABASE" | "DONE">("IDLE");
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startWorkflow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStatus("TRIGGER");
    setLogs(["[17:49:01] Hook event caught: Razorpay Invoice Webhook Received."]);
    
    let step = 0;
    intervalRef.current = setInterval(() => {
      step++;
      if (step === 1) {
        setStatus("AGENT");
        setLogs(prev => [...prev, "[17:49:02] Querying Abdul Accountant instance. Processing voice ledger transcripts..."]);
      } else if (step === 2) {
        setStatus("DATABASE");
        setLogs(prev => [...prev, "[17:49:03] Reconciling ledger with Supabase Row-Level Security isolation check: PASS."]);
      } else if (step === 3) {
        setStatus("DONE");
        setLogs(prev => [...prev, "[17:49:04] Transaction success synced with Tally XML API bridge. Workflow Finished! ✅"]);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="mars-glass-card border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
        <Cpu className="h-3.5 w-3.5 text-emerald-400" />
        n8n Workflow Execution Sandbox
      </h4>

      {/* Nodes visualizer */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 py-4 border-b border-white/5 mb-4">
        {/* Node 1 */}
        <div className={`px-3 py-1.5 md:px-4 md:py-2 border rounded-xl font-mono text-[9px] md:text-[10px] transition duration-300 ${status === "TRIGGER" ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-white/5 border-white/10 text-white/60"}`}>
          ⚡ WEBHOOK_TRIGGER
        </div>
        <div className="text-white/20 transform rotate-90 md:rotate-0">➔</div>
        
        {/* Node 2 */}
        <div className={`px-3 py-1.5 md:px-4 md:py-2 border rounded-xl font-mono text-[9px] md:text-[10px] transition duration-300 ${status === "AGENT" ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-white/5 border-white/10 text-white/60"}`}>
          🤖 ABDUL_ACCOUNTING
        </div>
        <div className="text-white/20 transform rotate-90 md:rotate-0">➔</div>

        {/* Node 3 */}
        <div className={`px-3 py-1.5 md:px-4 md:py-2 border rounded-xl font-mono text-[9px] md:text-[10px] transition duration-300 ${status === "DATABASE" ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-white/5 border-white/10 text-white/60"}`}>
          🗄️ SUPABASE_SYNC
        </div>
      </div>

      {/* Execution Logs */}
      <div className="bg-black/50 border border-white/5 rounded-lg p-3 h-32 overflow-y-auto font-mono text-[10px] text-white/70 space-y-1 mb-4">
        {logs.length === 0 ? (
          <p className="text-white/30 italic">Click Run to trigger simulated webhook workflow</p>
        ) : (
          logs.map((log, idx) => <div key={idx}>{log}</div>)
        )}
      </div>

      <button
        onClick={startWorkflow}
        disabled={status !== "IDLE" && status !== "DONE"}
        className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-xs font-mono tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
      >
        <Play className="h-3.5 w-3.5 fill-black" />
        RUN LIVE PIPELINE TEST
      </button>
    </div>
  );
}

// ==========================================
// 3. AI FILM: STORYBOARD RENDERER
// ==========================================
function FilmDirectorSimulator() {
  const [genre, setGenre] = useState("CYBERPUNK");
  const [tone, setTone] = useState("DRAMATIC");
  const [frame, setFrame] = useState(0);
  const [rendering, setRendering] = useState(false);

  const renderStoryboard = () => {
    setRendering(true);
    setFrame(1);
    
    setTimeout(() => {
      setFrame(2);
      setTimeout(() => {
        setFrame(3);
        setRendering(false);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="mars-glass-card border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
        <Video className="h-3.5 w-3.5 text-purple-400" />
        Generative VFX Storyboard Sandbox
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-[10px] font-mono text-white/30 uppercase block mb-1">Select Genre</label>
          <select 
            value={genre} 
            onChange={e => setGenre(e.target.value)} 
            disabled={rendering}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
          >
            <option value="CYBERPUNK">Cyberpunk Corporate</option>
            <option value="MINIMALIST">Minimalist Product</option>
            <option value="SCI-FI">Hard Sci-Fi Explainer</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-mono text-white/30 uppercase block mb-1">Voice Narration</label>
          <select 
            value={tone} 
            onChange={e => setTone(e.target.value)} 
            disabled={rendering}
            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
          >
            <option value="DRAMATIC">Gritty / Deep Voice</option>
            <option value="ASSISTANT">Sleek AI Agent</option>
            <option value="ENERGETIC">Hype Retromodern</option>
          </select>
        </div>
        <div className="flex items-end">
          <button 
            onClick={renderStoryboard}
            disabled={rendering}
            className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs rounded transition cursor-pointer disabled:opacity-50"
          >
            {rendering ? "GENERATING..." : "GENERATE SCENE"}
          </button>
        </div>
      </div>

      {/* Frame Preview container */}
      <div className="aspect-video bg-black/60 border border-white/15 rounded-xl flex items-center justify-center relative overflow-hidden">
        {frame === 0 && (
          <div className="text-center p-4">
            <Radio className="h-8 w-8 text-white/20 mx-auto mb-2 animate-pulse" />
            <p className="text-xs text-white/40 font-mono">Render system awaiting genre selection triggers...</p>
          </div>
        )}

        {frame === 1 && (
          <div className="text-center p-4 animate-pulse">
            <p className="text-xs font-mono text-purple-400">Step 1: Outlining visual narrative prompts...</p>
            <p className="text-[10px] text-white/40 mt-1">Generating scene composition for {genre} style</p>
          </div>
        )}

        {frame === 2 && (
          <div className="text-center p-4 animate-pulse">
            <p className="text-xs font-mono text-purple-400">Step 2: Synthesizing casting and synthetic narration...</p>
            <p className="text-[10px] text-white/40 mt-1">Applying speech voiceovers ({tone} preset active)</p>
          </div>
        )}

        {frame === 3 && (
          <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="self-end px-2 py-0.5 bg-purple-500 text-black text-[8px] font-mono uppercase tracking-widest font-bold">
              FRAME_03 // VFX_PASS_OK
            </div>
            <div>
              <p className="text-xs font-mono text-white/90">
                {genre === "CYBERPUNK" && "Scene: A sleek metallic laptop floating against dynamic digital gridlines."}
                {genre === "MINIMALIST" && "Scene: High-key studio light sweeping over organic product design structures."}
                {genre === "SCI-FI" && "Scene: Neon energy vectors pulsing along secure quantum database nodes."}
              </p>
              <p className="text-[9px] font-mono text-purple-400 mt-1.5 italic">
                {tone === "DRAMATIC" && 'V.O: "In a world of data, intelligence becomes the only leverage..."'}
                {tone === "ASSISTANT" && 'V.O: "Database connection initialized. Let us sync your accounting workflows."'}
                {tone === "ENERGETIC" && 'V.O: "Speed. Automation. Infinite scale. Welcome to the MARS framework!"'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. CONSULTING: COMPETITOR DIAGNOSTIC AUDIT
// ==========================================
function DiagnosticAuditsSimulator() {
  const [industry, setIndustry] = useState("Real Estate");
  const [compName, setCompName] = useState("");
  const [status, setStatus] = useState<"IDLE" | "SCANNING" | "RESULTS">("IDLE");
  const [progress, setProgress] = useState(0);

  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName) return;
    setStatus("SCANNING");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("RESULTS");
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="mars-glass-card border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
        <Briefcase className="h-3.5 w-3.5 text-amber-400" />
        Competitor Diagnostic Scanner
      </h4>

      {status === "IDLE" && (
        <form onSubmit={runAudit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-white/30 uppercase block mb-1">Company / Brand Name</label>
              <input 
                type="text" 
                placeholder="e.g. Acme Properties" 
                value={compName}
                required
                onChange={e => setCompName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/30 uppercase block mb-1">Industry Vertical</label>
              <select 
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-white"
              >
                <option value="Real Estate">Real Estate</option>
                <option value="Clinics">Healthcare Clinics</option>
                <option value="Gyms">Fitness & Gym Networks</option>
                <option value="E-Commerce">Direct Storefronts</option>
              </select>
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs font-mono tracking-wider rounded transition cursor-pointer"
          >
            RUN COMPETITOR AUDIT DIAGNOSTIC
          </button>
        </form>
      )}

      {status === "SCANNING" && (
        <div className="flex flex-col items-center justify-center py-6">
          <Activity className="h-10 w-10 text-amber-400 animate-spin mb-4" />
          <p className="text-xs font-mono text-white/80">Scanning competitor registry channels... {progress}%</p>
          <div className="w-full max-w-xs bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {status === "RESULTS" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs font-mono font-medium text-white">{compName} Audit Results ({industry})</span>
            <button 
              onClick={() => setStatus("IDLE")} 
              className="text-[9px] font-mono uppercase text-amber-400 hover:underline"
            >
              Reset Scanner
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-white/5 border border-white/5 p-3 rounded-lg">
              <p className="text-[9px] text-white/40 uppercase">Mobile Load Speed</p>
              <p className="text-red-400 font-semibold mt-1">32/100 (FAIL)</p>
              <p className="text-[9px] text-white/30 mt-0.5">High friction bounce rates</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-3 rounded-lg">
              <p className="text-[9px] text-white/40 uppercase">Outbound Lead Funnels</p>
              <p className="text-red-400 font-semibold mt-1">Manual Follow-ups</p>
              <p className="text-[9px] text-white/30 mt-0.5">No active auto-calling agents</p>
            </div>
            <div className="bg-white/5 border border-white/5 p-3 rounded-lg col-span-2">
              <p className="text-[9px] text-white/40 uppercase">MARS Strategic recommendation</p>
              <p className="text-white font-medium mt-1 leading-normal text-[11px]">
                Deploy an automated Landing page with Lighthouse speed checks + Abdul intern lead routing to shave off 84+ manual admin hours/month.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. INVESTMENT: ARR VALUATION MULTIPLIER
// ==========================================
function ValuationRunwaySimulator() {
  const [arr, setArr] = useState(2400000); // Annual Recurring Revenue (ARR)
  const [margin, setMargin] = useState(70);  // Gross profit margin

  // Multiplier logic
  const multiplier = margin >= 80 ? 7.5 : margin >= 60 ? 5.8 : 4.0;
  const valuation = arr * multiplier;

  return (
    <div className="mars-glass-card border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
        <TrendingUp className="h-3.5 w-3.5 text-rose-400" />
        Venture Capital Valuation Sandbox
      </h4>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-white/60">Annual Recurring Revenue (ARR)</span>
            <span className="text-white font-semibold">₹{arr.toLocaleString("en-IN")}</span>
          </div>
          <input 
            type="range" 
            min="500000" 
            max="15000000" 
            step="500000" 
            value={arr} 
            onChange={e => setArr(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-ew-resize"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-white/60">Gross Profit Margin (%)</span>
            <span className="text-white font-semibold">{margin}%</span>
          </div>
          <input 
            type="range" 
            min="20" 
            max="95" 
            step="5" 
            value={margin} 
            onChange={e => setMargin(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-ew-resize"
          />
        </div>

        <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
          <div>
            <span className="text-[10px] text-white/40 uppercase block">Calculated Multiplier</span>
            <span className="text-white font-semibold text-sm">{multiplier}x ARR</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-white/40 uppercase block">Strategic Valuation</span>
            <span className="text-rose-400 font-bold text-base">₹{valuation.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. CUSTOM AI ENGINEERING: PRIVATE RAG CHAT
// ==========================================
function RAGQuerySimulator() {
  const [activeTab, setActiveTab] = useState<"PUBLIC" | "RAG">("RAG");
  const [chatLog, setChatLog] = useState<Array<{ sender: "user" | "bot", text: string }>>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText || loading) return;

    const query = inputText;
    setInputText("");
    setChatLog(prev => [...prev, { sender: "user", text: query }]);
    setLoading(true);

    setTimeout(() => {
      if (activeTab === "PUBLIC") {
        setChatLog(prev => [
          ...prev, 
          { 
            sender: "bot", 
            text: "I cannot search your private company data or internal spreadsheet files. Please upload the data or context explicitly for analysis." 
          }
        ]);
      } else {
        setChatLog(prev => [
          ...prev, 
          { 
            sender: "bot", 
            text: `[Database Index query_ok: Doc-012] Syncing verified company guidelines. Response: According to our internal documentation, the refund threshold is set to ₹20,000 max. Transactions reconciled. 🔒 Secured.` 
          }
        ]);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mars-glass-card border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
        <Database className="h-3.5 w-3.5 text-violet-400" />
        Vector Database RAG Sandbox
      </h4>
      
      {/* Selector Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => { setActiveTab("PUBLIC"); setChatLog([]); }}
          className={`py-1.5 font-mono text-[10px] tracking-wider transition ${activeTab === "PUBLIC" ? "bg-white text-black font-semibold" : "bg-white/5 text-white/60 border border-white/5"}`}
        >
          PUBLIC MODEL (GPT-4)
        </button>
        <button
          onClick={() => { setActiveTab("RAG"); setChatLog([]); }}
          className={`py-1.5 font-mono text-[10px] tracking-wider transition ${activeTab === "RAG" ? "bg-white text-black font-semibold" : "bg-white/5 text-white/60 border border-white/5"}`}
        >
          MARS SECURE RAG INDEX
        </button>
      </div>

      {/* Chat window */}
      <div className="bg-black/60 border border-white/5 rounded-xl p-3 h-32 overflow-y-auto space-y-2 mb-3 flex flex-col justify-end">
        {chatLog.length === 0 ? (
          <div className="text-center text-[10px] text-white/30 font-mono italic my-auto">
            Ask a private question like: "what is our company Q4 refund limit?"
          </div>
        ) : (
          chatLog.map((c, i) => (
            <div key={i} className={`flex ${c.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded px-2.5 py-1.5 text-[10px] font-mono ${c.sender === "user" ? "bg-white/10 text-white" : activeTab === "RAG" ? "bg-violet-500/10 border border-violet-500/20 text-violet-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                {c.text}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="text-[10px] font-mono text-white/40 animate-pulse">Scanning vector index embeddings...</div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input 
          type="text" 
          placeholder="Type question here..." 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:border-violet-500 outline-none font-mono"
        />
        <button 
          type="submit" 
          className="px-4 bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs rounded transition"
        >
          SEND
        </button>
      </form>
    </div>
  );
}

// ==========================================
// 7. BRAND DESIGN: BRAND PALETTE STYLE SWAPPER
// ==========================================
function BrandStyleSwapper() {
  const [theme, setTheme] = useState<"LUXURY" | "CYBER" | "NEO">("LUXURY");

  return (
    <div className="mars-glass-card border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
        Brand visual identity board
      </h4>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {(["LUXURY", "CYBER", "NEO"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`py-1.5 font-mono text-[9px] tracking-wider transition ${theme === t ? "bg-white text-black font-bold" : "bg-white/5 text-white/50 border border-white/5"}`}
          >
            {t === "LUXURY" && "MINIMAL GOLD"}
            {t === "CYBER" && "CYBERPUNK HSL"}
            {t === "NEO" && "NEO-BRUTALIST"}
          </button>
        ))}
      </div>

      {/* Styled Mockup visual card */}
      <div className={`aspect-video rounded-xl border p-4 flex flex-col justify-between transition-all duration-500 ${
        theme === "LUXURY" 
          ? "bg-[hsl(45_20%_6%)] border-[hsl(45_40%_30%)] shadow-[0_0_15px_rgba(212,175,55,0.05)]" 
          : theme === "CYBER"
          ? "bg-slate-950 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          : "bg-orange-50 border-black shadow-[4px_4px_0px_#000]"
      }`}>
        <div className="flex justify-between items-start">
          <span className={`text-[10px] font-bold tracking-widest font-mono uppercase transition-colors ${
            theme === "LUXURY" ? "text-[hsl(45_80%_60%)]" : theme === "CYBER" ? "text-cyan-400" : "text-black"
          }`}>
            MARS CORP
          </span>
          <div className="flex gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${theme === "LUXURY" ? "bg-[hsl(45_80%_60%)]" : theme === "CYBER" ? "bg-cyan-400" : "bg-orange-500"}`} />
            <span className={`h-2.5 w-2.5 rounded-full ${theme === "LUXURY" ? "bg-white/30" : theme === "CYBER" ? "bg-pink-500" : "bg-blue-600"}`} />
          </div>
        </div>
        
        <div>
          <h5 className={`text-base font-bold font-mono tracking-tight leading-tight ${theme === "NEO" ? "text-black" : "text-white"}`}>
            Automated Identity
          </h5>
          <p className={`text-[9px] mt-1 font-mono leading-relaxed ${theme === "NEO" ? "text-black/60" : "text-white/40"}`}>
            Unified design tokens synced dynamically from Figma tokens. Ready for cross-platform deployments.
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. AI LEAD GEN: CALL DIALER SIMULATOR
// ==========================================
function VoiceDialerSimulator() {
  const [activeCall, setActiveCall] = useState(false);
  const [step, setStep] = useState(0);
  const [bubbles, setBubbles] = useState<Array<{ sender: "AI" | "CLIENT", text: string }>>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const script = [
    { sender: "AI", text: "Hey! Am I speaking with Rohan?" },
    { sender: "CLIENT", text: "Yeah, who's this?" },
    { sender: "AI", text: "Hey Rohan, this is Abdul calling from Gold Gym Kolkata. I noticed you haven't booked any workout sessions since last month." },
    { sender: "CLIENT", text: "Yeah, actually I've been extremely busy with office work." },
    { sender: "AI", text: "Totally understand Rohan, work schedules can be hectic. If I can find a quick 4:00 PM weekend slot this Saturday for you, would you want me to lock it?" },
    { sender: "CLIENT", text: "Actually yeah, Saturday 4:00 PM works perfectly." },
    { sender: "AI", text: "Perfect! Done, I've booked it and sent you the calendar link on WhatsApp. Have a great workout on Saturday! Bye." }
  ] as const;

  const triggerCall = () => {
    setActiveCall(true);
    setStep(0);
    setBubbles([{ sender: "AI", text: "Calling..." }]);
    
    let currentStep = 0;
    const runNextBubble = () => {
      if (currentStep < script.length) {
        setBubbles(prev => {
          // Remove calling indicator on first true line
          const filtered = prev.filter(b => b.text !== "Calling...");
          return [...filtered, script[currentStep]];
        });
        currentStep++;
        setStep(currentStep);
        timerRef.current = setTimeout(runNextBubble, 2000);
      } else {
        setActiveCall(false);
      }
    };

    timerRef.current = setTimeout(runNextBubble, 1500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="mars-glass-card border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
        <Send className="h-3.5 w-3.5 text-cyan-400" />
        AI Calling Agent Dialer Sandbox
      </h4>
      
      {/* Visual screen */}
      <div className="bg-black/70 border border-white/5 rounded-xl p-3 h-36 overflow-y-auto space-y-2 mb-3 flex flex-col justify-end">
        {bubbles.length === 0 ? (
          <div className="text-center text-[10px] text-white/30 font-mono italic my-auto">
            Click trigger to start simulated voice outreach campaign
          </div>
        ) : (
          bubbles.map((b, i) => (
            <div key={i} className={`flex ${b.sender === "AI" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] rounded px-2.5 py-1 text-[9px] font-mono leading-relaxed ${
                b.text === "Calling..." 
                  ? "text-white/40 animate-pulse" 
                  : b.sender === "AI" 
                  ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" 
                  : "bg-white/10 text-white"
              }`}>
                <span className="font-bold block text-[7px] uppercase tracking-wider opacity-60 mb-0.5">{b.sender}</span>
                {b.text}
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={triggerCall}
        disabled={activeCall}
        className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg text-xs font-mono tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
      >
        <PhoneCall className="h-3.5 w-3.5 fill-black" />
        {activeCall ? "CALL IN PROGRESS..." : "SIMULATE AI OUTBOUND CALL"}
      </button>
    </div>
  );
}

// ==========================================
// 9. DATA INTEL: LOCAL REGISTER SCRAPER
// ==========================================
function LeadScraperSimulator() {
  const [niche, setNiche] = useState("Dental Clinics");
  const [city, setCity] = useState("Kolkata");
  const [scraping, setScraping] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [leads, setLeads] = useState<Array<{ name: string, phone: string, status: string }>>([]);

  const startScraping = () => {
    setScraping(true);
    setLogs(["[0.2s] Searching registry databases..."]);
    setLeads([]);

    setTimeout(() => {
      setLogs(prev => [...prev, `[0.8s] Scraped 3 localized channels matching ${niche} in ${city}.`]);
      setTimeout(() => {
        setLogs(prev => [...prev, "[1.4s] Initializing carrier HLR verify + SMTP pings..."]);
        setTimeout(() => {
          setLeads([
            { name: "Dr. Roy's Care Clinic", phone: "+91 98300 12345", status: "VERIFIED [HLR OK]" },
            { name: "Apex Dental Ortho Center", phone: "+91 98311 67890", status: "VERIFIED [HLR OK]" },
            { name: "City Dental Chambers", phone: "+91 98322 11223", status: "VERIFIED [HLR OK]" }
          ]);
          setScraping(false);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  return (
    <div className="mars-glass-card border border-white/5 rounded-2xl p-5 bg-white/[0.01]">
      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
        <BarChart3 className="h-3.5 w-3.5 text-teal-400" />
        Data Intelligence Directory Scraper Sandbox
      </h4>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <input 
          type="text" 
          placeholder="Niche (e.g. Clinics)" 
          value={niche} 
          disabled={scraping}
          onChange={e => setNiche(e.target.value)}
          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono"
        />
        <input 
          type="text" 
          placeholder="City (e.g. Kolkata)" 
          value={city} 
          disabled={scraping}
          onChange={e => setCity(e.target.value)}
          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono"
        />
      </div>

      <button 
        onClick={startScraping}
        disabled={scraping}
        className="w-full py-1.5 bg-teal-500 hover:bg-teal-400 text-black font-semibold font-mono text-xs rounded transition mb-3 cursor-pointer disabled:opacity-50"
      >
        {scraping ? "SCRAPING & VERIFYING..." : "RUN INTEL SCRAPER"}
      </button>

      {/* Output Console Log */}
      <div className="bg-black/50 border border-white/5 rounded-lg p-2.5 h-24 overflow-y-auto font-mono text-[9px] text-white/60 space-y-1">
        {logs.map((l, i) => <div key={i}>{l}</div>)}
        {!scraping && leads.length > 0 && (
          <div className="mt-2 pt-2 border-t border-white/5 space-y-1.5">
            <span className="text-[8px] uppercase tracking-widest text-teal-400 block font-bold">Scrape Outputs:</span>
            {leads.map((lead, idx) => (
              <div key={idx} className="flex justify-between items-center text-white/80">
                <span>{lead.name}</span>
                <span className="text-emerald-400 font-bold">{lead.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Router switcher to dynamically render the correct simulator sandbox component
function renderSandbox(serviceId: string) {
  switch(serviceId) {
    case "web-dev": return <LighthouseSimulator />;
    case "automation": return <WorkflowBuilderSimulator />;
    case "filmmaking": return <FilmDirectorSimulator />;
    case "consulting": return <DiagnosticAuditsSimulator />;
    case "investment": return <ValuationRunwaySimulator />;
    case "ai-engineering": return <RAGQuerySimulator />;
    case "brand-design": return <BrandStyleSwapper />;
    case "lead-gen": return <VoiceDialerSimulator />;
    case "market-analysis": return <LeadScraperSimulator />;
    default: return <LighthouseSimulator />;
  }
}

// ==========================================
// MAIN COMPONENT: PricingDetail
// ==========================================
export default function PricingDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const currentService = PRICING_SERVICES.find(s => s.id === serviceId);

  const [isMobile, setIsMobile] = useState(false);
  const [activePlan, setActivePlan] = useState(0);
  const [activeAddon, setActiveAddon] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (currentService) {
      setSelectedIndices(currentService.subServices.map((_, idx) => idx));
    } else {
      setSelectedIndices([]);
    }
  }, [serviceId, currentService]);

  const toggleIndex = (idx: number) => {
    setSelectedIndices(prev => 
      prev.includes(idx) 
        ? prev.filter(i => i !== idx) 
        : [...prev, idx]
    );
  };

  const allSelected = currentService && selectedIndices.length === currentService.subServices.length;
  const subtotal = currentService 
    ? selectedIndices.reduce((sum, idx) => sum + currentService.subServices[idx].price, 0)
    : 0;
  
  const finalPrice = allSelected && currentService
    ? currentService.bundlePrice 
    : subtotal;

  const handlePlanScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.min(3, Math.max(0, Math.round(container.scrollLeft / (container.scrollWidth / 4))));
    setActivePlan(index);
  };

  const handleAddonScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.min(1, Math.max(0, Math.round(container.scrollLeft / (container.scrollWidth / 2))));
    setActiveAddon(index);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!currentService) {
    return (
      <div className="relative isolate min-h-screen bg-[hsl(210_24%_5%)] text-foreground flex flex-col justify-between">
        <Navbar />
        <main className="relative z-10 flex flex-col items-center justify-center flex-1 py-32 px-6">
          <h2 className="text-xl font-mono text-white/50">SERVICE_NOT_FOUND</h2>
          <Link to="/pricing" className="mt-4 text-xs font-mono text-emerald-400 hover:underline">
            ← Return to Directory
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-36 md:pt-44 pb-44 md:pb-32 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/pricing")}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 group transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-mono uppercase tracking-widest">Back to Directory</span>
          </button>

          {/* Header info */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/70 w-fit mb-4">
              <Sparkle className="h-3 w-3 text-white/80 animate-pulse" />
              Service Configurator
            </div>
            <h1 className="text-balance text-4xl font-light tracking-tight md:text-5xl text-white flex flex-wrap gap-2 items-baseline">
              <span>{currentService.name}</span>
              <span className="text-xs px-2.5 py-1 font-mono rounded bg-white/5 border border-white/10 text-white/40 tracking-wider">
                {currentService.id.toUpperCase()}_SYSTEM
              </span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-2xl">
              {currentService.tagline}
            </p>
          </div>

          {/* Interactive Sandbox Simulator Container */}
          <div className="mb-12 max-w-4xl">
            {renderSandbox(currentService.id)}
          </div>

          {/* Two Column Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
            {/* Left Column: Sub-Services Checklist */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Select Service Modules</h3>
              {currentService.subServices.map((sub, idx) => {
                const isSelected = selectedIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIndex(idx)}
                    className={`group relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-white/[0.03] border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.01)]"
                        : "bg-white/[0.005] border-white/5 hover:bg-white/[0.01] hover:border-white/10"
                    }`}
                  >
                    <div className="pt-0.5">
                      <div className={`h-5 w-5 rounded flex items-center justify-center border transition-all duration-300 ${
                        isSelected 
                          ? "bg-white border-white text-black" 
                          : "border-white/20 group-hover:border-white/45"
                      }`}>
                        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline gap-4">
                        <h4 className={`font-medium text-sm transition-colors duration-300 ${isSelected ? "text-white" : "text-white/60"}`}>
                          {sub.name}
                        </h4>
                        <span className={`font-mono text-xs font-semibold transition-colors duration-300 ${isSelected ? "text-emerald-400" : "text-white/30"}`}>
                          +₹{sub.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 transition-colors duration-300 ${isSelected ? "text-white/40" : "text-white/20"}`}>
                        {sub.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Live Price Summary */}
            <div className="lg:col-span-5">
              <div className={`mars-glass-card rounded-[24px] p-6 border transition-all duration-500 relative overflow-hidden bg-black/60 shadow-2xl backdrop-blur-2xl ${
                allSelected ? "border-emerald-500/35 shadow-emerald-500/5" : "border-white/5"
              }`}>
                {/* Glow animations for bundle discount */}
                {allSelected && (
                  <div className="absolute -inset-px rounded-[24px] bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-30 blur-md pointer-events-none animate-pulse" />
                )}
                
                <div className="relative z-10">
                  <h3 className="text-white font-medium text-xs mb-4 border-b border-white/5 pb-3 font-mono tracking-widest text-white/50">
                    BUILD_ESTIMATE
                  </h3>
                  
                  {/* Selected items list */}
                  <div className="space-y-3 mb-6">
                    {selectedIndices.length === 0 ? (
                      <p className="text-xs text-white/30 italic">No modules selected.</p>
                    ) : (
                      selectedIndices.map(idx => (
                        <div key={idx} className="flex justify-between items-center text-xs text-white/60">
                          <span className="truncate pr-4">{currentService.subServices[idx].name}</span>
                          <span className="font-mono text-white/80 shrink-0">₹{currentService.subServices[idx].price.toLocaleString("en-IN")}</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pricing breakdown */}
                  <div className="border-t border-white/5 pt-4 space-y-3 mb-6">
                    {allSelected ? (
                      <>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-white/40 font-mono">Subtotal (A-la-carte)</span>
                          <span className="text-xs text-white/40 line-through font-mono">
                            ₹{currentService.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline text-emerald-400">
                          <span className="text-xs font-medium font-mono">Bundle Discount</span>
                          <span className="text-xs font-mono font-medium">
                            -₹{currentService.savings.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-white/40 font-mono">Subtotal</span>
                        <span className="text-xs font-mono text-white/60">
                          ₹{subtotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-baseline pt-3 border-t border-white/5">
                      <span className="text-xs uppercase tracking-wider font-mono text-white/50 font-semibold">Estimated Cost</span>
                      <div className="text-right">
                        {allSelected && (
                          <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5 font-mono">
                            {currentService.bundleName}
                          </div>
                        )}
                        <span className={`text-2xl font-bold font-mono transition-all duration-300 ${
                          allSelected ? "text-emerald-400" : "text-white"
                        }`} style={allSelected ? { textShadow: "0 0 12px rgba(52, 211, 153, 0.25)" } : {}}>
                          ₹{finalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="space-y-3">
                    {allSelected ? (
                      <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3.5 mb-4 text-center">
                        <p className="text-[10px] text-emerald-400 leading-normal font-mono">
                          🎉 Bundle discount unlocked! You save ₹{currentService.savings.toLocaleString("en-IN")} and get full-stack integration.
                        </p>
                      </div>
                    ) : (
                      currentService && selectedIndices.length < currentService.subServices.length && (
                        <button
                          onClick={() => setSelectedIndices(currentService.subServices.map((_, idx) => idx))}
                          className="w-full py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-semibold font-mono tracking-wider transition cursor-pointer"
                        >
                          Add all to save ₹{currentService.savings.toLocaleString("en-IN")}
                        </button>
                      )
                    )}

                    <Link
                      to={`/onboarding?service=${currentService.id}&package=${allSelected ? "bundle" : "custom"}`}
                      className="w-full py-3 bg-white text-black hover:scale-[1.02] active:scale-[0.98] rounded-xl text-xs font-semibold transition flex items-center justify-center font-mono tracking-wider"
                    >
                      Hire MARS for this Build
                    </Link>
                  </div>

                  {/* Pitch text */}
                  <p className="text-[10px] text-white/40 mt-4 leading-relaxed text-center font-sans">
                    {currentService.salesPitch}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Employees Inclusion for automation vertical */}
          {currentService.id === "automation" && (
            <div className="border-t border-white/5 pt-16 mt-16">
              <div className="mx-auto max-w-3xl text-center mb-16">
                <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
                  Fair Allocation
                </p>
                <h3 className="text-balance text-3xl font-light tracking-tight md:text-5xl text-white flex flex-col items-center">
                  <WordReveal text="AI Employees." />
                  <MetallicText text="Real Salaries" className="text-3xl md:text-5xl mt-2" />
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
                  We position our software as &ldquo;hiring an AI employee and paying its salary.&rdquo; Compare a ₹2,999 Pro salary to a ₹15,000 human bookkeeping role.
                </p>
              </div>

              {/* Pricing Tiers Grid */}
              {isMobile ? (
                <div className="w-full overflow-hidden py-4 select-none mb-20">
                  <style dangerouslySetInnerHTML={{__html: `
                    .no-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                  `}} />
                  <div 
                    onScroll={handlePlanScroll}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <div className="w-[4vw] shrink-0 pointer-events-none" />
                    {PLANS.map((plan, index) => (
                      <div key={index} className="w-[82vw] shrink-0 snap-center">
                        <BorderLaserCard
                          key={index}
                          className={`p-5 sm:p-6 flex flex-col justify-between h-full relative ${
                            plan.isPopular ? "shadow-emerald-500/5 shadow-xl" : ""
                          }`}
                          borderRadius={0}
                        >
                          {plan.isPopular && (
                            <span className="absolute -top-3 right-6 bg-emerald-500 text-black text-[9px] uppercase tracking-widest font-semibold px-3 py-1 rounded-none z-20">
                              Beachhead Choice
                            </span>
                          )}
                          <div>
                            <h4 className="text-white font-medium text-lg mb-2">{plan.name}</h4>
                            <div className="flex items-baseline gap-1 mb-2">
                              <span className="text-2xl font-semibold text-white">{plan.price}</span>
                              <span className="text-xs text-white/40">{plan.period}</span>
                            </div>
                            <p className="text-[10px] font-semibold text-emerald-400/90 tracking-wide uppercase mb-4">{plan.credits}</p>
                            <p className="text-xs text-white/50 leading-relaxed mb-6 border-b border-white/5 pb-4">{plan.description}</p>

                            {/* Features */}
                            <div className="space-y-2 mb-6">
                              {plan.features.map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2 text-xs text-white/70">
                                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </div>
                              ))}
                              {plan.paywalled && plan.paywalled.map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2 text-xs text-white/30 line-through">
                                  <span className="h-1.5 w-1.5 rounded-full bg-white/20 shrink-0 mt-1.5" />
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {plan.href.startsWith("http") ? (
                            <a
                              href={plan.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-full py-2.5 rounded-none text-xs font-semibold transition z-20 relative flex items-center justify-center ${
                                plan.isPopular
                                  ? "bg-white text-black hover:scale-[1.02]"
                                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                              }`}
                            >
                              {plan.cta}
                            </a>
                          ) : (
                            <Link
                              to={plan.href}
                              className={`w-full py-2.5 rounded-none text-xs font-semibold transition z-20 relative flex items-center justify-center ${
                                plan.isPopular
                                  ? "bg-white text-black hover:scale-[1.02]"
                                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                              }`}
                            >
                              {plan.cta}
                            </Link>
                          )}
                        </BorderLaserCard>
                      </div>
                    ))}
                  </div>
                  {/* Pagination Indicators */}
                  <div className="flex justify-center gap-2 mt-2 select-none">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-none transition-all duration-300 ${
                          activePlan === index
                            ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                            : "w-2.5 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                  {PLANS.map((plan, index) => (
                    <BorderLaserCard
                      key={index}
                      className={`p-5 sm:p-6 flex flex-col justify-between h-full relative ${
                        plan.isPopular ? "shadow-emerald-500/5 shadow-xl" : ""
                      }`}
                      borderRadius={isMobile ? 0 : 24}
                    >
                      {plan.isPopular && (
                        <span className="absolute -top-3 right-6 bg-emerald-500 text-black text-[9px] uppercase tracking-widest font-semibold px-3 py-1 rounded-none z-20">
                          Beachhead Choice
                        </span>
                      )}
                      <div>
                        <h4 className="text-white font-medium text-lg mb-2">{plan.name}</h4>
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-2xl font-semibold text-white">{plan.price}</span>
                          <span className="text-xs text-white/40">{plan.period}</span>
                        </div>
                        <p className="text-[10px] font-semibold text-emerald-400/90 tracking-wide uppercase mb-4">{plan.credits}</p>
                        <p className="text-xs text-white/50 leading-relaxed mb-6 border-b border-white/5 pb-4">{plan.description}</p>

                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {plan.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-white/70">
                              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                          {plan.paywalled && plan.paywalled.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-white/30 line-through">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/20 shrink-0 mt-1.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {plan.href.startsWith("http") ? (
                        <a
                          href={plan.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full py-2.5 rounded-none md:rounded-xl text-xs font-semibold transition z-20 relative flex items-center justify-center ${
                            plan.isPopular
                              ? "bg-white text-black hover:scale-[1.02]"
                              : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {plan.cta}
                        </a>
                      ) : (
                        <Link
                          to={plan.href}
                          className={`w-full py-2.5 rounded-none md:rounded-xl text-xs font-semibold transition z-20 relative flex items-center justify-center ${
                            plan.isPopular
                              ? "bg-white text-black hover:scale-[1.02]"
                              : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {plan.cta}
                        </Link>
                      )}
                    </BorderLaserCard>
                  ))}
                </div>
              )}

              {/* Add-ons & Bundles */}
              <div className="mb-24">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">
                    Add-ons & Team <span className="font-semibold">Bundles</span>
                  </h3>
                </div>
                {isMobile ? (
                  <div className="w-full overflow-hidden py-4 select-none">
                    <style dangerouslySetInnerHTML={{__html: `
                      .no-scrollbar::-webkit-scrollbar {
                        display: none;
                      }
                    `}} />
                    <div 
                      onScroll={handleAddonScroll}
                      className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <div className="w-[4vw] shrink-0 pointer-events-none" />
                      {ADDONS.map((ao, idx) => (
                        <div
                          key={idx}
                          className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-none p-6 border border-white/5 bg-white/[0.01]"
                        >
                          <div className="flex justify-between items-baseline mb-3">
                            <h4 className="text-white font-medium text-sm">{ao.name}</h4>
                            <span className="text-emerald-400 font-semibold text-xs shrink-0">{ao.price}</span>
                          </div>
                          <p className="text-[10px] text-white/40 font-semibold mb-3 uppercase tracking-wider">{ao.credits} included</p>
                          <p className="text-xs text-white/50 leading-relaxed">{ao.desc}</p>
                        </div>
                      ))}
                    </div>
                    {/* Pagination Indicators */}
                    <div className="flex justify-center gap-2 mt-2 select-none">
                      {[0, 1].map((index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-none transition-all duration-300 ${
                            activeAddon === index
                              ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                              : "w-2.5 bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {ADDONS.map((ao, idx) => (
                      <div key={idx} className="mars-glass-card rounded-none md:rounded-[24px] p-6 border border-white/5 bg-white/[0.01]">
                        <div className="flex justify-between items-baseline mb-3">
                          <h4 className="text-white font-medium text-sm">{ao.name}</h4>
                          <span className="text-emerald-400 font-semibold text-xs shrink-0">{ao.price}</span>
                        </div>
                        <p className="text-[10px] text-white/40 font-semibold mb-3 uppercase tracking-wider">{ao.credits} included</p>
                        <p className="text-xs text-white/50 leading-relaxed">{ao.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Credit Economics / Token Costs */}
              <div className="max-w-4xl mx-auto border border-white/5 rounded-none md:rounded-3xl bg-white/[0.01] p-6 md:p-8 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-none md:rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                    <Table className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">Credit Billing Metrics Explained</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">1 Credit = ₹0.01 (one paisa)</p>
                  </div>
                </div>

                <p className="text-xs text-white/50 leading-relaxed mb-6">
                  To prevent margins from eroding, credits map directly to Google API expenses. Chat and voice utilize Gemini 2.5 Flash; media OCR reads are routed to the cheaper Flash-Lite, absorbing costs dynamically.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-white/40 uppercase tracking-widest text-[9px]">
                        <th className="pb-3 font-semibold">User Interaction</th>
                        <th className="pb-3 font-semibold text-center">Credit Load</th>
                        <th className="pb-3 font-semibold text-center">Rupee Value</th>
                        <th className="pb-3 font-semibold">Operational Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/70">
                      {INTERACTION_COSTS.map((ic, index) => (
                        <tr key={index}>
                          <td className="py-3.5 font-medium text-white">{ic.action}</td>
                          <td className="py-3.5 text-center text-emerald-400 font-medium">{ic.credits}</td>
                          <td className="py-3.5 text-center text-white font-semibold">{ic.rupee}</td>
                          <td className="py-3.5 text-white/40 text-[11px]">{ic.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom Bar for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-3.5 z-40 flex items-center justify-between safe-bottom">
          <div className="flex flex-col">
            {allSelected ? (
              <>
                <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-wider font-mono">
                  {currentService.bundleName}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-white/40 line-through font-mono">
                    ₹{currentService.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    ₹{currentService.bundlePrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="text-[8px] text-white/40 uppercase tracking-wider font-mono">
                  Estimated Cost
                </span>
                <span className="text-base font-bold font-mono text-white">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </>
            )}
          </div>
          
          <Link
            to={`/onboarding?service=${currentService.id}&package=${allSelected ? "bundle" : "custom"}`}
            className="px-4 py-2 bg-white text-black font-semibold rounded-lg text-xs font-mono tracking-wider transition cursor-pointer"
          >
            Hire MARS
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}
