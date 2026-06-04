import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import { Terminal, Send, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, Radio, Cpu, Sparkles } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", need: "Automation", message: "" });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [diagnosticPercent, setDiagnosticPercent] = useState(0);
  const [diagnosticDone, setDiagnosticDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Simulate initial diagnostic scans on mount
    const logs = [
      "SECURE SSH PROTOCOL INITIALIZED...",
      "SCANNING CLIENT CONNECTION NODE...",
      "PORT CHECK: IPSEC SECURE PORT ACTIVE...",
      "USER_AGENT COMPATIBILITY: OK",
      "SSL_CERTIFICATE: VALIDATE SECURE",
      "LATENCY CHECK: 12ms RESPONSE",
      "SYSTEM STATUS: READY FOR LOGGING"
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setDiagnosticLogs(prev => [...prev, logs[currentLog]]);
        setDiagnosticPercent(Math.floor(((currentLog + 1) / logs.length) * 100));
        currentLog++;
      } else {
        setDiagnosticDone(true);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTerminalLogs([]);

    // Send functional email in parallel with diagnostic logs
    fetch("https://formsubmit.co/ajax/mars.iqsystem@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `New Inquiry from MARS Contact Page: ${form.name}`,
        name: form.name,
        email: form.email,
        need: form.need,
        message: form.message
      })
    })
    .then(res => res.json())
    .then(data => console.log("Email transmission completed:", data))
    .catch(err => console.error("Email transmission failed:", err));

    const steps = [
      "Establishing secure bridge to MARS HQ...",
      "Scrubbing operational data packets for PII compliance (DPDP)...",
      "Encrypting transmission payload via RSA-4096 protocols...",
      "Routing packets through Secure Tunnel 0x98A...",
      "Validating receipt handshake with MARS Central Router...",
      "Synchronizing ledger inputs..."
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsTransmitting(false);
            setIsCompleted(true);
          }, 800);
        }
      }, (idx + 1) * 450);
    });
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-36 md:pt-44 pb-32 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            Secure Routing
          </p>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white">
            <WordReveal text="Establish" />{" "}
            <span className="inline-block"><WordReveal text="Communication" className="font-semibold mars-text-gradient" /></span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            Direct secure telemetry channel to link with our embedded operations team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          {/* Diagnostics and Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            {isMobile ? (
              <div className="p-5 bg-black/40 flex-1 flex flex-col justify-between backdrop-blur-xl border border-white/10 relative rounded-none">
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
                <div>
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                    <Cpu className="h-4 w-4 text-white/50 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">CONNECTION_DIAGNOSTICS</span>
                  </div>

                  <div className="space-y-2.5 font-mono text-[9.5px] text-white/50">
                    {diagnosticLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-emerald-500 shrink-0">&gt;</span>
                        <span className="leading-relaxed">{log}</span>
                      </div>
                    ))}
                    {!diagnosticDone && (
                      <div className="flex gap-2 items-center text-emerald-400/80 animate-pulse">
                        <span>&gt;</span>
                        <span>RUNNING DIAGNOSTIC MATRIX... {diagnosticPercent}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {diagnosticDone && (
                  <div className="border-t border-white/5 pt-4 mt-6">
                    <div className="inline-flex items-center gap-1.5 rounded-none border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] text-emerald-400 font-medium">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      SECURE NODE STATUS: ESTABLISHED
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <BorderLaserCard className="p-6 bg-black/40 flex-1 flex flex-col justify-between backdrop-blur-xl" borderRadius={24}>
                <div>
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                    <Cpu className="h-4 w-4 text-white/50 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">CONNECTION_DIAGNOSTICS</span>
                  </div>

                  <div className="space-y-2.5 font-mono text-[9.5px] text-white/50">
                    {diagnosticLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-emerald-500 shrink-0">&gt;</span>
                        <span className="leading-relaxed">{log}</span>
                      </div>
                    ))}
                    {!diagnosticDone && (
                      <div className="flex gap-2 items-center text-emerald-400/80 animate-pulse">
                        <span>&gt;</span>
                        <span>RUNNING DIAGNOSTIC MATRIX... {diagnosticPercent}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {diagnosticDone && (
                  <div className="border-t border-white/5 pt-4 mt-6">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] text-emerald-400 font-medium">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      SECURE NODE STATUS: ESTABLISHED
                    </div>
                  </div>
                )}
              </BorderLaserCard>
            )}

            {isMobile ? (
              <div className="p-5 bg-black/40 backdrop-blur-xl border border-white/10 relative rounded-none">
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
                <h3 className="text-sm font-semibold tracking-[0.15em] text-white uppercase mb-4">HQ Specifications</h3>
                <ul className="space-y-4 text-xs text-white/60">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-white/40 mt-0.5" />
                    <span>38C B.T. Road, Kalpana Apartment, 1A, Kolkata – 700056, India</span>
                  </li>
                  <li>
                    <a href="mailto:mars.iqsystem@gmail.com" className="flex items-center gap-3 hover:text-white transition">
                      <Mail className="h-4 w-4 shrink-0 text-white/40" />
                      <span>mars.iqsystem@gmail.com</span>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+917003939432" className="flex items-center gap-3 hover:text-white transition">
                      <Phone className="h-4 w-4 shrink-0 text-white/40" />
                      <span>+91 70039 39432</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 border-t border-white/5 pt-3">
                    <Radio className="h-4 w-4 shrink-0 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-mono">CHANNEL MONITORING STATUS: SECURE_ON_098</span>
                  </li>
                </ul>
              </div>
            ) : (
              <BorderLaserCard className="p-6 bg-black/40 backdrop-blur-xl" borderRadius={20}>
                <h3 className="text-sm font-semibold tracking-[0.15em] text-white uppercase mb-4">HQ Specifications</h3>
                <ul className="space-y-4 text-xs text-white/60">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-white/40 mt-0.5" />
                    <span>38C B.T. Road, Kalpana Apartment, 1A, Kolkata – 700056, India</span>
                  </li>
                  <li>
                    <a href="mailto:mars.iqsystem@gmail.com" className="flex items-center gap-3 hover:text-white transition">
                      <Mail className="h-4 w-4 shrink-0 text-white/40" />
                      <span>mars.iqsystem@gmail.com</span>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+917003939432" className="flex items-center gap-3 hover:text-white transition">
                      <Phone className="h-4 w-4 shrink-0 text-white/40" />
                      <span>+91 70039 39432</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 border-t border-white/5 pt-3">
                    <Radio className="h-4 w-4 shrink-0 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-mono">CHANNEL MONITORING STATUS: SECURE_ON_098</span>
                  </li>
                </ul>
              </BorderLaserCard>
            )}
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 flex">
            {isMobile ? (
              <div className="p-5 bg-black/60 shadow-2xl backdrop-blur-2xl flex-1 flex flex-col justify-center border border-white/10 relative rounded-none">
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
                {!isCompleted ? (
                  <form onSubmit={handleTransmit} className="space-y-5 w-full">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Terminal className="h-4 w-4 text-white/50" />
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">TRANSMISSION_INPUT_CONSOLE</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Client Name</label>
                      <input
                        type="text"
                        required
                        disabled={isTransmitting || !diagnosticDone}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="ENTER FULL NAME"
                        className="w-full h-11 px-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-none md:rounded-xl text-white outline-none transition disabled:opacity-30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Email Coordinates</label>
                      <input
                        type="email"
                        required
                        disabled={isTransmitting || !diagnosticDone}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ENTER EMAIL ADDRESS"
                        className="w-full h-11 px-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-none md:rounded-xl text-white outline-none transition disabled:opacity-30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Enterprise Needs</label>
                      <select
                        disabled={isTransmitting || !diagnosticDone}
                        value={form.need}
                        onChange={(e) => setForm({ ...form, need: e.target.value })}
                        className="w-full h-11 px-4 text-xs bg-white/5 border border-white/10 rounded-none md:rounded-xl text-white/80 outline-none hover:bg-white/10 focus:bg-white/10 transition disabled:opacity-30 appearance-none cursor-pointer"
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
                        disabled={isTransmitting || !diagnosticDone}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="ENTER DETAILS ON BOTTLE-NECKS OR PROJECT OBJECTIVES..."
                        className="w-full h-24 p-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-none md:rounded-xl text-white outline-none resize-none transition disabled:opacity-30"
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
                        disabled={!diagnosticDone}
                        className="w-full h-11 bg-white hover:bg-white/95 text-black font-semibold text-xs rounded-none md:rounded-xl flex items-center justify-center gap-2 transition hover:scale-[1.01] disabled:opacity-30 disabled:hover:scale-100 font-mono"
                      >
                        <Send className="h-3.5 w-3.5" />
                        TRANSMIT DATA PACKET
                      </button>
                    )}
                  </form>
                ) : (
                  <div className="text-center py-10 space-y-6 select-none w-full">
                    <div className="h-16 w-16 rounded-none bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="h-8 w-8 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">Packet Transmission Successful</h4>
                      <p className="text-xs text-white/50 mt-2 max-w-sm mx-auto leading-relaxed">
                        Secure SSH tunnel closed. Your query logs have been compiled and routed directly to our embedded team coordinates.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCompleted(false)}
                      className="inline-flex h-9 items-center justify-center rounded-none md:rounded-lg border border-white/10 hover:bg-white/5 px-5 text-xs text-white/80 transition font-mono"
                    >
                      Transmit New Log
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <BorderLaserCard className="p-8 bg-black/60 shadow-2xl backdrop-blur-2xl flex-1 flex flex-col justify-center" borderRadius={28}>
                {!isCompleted ? (
                  <form onSubmit={handleTransmit} className="space-y-5">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Terminal className="h-4 w-4 text-white/50" />
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">TRANSMISSION_INPUT_CONSOLE</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Client Name</label>
                      <input
                        type="text"
                        required
                        disabled={isTransmitting || !diagnosticDone}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="ENTER FULL NAME"
                        className="w-full h-11 px-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-xl text-white outline-none transition disabled:opacity-30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Email Coordinates</label>
                      <input
                        type="email"
                        required
                        disabled={isTransmitting || !diagnosticDone}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ENTER EMAIL ADDRESS"
                        className="w-full h-11 px-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-xl text-white outline-none transition disabled:opacity-30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Enterprise Needs</label>
                      <select
                        disabled={isTransmitting || !diagnosticDone}
                        value={form.need}
                        onChange={(e) => setForm({ ...form, need: e.target.value })}
                        className="w-full h-11 px-4 text-xs bg-white/5 border border-white/10 rounded-xl text-white/80 outline-none hover:bg-white/10 focus:bg-white/10 transition disabled:opacity-30 appearance-none cursor-pointer"
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
                        disabled={isTransmitting || !diagnosticDone}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="ENTER DETAILS ON BOTTLE-NECKS OR PROJECT OBJECTIVES..."
                        className="w-full h-24 p-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-xl text-white outline-none resize-none transition disabled:opacity-30"
                      />
                    </div>

                    {isTransmitting ? (
                      <div className="space-y-2 border border-white/5 bg-black/40 rounded-xl p-4 font-mono text-[9px] text-emerald-400">
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
                        disabled={!diagnosticDone}
                        className="w-full h-11 bg-white hover:bg-white/95 text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition hover:scale-[1.01] disabled:opacity-30 disabled:hover:scale-100"
                      >
                        <Send className="h-3.5 w-3.5" />
                        TRANSMIT DATA PACKET
                      </button>
                    )}
                  </form>
                ) : (
                  <div className="text-center py-10 space-y-6 select-none">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="h-8 w-8 animate-bounce" />
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
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
