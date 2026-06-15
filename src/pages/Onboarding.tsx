import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import {
  Check,
  ArrowRight,
  Bot,
  User,
  Building2,
  CreditCard,
  Upload,
  CheckCircle2,
  Terminal,
  Play,
  Download,
  Send,
  Sparkles,
  Phone,
  Table,
  CheckCircle
} from "lucide-react";

// Tiers config
const PLANS = {
  intern: {
    name: "Abdul Intern (Lite)",
    price: 999,
    credits: "15,000 credits",
    desc: "Ideal for solo operators and small neighborhood shops."
  },
  pro: {
    name: "Abdul Pro (CA-Grade)",
    price: 2999,
    credits: "40,000 credits",
    desc: "Our flagship beachhead package for growing businesses."
  },
  max: {
    name: "Abdul Max (Enterprise)",
    price: 8999,
    credits: "100,000+ credits",
    desc: "Bespoke automation for established corporations."
  }
};

type PlanKey = keyof typeof PLANS;

export default function Onboarding() {
  const [searchParams] = useSearchParams();
  const initialPlan = (searchParams.get("plan") as PlanKey) || "pro";
  
  // Wizard Step
  const [step, setStep] = useState(1);
  
  // Form fields
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>(initialPlan);
  const [accountType, setAccountType] = useState<"business" | "personal">("business");
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [language, setLanguage] = useState("auto");
  const [agreeConsent, setAgreeConsent] = useState(false);
  const [gstin, setGstin] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [letterheadName, setLetterheadName] = useState<string | null>(null);
  
  // Script / Payment states
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [showPaySim, setShowPaySim] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  
  // Payment simulator state variables
  const [simTab, setSimTab] = useState<"card" | "upi">("card");
  const [simCardNumber, setSimCardNumber] = useState("4111 1111 1111 1111");
  const [simExpiry, setSimExpiry] = useState("12/30");
  const [simCvv, setSimCvv] = useState("123");
  const [simCardName, setSimCardName] = useState("");
  const [simUpi, setSimUpi] = useState("success@razorpay");
  
  // Step 5 states
  const [logLines, setLogLines] = useState<string[]>([]);
  const [logsComplete, setLogsComplete] = useState(false);
  const [activePortalTab, setActivePortalTab] = useState<"overview" | "ledger" | "khata" | "whatsapp">("whatsapp");
  
  // Sandbox Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "abdul"; text: string; time: string }>>([
    {
      sender: "abdul",
      text: "👋 Welcome to MARS AI, Rahul Sharma! I'm Abdul, your AI accountant. Try me right now — send something like \"50 chai\" or a photo of a bill and watch me log it. Your account activation is processing.",
      time: "15:11"
    }
  ]);
  const [sandboxInput, setSandboxInput] = useState("");
  const [sandboxLedger, setSandboxLedger] = useState<Array<{ date: string; id: string; desc: string; amount: number; type: "expense" | "income" }>>([
    { date: "2026-06-15", id: "EXP-0001", desc: "Standard opening balance verify", amount: 0, type: "expense" }
  ]);
  const [sandboxKhata, setSandboxKhata] = useState<Record<string, number>>({});
  const [conversationState, setConversationState] = useState<"welcome" | "waiting_payment_mode" | "completed">("welcome");
  
  // Dynamically load Razorpay
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setRazorpayLoaded(false);
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Set initial plan from query param
  useEffect(() => {
    if (PLANS[initialPlan]) {
      setSelectedPlan(initialPlan);
    }
  }, [initialPlan]);

  // Pricing math
  const planDetails = PLANS[selectedPlan];
  const subtotal = planDetails.price;
  const gst = Math.round(subtotal * 0.18 * 100) / 100;
  const total = subtotal + gst;

  // Handle Drag-and-Drop Letterhead
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLetterheadName(e.target.files[0].name);
    }
  };

  // Launch Razorpay
  const handleRazorpayCheckout = () => {
    if (!agreeConsent) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    
    setIsPaying(true);
    
    // Config Razorpay Options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_dummy", 
      amount: Math.round(total * 100), // in paise
      currency: "INR",
      name: "MARS AI",
      description: `Hire ${planDetails.name} Subscription`,
      image: "/mars-logo.png",
      handler: function (response: any) {
        setIsPaying(false);
        setPaymentId(response.razorpay_payment_id || "pay_mock_rzp_" + Math.random().toString(36).substr(2, 9));
        advanceToLogs();
      },
      prefill: {
        name: ownerName || "MARS Client",
        email: "client@mars-ai.com",
        contact: whatsappNumber || "+916290352944"
      },
      theme: {
        color: "#10b981"
      },
      modal: {
        ondismiss: function () {
          setIsPaying(false);
          // Trigger fallback modal if they dismiss or checkout fails
          setShowPaySim(true);
        }
      }
    };

    // If the key is the dummy placeholder, bypass the real SDK to avoid browser basic auth prompts
    if (options.key === "rzp_test_dummy" || !options.key.startsWith("rzp_")) {
      setShowPaySim(true);
      return;
    }

    if (razorpayLoaded && (window as any).Razorpay) {
      try {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Razorpay initiation error, launching simulator fallback", err);
        setShowPaySim(true);
      }
    } else {
      // Offline/Script Blocked Sandbox mode: Open simulated premium gateway
      setShowPaySim(true);
    }
  };

  // Complete simulated payment
  const confirmSimulatedPayment = () => {
    setIsPaying(true);
    setShowPaySim(false);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentId("pay_simulated_" + Math.random().toString(36).substr(2, 9));
      advanceToLogs();
    }, 1500);
  };

  // Run dynamic provisioning logs
  const advanceToLogs = () => {
    setStep(5);
    const logs = [
      "INITIALIZING SECURE PROVISIONING PROTOCOL...",
      "AUTHENTICATING TO MARS_SECURE_TUNNEL VIA KOLKATA ROOT...",
      `CREATING TENANT SCOPE [COMPANY: ${accountType === "business" ? (businessName || "Personal Ledger").toUpperCase() : "PERSONAL_LEDGER"}]...`,
      `REGISTERING USER ROLE: BOSS_USER [NAME: ${(ownerName || "Rahul Sharma").toUpperCase()}]...`,
      `LINKING WHATSAPP DEVICE ACCESS: ${whatsappNumber || "+91 6290 352 944"}...`,
      `ALLOCATING PLAN: ${planDetails.name.toUpperCase()} (+${planDetails.credits.toUpperCase()})...`,
      gstin ? `STAMPING CORPORATE ENTITY (GSTIN: ${gstin.toUpperCase()})...` : "BYPASSING CORPORATE METRIC RECORDING (NO GSTIN)...",
      letterheadName ? `MAPPING LETTERHEAD COORDINATES FOR [${letterheadName}]...` : "SEEDING DEFAULT MARS LETTERHEAD LAYOUTS...",
      "STAGING DEFAULT TRANSACTION LEDGER IN SUPABASE DB...",
      "SEEDING INTENT MATCHERS FOR gemini-2.5-flash-lite SYSTEM...",
      "MINTING REVOCABLE PORTAL LOGIN SESSION TOKEN... SUCCESS",
      "PROVISIONING COMPLETE. AGENT LISTEN PROTOCOL ACTIVE."
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < logs.length) {
        setLogLines(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[currentLine]}`]);
        currentLine++;
      } else {
        clearInterval(interval);
        setLogsComplete(true);
      }
    }, 400);
  };

  // Sandbox chat simulation logic
  const handleSendSandboxMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxInput.trim()) return;

    const userMsg = sandboxInput.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg, time }]);
    setSandboxInput("");

    // Thinking delay
    setTimeout(() => {
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (conversationState === "welcome" && userMsg.toLowerCase() === "hi") {
        setChatMessages(prev => [...prev, {
          sender: "abdul",
          text: `Your secure login link for ${ownerName || "Rahul Sharma"}:\nhttps://mars-ai-web.onrender.com/portal/login?token=simulated_magic_token_8829371\n\nTap to open your dashboard — no password needed. The link works once and expires in 30 minutes.\n\nHi there! How can I help you manage your finances today?`,
          time: responseTime
        }]);
        setConversationState("waiting_payment_mode");
      } 
      else if (userMsg.toLowerCase().includes("lotte choco pie") || userMsg.toLowerCase().includes("spent 30")) {
        setChatMessages(prev => [...prev, {
          sender: "abdul",
          text: "Okay, I've noted the transactions.\n\nFirst, I've logged the ₹500 you sent to Karan on his khata as a credit given.\n\nFor the Lotte Choco Pie expense of ₹30, what was the payment mode (e.g., UPI, cash, card)?\n\n📝 Karan now owes you ₹500.",
          time: responseTime
        }]);
        // Stage ledger & khata
        setSandboxKhata(prev => ({ ...prev, "Karan": 500 }));
        setSandboxLedger(prev => [
          ...prev, 
          { date: "2026-06-15", id: "EXP-0002", desc: "Sent to Karan online (khata)", amount: 500, type: "expense" }
        ]);
        setConversationState("waiting_payment_mode");
      } 
      else if (userMsg.toLowerCase().includes("cash")) {
        setChatMessages(prev => [...prev, {
          sender: "abdul",
          text: "Thanks for confirming!\n\nLogged: ₹30 for Lotte Choco Pie, paid by cash.\n\nLogged EXP-0003 — ₹30 Lotte Choco Pie, cash.",
          time: responseTime
        }]);
        setSandboxLedger(prev => [
          ...prev,
          { date: "2026-06-15", id: "EXP-0003", desc: "Lotte Choco Pie", amount: 30, type: "expense" }
        ]);
        setConversationState("completed");
      } 
      else {
        // Dynamic fallback logic
        const amtMatch = userMsg.match(/(\d+)/);
        const amount = amtMatch ? parseInt(amtMatch[0]) : 100;
        const lowerMsg = userMsg.toLowerCase();
        
        let desc = userMsg.length > 25 ? userMsg.substring(0, 22) + "..." : userMsg;
        let logType: "expense" | "income" = lowerMsg.includes("received") || lowerMsg.includes("income") || lowerMsg.includes("got") ? "income" : "expense";
        
        if (lowerMsg.includes("khata") || lowerMsg.includes("udhaar") || lowerMsg.includes("owes")) {
          const names = ["Ramesh", "Suresh", "Karan", "Amit", "Rahul"];
          const name = names.find(n => lowerMsg.includes(n.toLowerCase())) || "Customer";
          setSandboxKhata(prev => ({ ...prev, [name]: (prev[name] || 0) + amount }));
          setChatMessages(prev => [...prev, {
            sender: "abdul",
            text: `Got it! Logged ₹${amount} under ${name}'s khata account. Running balance updated.`,
            time: responseTime
          }]);
          setSandboxLedger(prev => [
            ...prev,
            { date: "2026-06-15", id: `KHAT-${Math.floor(Math.random() * 9000 + 1000)}`, desc: `${name} credit transaction`, amount, type: logType }
          ]);
        } else {
          setChatMessages(prev => [...prev, {
            sender: "abdul",
            text: `Understood. I have logged that transaction:\n₹${amount} for "${desc}" (${logType}).`,
            time: responseTime
          }]);
          setSandboxLedger(prev => [
            ...prev,
            { date: "2026-06-15", id: `EXP-${Math.floor(Math.random() * 9000 + 1000)}`, desc, amount, type: logType }
          ]);
        }
      }
    }, 1200);
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-36 pb-32 md:px-10">
        
        {/* Onboarding Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-14">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50 font-mono">
            SECURE_PROVISIONING_PORTAL
          </p>
          <h1 className="text-balance text-3xl font-light tracking-tight md:text-5xl text-white">
            <WordReveal text="Hire Your AI Employee" />
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-white/55 font-mono">
            {step < 5 ? `STEP 0${step} // 05` : "PROVISIONING_LIVE"}
          </p>
        </div>

        {/* Wizard step progress bar */}
        {step < 5 && (
          <div className="max-w-4xl mx-auto mb-12 select-none">
            <div className="relative flex justify-between items-center w-full font-mono text-[9px] sm:text-xs tracking-wider text-white/40">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-px bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] z-0 transition-all duration-500" 
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
              {[
                { s: 1, label: "AI_AGENT" },
                { s: 2, label: "BIZ_INFO" },
                { s: 3, label: "COORDINATES" },
                { s: 4, label: "CHECKOUT" }
              ].map((item) => (
                <button
                  key={item.s}
                  disabled={step < item.s}
                  onClick={() => setStep(item.s)}
                  className={`relative z-10 flex flex-col items-center gap-2 transition duration-300 ${
                    step >= item.s ? "text-emerald-400" : "text-white/30"
                  }`}
                >
                  <span className={`h-7 w-7 rounded-none flex items-center justify-center border font-semibold ${
                    step === item.s 
                      ? "bg-emerald-500/10 border-emerald-400 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]" 
                      : step > item.s
                      ? "bg-emerald-500 text-black border-emerald-500"
                      : "bg-black/60 border-white/10"
                  }`}>
                    {step > item.s ? <CheckCircle2 className="h-4 w-4" /> : `0${item.s}`}
                  </span>
                  <span className="hidden sm:inline text-[9px] uppercase tracking-widest mt-1">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main interactive cards container */}
        <div className="max-w-4xl mx-auto">
          {/* STEP 1: Plan Selection */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(Object.keys(PLANS) as PlanKey[]).map((key) => {
                  const plan = PLANS[key];
                  const isSelected = selectedPlan === key;
                  return (
                    <BorderLaserCard
                      key={key}
                      className={`p-6 bg-black/40 flex flex-col justify-between cursor-pointer transition relative h-full ${
                        isSelected 
                          ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.08)] bg-emerald-950/5" 
                          : "border-white/5 hover:border-white/10"
                      }`}
                      borderRadius={24}
                      onClick={() => setSelectedPlan(key)}
                    >
                      {key === "pro" && (
                        <span className="absolute -top-3 right-6 bg-emerald-500 text-black text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-none z-20">
                          Recommended
                        </span>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Bot className={`h-5 w-5 ${isSelected ? "text-emerald-400" : "text-white/60"}`} />
                          <h4 className="text-white font-medium text-base">{plan.name}</h4>
                        </div>
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-3xl font-semibold text-white">₹{plan.price}</span>
                          <span className="text-xs text-white/40">/ month</span>
                        </div>
                        <p className="text-[10px] font-semibold text-emerald-400/90 tracking-wide uppercase mb-4">{plan.credits}</p>
                        <p className="text-xs text-white/50 leading-relaxed mb-6">{plan.desc}</p>
                      </div>

                      <button
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition z-20 relative flex items-center justify-center ${
                          isSelected
                            ? "bg-emerald-500 text-black shadow-lg"
                            : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {isSelected ? "Hiring..." : "Choose Agent"}
                      </button>
                    </BorderLaserCard>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 text-sm font-semibold text-black shadow-lg shadow-white/10 gap-2 cursor-pointer"
                >
                  <span>Enter Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Client Profile Form */}
          {step === 2 && (
            <div className="mars-glass-card rounded-[32px] p-6 sm:p-10 border border-white/5 bg-black/40 animate-fade-in relative">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-emerald-400" />
                    Create Your Account Profile
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                    {PLANS[selectedPlan].name}
                  </span>
                </div>

                {/* Account Type Toggle */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Account Type</label>
                  <div className="flex gap-2 bg-white/5 p-1 border border-white/5 rounded-xl max-w-xs select-none">
                    <button
                      onClick={() => setAccountType("business")}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 ${
                        accountType === "business" ? "bg-white text-black font-semibold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <Building2 className="h-3.5 w-3.5" />
                      Business
                    </button>
                    <button
                      onClick={() => setAccountType("personal")}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 ${
                        accountType === "personal" ? "bg-white text-black font-semibold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <User className="h-3.5 w-3.5" />
                      Personal
                    </button>
                  </div>
                </div>

                {/* Grid Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {accountType === "business" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Business Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Gupta General Store"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition font-sans cursor-text"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition font-sans cursor-text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">WhatsApp Number *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 6290 352 944"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition font-mono cursor-text"
                      />
                      <span className="absolute right-3 top-3.5 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> SMS Active
                      </span>
                    </div>
                  </div>
                  {accountType === "business" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Business Type (optional)</label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-emerald-500 transition font-sans cursor-pointer bg-neutral-900"
                      >
                        <option value="" disabled className="text-white/45 bg-neutral-950">Select your business type...</option>
                        <option value="retail" className="bg-neutral-950 text-white">Retail / Corner Store</option>
                        <option value="clinic" className="bg-neutral-950 text-white">Healthcare & Clinics</option>
                        <option value="gym" className="bg-neutral-950 text-white">Fitness & Gym Chains</option>
                        <option value="realestate" className="bg-neutral-950 text-white">Premium Real Estate</option>
                        <option value="saas" className="bg-neutral-950 text-white">SaaS & Tech Platforms</option>
                        <option value="other" className="bg-neutral-950 text-white">Other Professional Service</option>
                      </select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Language (optional)</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-emerald-500 transition font-sans cursor-pointer bg-neutral-900"
                    >
                      <option value="auto" className="bg-neutral-950 text-white">Auto — Abdul matches how you write</option>
                      <option value="hinglish" className="bg-neutral-950 text-white">Hinglish (Hindi + English)</option>
                      <option value="hindi" className="bg-neutral-950 text-white">Hindi</option>
                      <option value="english" className="bg-neutral-950 text-white">English</option>
                      <option value="bengali" className="bg-neutral-950 text-white">Bengali</option>
                      <option value="tamil" className="bg-neutral-950 text-white">Tamil</option>
                    </select>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 border-t border-white/5 pt-6">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={agreeConsent}
                    onChange={(e) => setAgreeConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-emerald-500 rounded border-white/15 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-white/55 leading-relaxed cursor-pointer font-sans select-none">
                    I agree to the <Link to="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-emerald-400 hover:underline">Terms of Service</Link>. I consent to MARS processing my business metrics over the encrypted WhatsApp Gateway (compliant under the India DPDP Act 2023).
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 gap-4 border-t border-white/5 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!whatsappNumber || (accountType === "business" && !businessName) || !ownerName}
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 text-sm font-semibold text-black shadow-lg shadow-white/10 gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <span>Coordinates & Upload</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Corporate Info & Template Upload */}
          {step === 3 && (
            <div className="mars-glass-card rounded-[32px] p-6 sm:p-10 border border-white/5 bg-black/40 animate-fade-in relative">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <Table className="h-5 w-5 text-emerald-400" />
                    Invoice Stamping Coordinates
                  </h3>
                  <span className="text-[10px] font-mono text-white/40 uppercase">Optional Setup</span>
                </div>

                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  To automatically stamp client invoices, quotes, or generate GST reports, we staging coordinates for your templates. You can complete this now or let our operators configuration it by hand during setup.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">GSTIN / PAN (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 19AAAAA1111A1Z1"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition font-mono cursor-text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Billing Address (Optional)</label>
                    <textarea
                      placeholder="Enter business registered address..."
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition font-sans h-[100px] resize-none cursor-text"
                    />
                  </div>
                </div>

                {/* Drag and Drop Zone */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Upload Blank Letterhead / Invoice Template</label>
                  <div className="border border-dashed border-white/15 rounded-2xl p-8 bg-white/[0.01] hover:bg-white/[0.03] transition flex flex-col items-center justify-center text-center relative cursor-pointer group">
                    <input
                      type="file"
                      id="template-file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="h-8 w-8 text-white/40 group-hover:text-emerald-400 transition mb-3" />
                    {letterheadName ? (
                      <div className="space-y-1">
                        <p className="text-xs text-emerald-400 font-semibold font-mono">{letterheadName}</p>
                        <p className="text-[10px] text-white/40">File selected successfully. Ready to stamp.</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs text-white/80 font-medium">Drag & drop letterhead logo or blank PDF template</p>
                        <p className="text-[10px] text-white/40">Accepts PDF or PNG up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 gap-4 border-t border-white/5 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 text-sm font-semibold text-black shadow-lg shadow-white/10 gap-2 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Checkout & Razorpay Checkout */}
          {step === 4 && (
            <div className="mars-glass-card rounded-[32px] p-6 sm:p-10 border border-white/5 bg-black/40 animate-fade-in relative">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-emerald-400" />
                    Razorpay Gateway Checkout
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                    Secure payment
                  </span>
                </div>

                {/* Invoice Details Card */}
                <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl space-y-4 font-sans text-white/80">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-white/40 border-b border-white/5 pb-2">
                    <span>Item Description</span>
                    <span>Cost</span>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-white">{planDetails.name} Subscription</p>
                      <p className="text-[10px] text-white/40 mt-1 uppercase font-mono">{planDetails.credits} included / carry-forward enabled</p>
                    </div>
                    <span className="text-sm font-mono text-white">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-white/5 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-white/60">
                      <span>Central GST (CGST) @ 9%</span>
                      <span className="font-mono">₹{(gst / 2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>State GST (SGST) @ 9%</span>
                      <span className="font-mono">₹{(gst / 2).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3 flex justify-between font-medium text-white">
                    <span className="text-sm uppercase tracking-wider font-mono">Total Due</span>
                    <span className="text-lg font-mono text-emerald-400">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Info about credit economics */}
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 text-[11px] leading-relaxed text-emerald-400/80 rounded-xl">
                  <strong>ℹ️ Economics Reminder:</strong> Subscription is the main platform cost; credits are near-cost pass-through (1 Credit = ₹0.01). If you exceed your limit, overage packages can be bought anytime or top-up automatically.
                </div>

                {/* Consent check again */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="consent-confirm"
                    checked={agreeConsent}
                    onChange={(e) => setAgreeConsent(e.target.checked)}
                    className="mt-1 h-3.5 w-3.5 accent-emerald-500 rounded cursor-pointer"
                  />
                  <label htmlFor="consent-confirm" className="text-[11px] text-white/45 cursor-pointer select-none">
                    Confirm consent for automatic billing and provisioning. Payment is processed securely via Razorpay (India compliant). Card data is never stored on MARS servers.
                  </label>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 gap-4 border-t border-white/5 mt-6">
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleRazorpayCheckout}
                    disabled={isPaying || !agreeConsent}
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-500 hover:bg-emerald-400 px-8 text-sm font-semibold text-black shadow-lg shadow-emerald-500/20 gap-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    {isPaying ? (
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-black animate-ping" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <span>Pay via Razorpay</span>
                        <CreditCard className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Provisioning Logs & Live Dashboard Sandbox Portal */}
          {step === 5 && (
            <div className="space-y-10 animate-fade-in">
              {/* Virtual provisioning terminal */}
              <div className="crt-scanline border border-white/10 bg-black rounded-3xl p-6 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4 font-mono text-[10px] text-white/40">
                  <span className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-emerald-500" />
                    MARS_AGENT_PROVISIONING_DAEMON v1.2.0
                  </span>
                  <span className={logsComplete ? "text-emerald-400 animate-pulse font-bold" : "text-amber-500 animate-pulse"}>
                    {logsComplete ? "ONLINE" : "ESTABLISHING_TENANT"}
                  </span>
                </div>

                <div className="font-mono text-[10px] sm:text-xs leading-relaxed text-emerald-400/90 h-[220px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
                  {logLines.map((line, idx) => (
                    <p key={idx} className="whitespace-pre-wrap">{line}</p>
                  ))}
                  {!logsComplete && (
                    <p className="text-white/45 animate-pulse">...</p>
                  )}
                </div>
              </div>

              {logsComplete && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Action alert box for WhatsApp deep link */}
                  <div className="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                    <div className="space-y-2 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 tracking-wide">
                        <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
                        Provisioning Success
                      </div>
                      <h3 className="text-xl font-medium text-white">Your AI Employee is Ready to Work!</h3>
                      <p className="text-xs text-white/50 leading-relaxed max-w-xl">
                        To activate Abdul, click the button below. This will open WhatsApp on your phone or web client. Just send a <strong>"hi"</strong> to Abdul. He will immediately respond and send you a secure magic login link to access your portal.
                      </p>
                    </div>

                    <a
                      href="https://wa.me/916290352944?text=hi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-8 text-sm font-semibold text-black shadow-xl hover:shadow-white/5 group gap-2 shrink-0 cursor-pointer w-full md:w-auto"
                    >
                      <Phone className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Activate on WhatsApp</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>

                  {/* Sandbox client dashboard portal */}
                  <div className="space-y-4 border border-white/5 bg-white/[0.01] p-6 rounded-[32px]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 gap-4">
                      <div>
                        <h4 className="text-white font-medium text-base flex items-center gap-2">
                          <Bot className="h-5 w-5 text-emerald-400" />
                          Interactive Customer Dashboard Sandbox
                        </h4>
                        <p className="text-[10px] text-white/45 uppercase tracking-widest mt-1 font-mono">
                          Live Prototype Preview of your portal
                        </p>
                      </div>

                      {/* Tab selector */}
                      <div className="flex gap-1 bg-white/5 p-1 border border-white/5 rounded-xl text-xs font-mono select-none">
                        {[
                          { id: "whatsapp", label: "💬 WHATSAPP" },
                          { id: "overview", label: "📊 OVERVIEW" },
                          { id: "ledger", label: "📑 LEDGER" },
                          { id: "khata", label: "👥 KHATA" }
                        ].map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActivePortalTab(tab.id as any)}
                            className={`py-1.5 px-3 rounded-lg font-medium transition cursor-pointer ${
                              activePortalTab === tab.id ? "bg-white text-black font-semibold" : "text-white/60 hover:text-white"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tab contents */}
                    <div className="bg-black/30 border border-white/5 rounded-2xl p-4 sm:p-6 min-h-[350px] flex flex-col justify-between">
                      
                      {/* TAB 1: WhatsApp chat simulator */}
                      {activePortalTab === "whatsapp" && (
                        <div className="flex-1 flex flex-col justify-between h-full">
                          <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 pr-2 scrollbar-thin">
                            {chatMessages.map((msg, index) => (
                              <div
                                key={index}
                                className={`flex flex-col max-w-[85%] ${
                                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                                }`}
                              >
                                <div
                                  className={`p-3 text-xs leading-relaxed font-sans ${
                                    msg.sender === "user"
                                      ? "bg-emerald-600 text-white rounded-t-xl rounded-l-xl rounded-br-none"
                                      : "bg-white/5 text-white/90 border border-white/10 rounded-t-xl rounded-r-xl rounded-bl-none"
                                  }`}
                                  style={{ whiteSpace: "pre-line" }}
                                >
                                  {msg.text}
                                </div>
                                <span className="text-[8px] font-mono text-white/30 mt-1">{msg.time}</span>
                              </div>
                            ))}
                          </div>

                          {/* Sandbox Chat Form */}
                          <form onSubmit={handleSendSandboxMessage} className="flex gap-2 border-t border-white/5 pt-3">
                            <input
                              type="text"
                              value={sandboxInput}
                              onChange={(e) => setSandboxInput(e.target.value)}
                              placeholder={
                                conversationState === "welcome"
                                  ? 'Type "hi" to activate your dashboard magic link...'
                                  : 'Type "yesterday i spent 30 rs for 3 lotte choco pie..."'
                              }
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition font-sans cursor-text"
                            />
                            <button
                              type="submit"
                              className="h-9 w-9 bg-emerald-500 text-black flex items-center justify-center rounded-xl hover:bg-emerald-400 shrink-0 transition"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </form>
                        </div>
                      )}

                      {/* TAB 2: Overview Widget */}
                      {activePortalTab === "overview" && (
                        <div className="space-y-6 font-sans">
                          {/* Top Row: Plan & Days left banner */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-emerald-950/10 border border-emerald-500/20 p-4 rounded-xl">
                            <div>
                              <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Active Employee</p>
                              <h5 className="text-base font-bold text-white mt-1">{planDetails.name}</h5>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Billing Period</p>
                              <p className="text-xs font-semibold text-white mt-1">30 Days Remaining (Auto-Renew)</p>
                            </div>
                          </div>

                          {/* Meter Metrics grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white/5 p-4 border border-white/5 rounded-xl space-y-1">
                              <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Wallet Balance</span>
                              <p className="text-xl font-bold text-white font-mono">{planDetails.credits}</p>
                              <p className="text-[9px] text-emerald-400">1 Credit = ₹0.01 value</p>
                            </div>
                            <div className="bg-white/5 p-4 border border-white/5 rounded-xl space-y-1">
                              <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Total Ledger Entries</span>
                              <p className="text-xl font-bold text-white font-mono">{sandboxLedger.length}</p>
                              <p className="text-[9px] text-white/40">Real-time WhatsApp synced</p>
                            </div>
                            <div className="bg-white/5 p-4 border border-white/5 rounded-xl space-y-1">
                              <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Active WhatsApp Number</span>
                              <p className="text-sm font-semibold text-white mt-2 font-mono">{whatsappNumber || "+91 6290 352 944"}</p>
                              <p className="text-[9px] text-emerald-400">Listener: Active</p>
                            </div>
                          </div>

                          <div className="text-center p-4 border border-white/5 bg-white/[0.01] rounded-xl text-xs text-white/55 italic">
                            💡 Tip: Go to the "💬 WHATSAPP" tab to chat with Abdul and see how these widgets update dynamically.
                          </div>
                        </div>
                      )}

                      {/* TAB 3: Ledger table */}
                      {activePortalTab === "ledger" && (
                        <div className="space-y-4 flex-1 flex flex-col justify-between h-full">
                          <div className="overflow-x-auto w-full">
                            <table className="w-full text-left text-xs font-sans">
                              <thead>
                                <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider text-[9px] font-mono">
                                  <th className="pb-3">Date</th>
                                  <th className="pb-3">Entry ID</th>
                                  <th className="pb-3">Description</th>
                                  <th className="pb-3 text-right">Amount</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5 text-white/70">
                                {sandboxLedger.map((row, idx) => (
                                  <tr key={idx} className="hover:bg-white/[0.02]">
                                    <td className="py-2.5 font-mono text-[10px] text-white/45">{row.date}</td>
                                    <td className="py-2.5 font-mono text-[10px] text-emerald-400">{row.id}</td>
                                    <td className="py-2.5 font-medium text-white">{row.desc}</td>
                                    <td className="py-2.5 text-right font-mono font-semibold text-white">₹{row.amount.toFixed(2)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="flex justify-end pt-3 border-t border-white/5">
                            <button 
                              onClick={() => alert("Excel export sheet generated successfully! Abdul is sending it to your WhatsApp...")}
                              className="inline-flex h-9 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 text-xs font-semibold text-white gap-2 transition cursor-pointer"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Export Excel Report
                            </button>
                          </div>
                        </div>
                      )}

                      {/* TAB 4: Khata ledger */}
                      {activePortalTab === "khata" && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-wider border-b border-white/5 pb-2">
                              <span>Party Name</span>
                              <span className="text-right">Balance Due</span>
                            </div>
                            
                            {Object.keys(sandboxKhata).length === 0 ? (
                              <div className="text-center py-10 text-xs text-white/40">
                                No active running balances found. Use the WhatsApp tab to type: <br />
                                <span className="text-white/60 font-mono italic">"Karan took 500 rs on udhaar"</span> to add one.
                              </div>
                            ) : (
                              Object.keys(sandboxKhata).map((name) => {
                                const balance = sandboxKhata[name];
                                return (
                                  <div key={name} className="flex justify-between items-center py-2.5 border-b border-white/5 font-sans">
                                    <span className="text-sm text-white font-medium">{name}</span>
                                    <span className="text-xs font-mono font-bold text-emerald-400">
                                      {balance > 0 ? `owes you ₹${balance.toFixed(2)}` : `you owe ₹${Math.abs(balance).toFixed(2)}`}
                                    </span>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </main>

      {/* Razorpay Simulation Modal */}
      {showPaySim && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-neutral-900 border border-white/10 rounded-[28px] max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-fade-in font-sans">
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black font-extrabold text-sm">
                  R
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Razorpay Secure Checkout</h4>
                  <p className="text-[9px] text-emerald-400 font-mono">SANDBOX TEST GATEWAY</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-white/40 uppercase font-mono">Amount Due</p>
                <span className="text-sm font-mono text-emerald-400 font-bold">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Tab selector */}
            <div className="flex gap-1 bg-white/5 p-1 border border-white/5 rounded-xl text-xs font-mono select-none">
              <button
                type="button"
                onClick={() => setSimTab("card")}
                className={`flex-1 py-1.5 rounded-lg font-medium transition flex items-center justify-center gap-1 cursor-pointer ${
                  simTab === "card" ? "bg-white text-black font-semibold" : "text-white/60 hover:text-white"
                }`}
              >
                <CreditCard className="h-3.5 w-3.5" />
                CARD PAYMENT
              </button>
              <button
                type="button"
                onClick={() => setSimTab("upi")}
                className={`flex-1 py-1.5 rounded-lg font-medium transition flex items-center justify-center gap-1 cursor-pointer ${
                  simTab === "upi" ? "bg-white text-black font-semibold" : "text-white/60 hover:text-white"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                UPI ADDRESS
              </button>
            </div>

            {/* Form body */}
            <div className="space-y-4">
              {simTab === "card" ? (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/40">Card Number (Test Mode)</label>
                    <input
                      type="text"
                      value={simCardNumber}
                      onChange={(e) => setSimCardNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-white/40">Expiry Date</label>
                      <input
                        type="text"
                        value={simExpiry}
                        onChange={(e) => setSimExpiry(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-white/40">CVV Code</label>
                      <input
                        type="password"
                        value={simCvv}
                        onChange={(e) => setSimCvv(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/40">Cardholder Name</label>
                    <input
                      type="text"
                      value={simCardName || ownerName || "Rahul Sharma"}
                      onChange={(e) => setSimCardName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/40">UPI Address (Virtual Payment Address)</label>
                    <input
                      type="text"
                      value={simUpi}
                      onChange={(e) => setSimUpi(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-white/40">
                    Use any dummy VPA like <span className="text-emerald-400 font-mono">success@razorpay</span> or your own UPI address to test drive the redirection hooks.
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[10px] leading-relaxed text-emerald-400">
              💡 <strong>Hiring Test Mode:</strong> We pre-seeded dummy card details. You can customize them or click <strong>"Authorize simulated Payment"</strong> directly.
            </div>

            <div className="flex justify-between items-center gap-3 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowPaySim(false);
                  setIsPaying(false);
                }}
                className="py-2.5 px-4 border border-white/10 hover:bg-white/5 rounded-xl text-xs text-white/70 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSimulatedPayment}
                className="py-2.5 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-xs transition cursor-pointer"
              >
                Authorize simulated Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
