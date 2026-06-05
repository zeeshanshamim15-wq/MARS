import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import {
  MessageSquare,
  Bot,
  Send,
  Zap,
  TrendingUp,
  Video,
  FileSpreadsheet,
  Globe,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  UserCheck
} from "lucide-react";

// Types for the mock chat
type Message = {
  sender: "user" | "abdul";
  text: string;
  time: string;
  isImage?: boolean;
  imageUrl?: string;
  isVoice?: boolean;
};

const CHAT_OPTIONS = [
  {
    id: "expense",
    label: "Log Expense (Text)",
    prompt: "paid 1200 for diesel cash",
    response: "Logged EXP-0042 — ₹1,200 diesel, cash. 📝"
  },
  {
    id: "voice",
    label: "Log Voice (Hindi-English)",
    prompt: "🎤 [Voice Note] \"bhai aaj 500 ka chai paani hua, cash\"",
    isVoice: true,
    response: "Logged EXP-0044 — ₹500 chai-paani, cash. ☕"
  },
  {
    id: "khata1",
    label: "Udhaar Ledger (Add)",
    prompt: "Ramesh took 500 on udhaar",
    response: "Noted. Ramesh now owes you ₹500. 🤝"
  },
  {
    id: "khata2",
    label: "Udhaar Ledger (Pay)",
    prompt: "Ramesh ne 200 diye",
    response: "Got it. Ramesh now owes you ₹300. ✅"
  },
  {
    id: "report",
    label: "Request Ledger Status",
    prompt: "who owes me money?",
    response: "Here’s your active khata:\n• Ramesh — owes you ₹300\n• Anil — owes you ₹1,500\n\nYou owe:\n• Suresh — ₹1,000"
  },
  {
    id: "invoice",
    label: "Create Invoice",
    prompt: "make an invoice for Aptitude, website development, 50000 plus gst",
    response: "Here is your invoice draft on your letterhead:\n📄 *INV-0007 — Aptitude Pvt Ltd*\n• Website Development: ₹50,000\n• CGST (9%): ₹4,500\n• SGST (9%): ₹4,500\n• Total: ₹59,000\nGenerated invoice ready to download. 📥"
  }
];

export default function Services() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "abdul",
      text: "Hello! I am Abdul, your MARS AI Accountant. Send me expenses, income, receipts, voice notes, or khata updates and I will log them immediately. Try selecting one of the options below to see how I work!",
      time: "10:00 AM"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleOptionClick = (option: typeof CHAT_OPTIONS[0]) => {
    if (isTyping) return;

    // Add user message
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      sender: "user",
      text: option.prompt,
      time: userTime,
      isVoice: option.isVoice
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate typing and response
    setTimeout(() => {
      setIsTyping(false);
      const abdulTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        {
          sender: "abdul",
          text: option.response,
          time: abdulTime
        }
      ]);
    }, 1200);
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-36 md:pt-44 pb-32 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            Our Expertise
          </p>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white flex flex-col items-center">
            <WordReveal text="Futuristic Business" />
            <MetallicText text="Services" className="text-4xl md:text-6xl mt-2" />
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            MARS operates across four active service verticals and one roadmap vertical, delivering end-to-end, technology-powered growth solutions.
          </p>
        </div>

        {/* 5 Verticals Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {/* Vertical 1 */}
          <BorderLaserCard className="p-5 sm:p-8 flex flex-col justify-between h-full animate-crt-scan" borderRadius={isMobile ? 0 : 24}>
            <div>
              <div className="h-12 w-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                01. Digital Marketing & Web Dev
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                We design, build, and run everything a modern business needs to attract, engage, and convert customers online. We align brand identity, responsive landing pages, paid performance media, technical SEO, and automated CRM pipelines into a single high-conversion sales machine.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-white/50 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Responsive UI & Web Apps
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Google/Meta Media Performance
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Brand Identity & Creative Direction
              </li>
            </ul>
          </BorderLaserCard>

          {/* Vertical 2 */}
          <BorderLaserCard className="p-5 sm:p-8 flex flex-col justify-between lg:col-span-2 h-full animate-crt-scan" borderRadius={isMobile ? 0 : 24}>
            <div>
              <div className="h-12 w-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                02. Intelligent Automation (IA) & AI Agents
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                Our most powerful capability: engineering custom, smart automation systems capable of executing multi-layered back-office tasks. Beyond simple automated triggers, we construct reasoning AI agents that orchestrate work across CRM platforms, data pipelines, support chats, and databases, replacing friction with flawless execution.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div className="space-y-2 text-xs text-white/50">
                <p className="font-medium text-white/80">Active Capabilities:</p>
                <p className="flex items-center gap-2"><span className="h-1 w-1 rounded-none bg-white/60" /> AI Outbound Voice Calling (ElevenLabs + n8n)</p>
                <p className="flex items-center gap-2"><span className="h-1 w-1 rounded-none bg-white/60" /> Conversational Support & Sales Chatbots</p>
                <p className="flex items-center gap-2"><span className="h-1 w-1 rounded-none bg-white/60" /> Lead Gen Prospecting & Verification Pipelines</p>
              </div>
              <div className="space-y-2 text-xs text-white/50">
                <p className="font-medium text-white/80">Future Vision:</p>
                <p className="italic text-white/40">The Autonomous Business Operating System: Speak commands aloud from your desk, and your custom digital infrastructure executes, logs, reports, and notifies you instantly.</p>
              </div>
            </div>
          </BorderLaserCard>

          {/* Vertical 3 */}
          <BorderLaserCard className="p-5 sm:p-8 flex flex-col justify-between h-full animate-crt-scan" borderRadius={isMobile ? 0 : 24}>
            <div>
              <div className="h-12 w-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                03. AI Filmmaking & Media
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                We combine bleeding-edge Generative AI media tools with traditional video production disciplines. From scriptwriting to synthetic casting, high-fidelity VFX, voice synthesis, sound design, and OTT formatting, we create cinematic commercials and explainers at a fraction of standard agency costs.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-white/50 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Scripting & Storyboarding (AI + Human)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Synthetic Casting & Narration
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Gen-AI VFX & Cinematic Editing
              </li>
            </ul>
          </BorderLaserCard>

          {/* Vertical 4 */}
          <BorderLaserCard className="p-5 sm:p-8 flex flex-col justify-between h-full animate-crt-scan" borderRadius={isMobile ? 0 : 24}>
            <div>
              <div className="h-12 w-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                04. Embedded Business Consultancy
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                We do not present reports and walk away. We embed ourselves in your operations, audit existing pipelines, develop a detailed execution roadmap, and take full ownership of the deliverables. We handle the tech builds, team restructuring, and campaign deployment as if it were our own.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-white/50 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Competitor & Strategy Audits
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Revenue Model Refinement
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Shared Ownership & Embedded Execution
              </li>
            </ul>
          </BorderLaserCard>

          {/* Vertical 5 */}
          <BorderLaserCard className="p-5 sm:p-8 flex flex-col justify-between h-full animate-crt-scan" borderRadius={isMobile ? 0 : 24}>
            <div>
              <div className="h-12 w-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                05. Strategic Investment (Roadmap)
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                Our future vision includes establishing an incubator and seed investment arm. We plan to fund high-potential startups and pair capital injections with operational services (development, design, automation) provided directly by MARS to frictionlessly scale our portfolio companies.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-white/50 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Pitch Deck Engineering
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Financial Modeling & Due Diligence
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-none bg-white/40" /> Full operational growth support
              </li>
            </ul>
          </BorderLaserCard>
        </div>

        {/* MARS AI Showcase Area */}
        <div id="mars-ai" className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/[0.02] border border-white/5 rounded-[32px] p-5 sm:p-8 md:p-12 backdrop-blur-md">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-1/4 h-[300px] w-[300px] bg-white/5 rounded-full filter blur-[80px] pointer-events-none" />

          {/* Info Side (Confidential Summary: Abdul & Orion Overview) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/70 w-fit mb-6">
              <Sparkles className="h-3 w-3 text-white/80 animate-pulse" />
              Confidential Project Spotlight
            </div>
            <h2 className="text-3xl font-light tracking-tight text-white mb-4 md:text-4xl flex items-center gap-2">
              <WordReveal text="Meet" />
              <MetallicText text="MARS AI" className="text-3xl md:text-4xl" />
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 text-sm">
              Our flagship ecosystem translates complex business administration into simple WhatsApp threads. We design custom digital &ldquo;AI Employees&rdquo; that talk directly to databases, extract receipt metrics, reconcile invoices, and compose correspondence.
            </p>

            <div className="space-y-6">
              {/* Agent 1 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Abdul — The AI Accountant</h4>
                  <p className="text-xs text-white/50 mt-1">
                    Operates your bookkeeping over chat. Recognizes invoices, logs cash expenses, transcribes mixed language voice notes, tracks informal udhaar, and exports records to Tally/GST.
                  </p>
                </div>
              </div>

              {/* Agent 2 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-sm font-bold">
                  O
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Orion — The Correspondence Agent</h4>
                  <p className="text-xs text-white/50 mt-1">
                    Autonomously generates written documents, letters, emails, and proposals on client letterheads. Routes seamlessly via intent recognition to handle external communications.
                  </p>
                </div>
              </div>

              {/* Agent 3 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-sm font-bold">
                  N
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Nova — The Outreach Orchestrator</h4>
                  <p className="text-xs text-white/50 mt-1">
                    Our roadmap coordinator. Runs morning briefs, delegates workflows to staff, gathers daily updates, and serves as an autonomous Chief of Staff.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chat Mockup Side (Glassmorphism WhatsApp preview) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-[420px] rounded-none md:rounded-[36px] border border-white/10 bg-black/60 p-3 shadow-2xl flex flex-col h-[480px] sm:h-[520px] relative overflow-hidden backdrop-blur-xl">
              {/* Top notch */}
              <div className="absolute top-0 inset-x-0 h-4 flex justify-center items-center pointer-events-none z-20">
                <div className="w-24 h-3 bg-black rounded-b-xl border border-white/10 border-t-0" />
              </div>

              {/* Phone Header */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-3 pt-3 px-3">
                <div className="relative h-10 w-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                  A
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-black" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-white">Abdul (AI Accountant)</h4>
                  <p className="text-[10px] text-white/40">MARS AI Employee · Online</p>
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-none font-mono">
                  WhatsApp
                </div>
              </div>

              {/* Chat Messages viewport */}
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin select-none">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-white/15 text-white rounded-tr-none border border-white/5"
                          : "bg-emerald-950/40 text-emerald-100 rounded-tl-none border border-emerald-500/10"
                      } whitespace-pre-line`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-white/30 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex flex-col mr-auto items-start max-w-[85%]">
                    <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-emerald-950/30 border border-emerald-500/5 text-xs text-white/40 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input section (Mock actions clicker) */}
              <div className="border-t border-white/5 pt-3 p-2 flex flex-col gap-2 bg-black/40">
                <p className="text-[10px] text-white/40 font-mono tracking-wider px-2">Tap below to test Abdul&apos;s responses:</p>
                <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto px-1 pb-1">
                  {CHAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(opt)}
                      disabled={isTyping}
                      className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white px-3 py-1.5 rounded-none transition duration-150 ease-in-out disabled:opacity-50 font-mono"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
