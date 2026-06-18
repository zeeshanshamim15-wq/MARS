import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Bot, Check, Phone } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Message = {
  sender: "user" | "abdul";
  text: string;
  time: string;
};

const CHAT_SCRIPT = [
  { sender: "user", text: "hey abdul log expense ₹1,200 petrol cash" },
  { sender: "abdul", text: "typing" },
  { sender: "abdul", text: "Logged EXP-0042 — ₹1,200 petrol cash. 📝\nAccount: Petty Cash\nLedger Updated." },
  { sender: "user", text: "what is my current balance?" },
  { sender: "abdul", text: "typing" },
  { sender: "abdul", text: "Current Petty Cash Balance: ₹14,800.\nTotal monthly outflow: ₹8,400." },
  { sender: "user", text: "can you draft an invoice for Apex Gym?" },
  { sender: "abdul", text: "typing" },
  { sender: "abdul", text: "Invoice INV-0912 generated successfully for Apex Gym (₹15,000).\nDraft sent to your Whatsapp." },
  { sender: "user", text: "perfect, thank you!" },
  { sender: "abdul", text: "typing" },
  { sender: "abdul", text: "Always operational. Let me know if you need to log anything else." }
];

export default function MarsAIPortal() {
  const portalRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Mascot tracking refs
  const headingRef = useRef<HTMLSpanElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const mascotImgRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState("");

  const handleRedirect = () => {
    window.open("https://mars-ai-web.onrender.com/", "_blank");
  };

  // 1. GSAP ScrollTrigger Reveal
  useEffect(() => {
    const portal = portalRef.current;
    const phone = phoneRef.current;
    const glow = glowRef.current;
    if (!portal || !phone || !glow) return;

    let ctx = gsap.context(() => {
      gsap.set(phone, { y: 120, opacity: 0 });
      gsap.set(glow, { scale: 0.7, opacity: 0.1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: portal,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      tl.to(phone, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
      })
      .to(glow, {
        scale: 1,
        opacity: 0.75,
        duration: 1.2,
        ease: "power2.out",
      }, "-=1.0");
    }, portal);

    return () => ctx.revert();
  }, []);

  // 2. Chat Simulator Loops
  useEffect(() => {
    let active = true;
    let step = 0;

    const runScript = async () => {
      if (!active) return;
      if (step >= CHAT_SCRIPT.length) {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        if (!active) return;
        setMessages([]);
        setCurrentText("");
        step = 0;
        runScript();
        return;
      }

      const currentItem = CHAT_SCRIPT[step];

      if (currentItem.sender === "user") {
        setCurrentText("");
        for (let i = 0; i <= currentItem.text.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 45));
          if (!active) return;
          setCurrentText(currentItem.text.slice(0, i));
        }
        setMessages((prev) => [
          ...prev,
          {
            sender: "user",
            text: currentItem.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setCurrentText("");
        step++;
        runScript();
      } else if (currentItem.sender === "abdul" && currentItem.text === "typing") {
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1400));
        if (!active) return;
        setIsTyping(false);
        step++;
        runScript();
      } else if (currentItem.sender === "abdul") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "abdul",
            text: currentItem.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        await new Promise((resolve) => setTimeout(resolve, 2500));
        if (!active) return;
        step++;
        runScript();
      }
    };

    runScript();
    return () => { active = false; };
  }, []);

  // 3. Scroll chat to bottom
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, currentText, isTyping]);

  // 4. Desktop 3D Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;

    if (phoneRef.current) {
      gsap.to(phoneRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.02,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    if (phoneRef.current) {
      gsap.to(phoneRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto"
      });
    }
  };

  // 5. PREMIUM ZERO-G MASCOT MICRO-INTERACTION (GSAP Engine)
  useEffect(() => {
    let timeline: gsap.core.Timeline;

    const buildTimeline = () => {
      if (timeline) timeline.kill();
      const portal = portalRef.current;
      const phone = phoneRef.current;
      const heading = headingRef.current;
      const mascot = mascotRef.current;
      const mascotImg = mascotImgRef.current;

      if (!portal || !phone || !heading || !mascot || !mascotImg) return;
      const ctaBtn = document.getElementById('mars-cta-button');
      if (!ctaBtn) return;

      const getPositionCoords = (el: HTMLElement) => {
        const elRect = el.getBoundingClientRect();
        const portalRect = portal.getBoundingClientRect();
        const style = window.getComputedStyle(portal);
        const borderLeft = parseFloat(style.borderLeftWidth) || 0;
        const borderTop = parseFloat(style.borderTopWidth) || 0;
        
        const originX = portalRect.left + borderLeft;
        const originY = portalRect.top + borderTop;
        
        return {
          left: elRect.left - originX,
          top: elRect.top - originY,
          width: elRect.width,
          height: elRect.height,
          right: elRect.right - originX,
          bottom: elRect.bottom - originY
        };
      };

      const currentPhoneY = gsap.getProperty(phone, "y");
      gsap.set(phone, { y: 0 });

      const phoneCoords = getPositionCoords(phone);
      const headingCoords = getPositionCoords(heading);
      const buttonCoords = getPositionCoords(ctaBtn);
      const mascotWidth = mascot.offsetWidth || 64;
      const mascotHeight = mascot.offsetHeight || 64;

      gsap.set(phone, { y: currentPhoneY });

      // Scene Coordinates
      const startX = phoneCoords.right - mascotWidth + 10;
      const startY = phoneCoords.top + phoneCoords.height / 2 - mascotHeight / 2;
      
      const walkStartX = phoneCoords.left;
      const walkStartY = phoneCoords.top - mascotHeight;
      const walkEndX = phoneCoords.right - mascotWidth;
      
      const hangX = headingCoords.left + headingCoords.width / 2 - mascotWidth / 2;
      const hangY = headingCoords.bottom; 
      
      const landX = buttonCoords.left + buttonCoords.width / 2 - mascotWidth / 2;
      const landY = buttonCoords.top - mascotHeight + 5; 
      const peakY = Math.min(walkStartY, hangY) - 160; 

      // Reset
      gsap.set(mascot, { opacity: 1, autoAlpha: 1, x: startX, y: startY, scale: 1, rotation: 0, zIndex: 0 });
      gsap.set(mascotImg, { y: 0 });

      timeline = gsap.timeline({
        repeat: -1,
        onRepeat: () => {
          gsap.set(mascot, { x: startX, y: startY, opacity: 0, autoAlpha: 0, scale: 1, rotation: 0, zIndex: 0, transformOrigin: "center center" });
        }
      });

      // Scene 1: The Smooth Zero-G Peek
      timeline.set(mascot, { opacity: 1, autoAlpha: 1, x: startX, y: startY, rotation: 0, zIndex: 0, transformOrigin: "bottom center" })
        .to(mascot, { x: startX + 45, rotation: 8, duration: 1.2, ease: "power2.out" }) 
        .to(mascot, {}, "+=1.5") // hold
        .to(mascot, { x: startX, rotation: 0, duration: 0.5, ease: "power2.inOut" }); 

      // Scene 2: The Levitation (Float up to phone edge)
      timeline.set(mascot, { zIndex: 50, x: walkStartX - 20, y: walkStartY + 50, rotation: -10 }) 
        .to(mascot, { y: walkStartY, rotation: 0, duration: 1.5, ease: "sine.out" });

      // Scene 3: The Lunar Hover-Fly (Floating across the phone)
      timeline.to(mascot, {
          x: walkEndX,
          duration: 4.5,
          ease: "power1.inOut"
        }, "hover")
        .to(mascot, {
          y: walkStartY - 15,
          duration: 2.25,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut"
        }, "hover");

      // Scene 4: The Space Pendulum (Leap & Hang)
      timeline.to(mascot, { x: hangX, duration: 1.8, ease: "power1.inOut" }, "leap")
        .to(mascot, { y: peakY, duration: 0.9, ease: "sine.out" }, "leap") 
        .to(mascot, { y: hangY, duration: 0.9, ease: "sine.in" }, "leap+=0.9")
        .call(() => { gsap.set(mascot, { transformOrigin: "top center" }); })
        .to(mascot, { rotation: 15, duration: 0.8, ease: "power1.inOut" })
        .to(mascot, { rotation: -8, duration: 0.8, ease: "power1.inOut" })
        .to(mascot, { rotation: 0, duration: 0.8, ease: "power1.inOut" });

      // Scene 5: The Gentle Lunar Landing
      timeline.to(mascot, { x: landX, y: landY, duration: 1.2, ease: "power2.in" }) 
        .call(() => { gsap.set(mascot, { transformOrigin: "bottom center" }); })
        .to(mascot, { scaleY: 0.85, scaleX: 1.1, duration: 0.15, ease: "power1.out" }) // Soft squash
        .to(mascot, { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }); 

      // Scene 6: The Action Hover & Tap
      // Since the astronaut's hand is raised, a tilt forward creates the perfect tap illusion
      timeline.to(mascot, { y: "-=15", duration: 0.6, ease: "sine.out" }) // Float up slightly to prep
        .to(mascot, { rotation: 22, x: "+=12", y: "+=18", duration: 0.25, ease: "power2.in" }) // FAST TAP IN
        .to(mascot, { rotation: 0, x: "-=12", y: landY, duration: 0.6, ease: "back.out(1.2)" }, "+=0.15"); // Float back to resting

      // Scene 7: Fade into the Cosmos
      timeline.to(mascot, { y: "-=40", opacity: 0, autoAlpha: 0, duration: 1.5, ease: "power1.in" }, "+=0.5") 
        .to({}, { duration: 1.0 }) // Buffer
        .set(mascot, { x: startX, y: startY, opacity: 0, autoAlpha: 0, scale: 1, rotation: 0, zIndex: 0 });
    };

    const timer = setTimeout(buildTimeline, 1600);
    window.addEventListener("resize", buildTimeline);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", buildTimeline);
      if (timeline) timeline.kill();
    };
  }, []);

  return (
    <section
      ref={portalRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center px-6 py-24 text-white border-t border-b border-white/5 select-none bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,rgba(0,0,0,0)_70%)]"
    >
      {/* Cinematic Pulsing Neon Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none z-0 animate-pulse"
      />
      
      {/* Floating Micro-Interaction Mascot Container - THE GSAP TARGET */}
      <div
        ref={mascotRef}
        className="absolute top-0 left-0 pointer-events-none z-[9999] w-24 h-24 opacity-0 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
        style={{ willChange: "transform" }}
      >
        {/* The Premium Static MARS Astronaut (Animated via Zero-G GSAP Math) */}
        {/* Cleaned up: Removed the green background blur div and the green image drop-shadow */}
        <img
          ref={mascotImgRef}
          src="/mars-agent.png" 
          alt="MARS AI Agent"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* 50/50 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Column: Visual Hook (Phone) */}
          <div className="flex justify-center items-center order-2 md:order-1 w-full">
            <div
              ref={phoneRef}
              style={{ transformStyle: "preserve-3d" }}
              className="relative z-10 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] aspect-[9/18.5] rounded-[36px] sm:rounded-[44px] border border-white/15 bg-black/80 p-2.5 shadow-2xl flex flex-col overflow-hidden backdrop-blur-md transition-shadow hover:shadow-emerald-500/10 max-h-[65vh] md:max-h-[75vh] antialiased subpixel-antialiased mx-auto"
            >
              {/* Top Camera Notch */}
              <div className="absolute top-0 inset-x-0 h-4 flex justify-center items-center pointer-events-none z-30">
                <div className="w-24 h-3 bg-black rounded-b-xl border border-white/10 border-t-0" />
              </div>
              
              {/* Interactive Screen Reflection Layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 pointer-events-none z-20" />
              
              {/* Phone Header */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-2.5 pt-3 px-3 bg-zinc-950/40">
                <div className="relative h-8 w-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
                  A
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-black" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-[11px] font-semibold text-white leading-tight">Abdul (AI Accountant)</h4>
                  <p className="text-[8px] text-emerald-400 font-mono tracking-wide">MARS AI Employee · Online</p>
                </div>
                <div className="text-[8px] text-white/40 uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded-none font-mono">
                  WA_API
                </div>
              </div>
              
              {/* Chat Messages Viewport */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-zinc-950/20 scrollbar-none select-none">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-3.5 py-2 text-[10px] sm:text-[11.5px] leading-relaxed antialiased ${
                        msg.sender === "user"
                          ? "bg-white/10 text-white rounded-tr-none border border-white/5"
                          : "bg-emerald-950/50 text-emerald-100 rounded-tl-none border border-emerald-500/10"
                      } whitespace-pre-line text-left`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[7.5px] text-white/30 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
                {currentText && (
                  <div className="flex flex-col max-w-[85%] ml-auto items-end">
                    <div className="rounded-2xl rounded-tr-none px-3.5 py-2 bg-white/10 text-white border border-white/5 text-[10px] sm:text-[11.5px] text-left antialiased">
                      {currentText}
                      <span className="inline-block w-1.5 h-3 bg-white animate-pulse ml-0.5" />
                    </div>
                  </div>
                )}
                {isTyping && (
                  <div className="flex flex-col mr-auto items-start max-w-[85%]">
                    <div className="rounded-2xl rounded-tl-none px-3.5 py-2.5 bg-emerald-950/30 border border-emerald-500/5 text-xs text-white/40 flex items-center gap-1.5">
                      <span className="h-1 w-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1 w-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1 w-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Phone Footer Mock Input bar */}
              <div className="border-t border-white/5 pt-2.5 pb-3.5 p-2 bg-zinc-950/30 text-left px-3 flex items-center justify-between">
                <span className="text-[9px] text-white/30 font-mono">Simulating real-time operations...</span>
                <Phone className="h-3 w-3 text-white/30" />
              </div>
            </div>
          </div>
          
          {/* Right Column: Copy & CTA */}
          <div className="space-y-6 text-left order-1 md:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] sm:text-xs text-emerald-400 tracking-wider">
                <Bot className="h-3.5 w-3.5 animate-pulse" />
                ENTER THE ECOSYSTEM
              </div>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
                Meet the Core of <br className="hidden md:inline" />
                <span ref={headingRef} className="font-semibold metallic-text-sweep">MARS AI</span>
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                Deploy autonomous digital staff that execute live bookkeeping, database syncing, and client outreach—all through simple WhatsApp threads.
              </p>
            </div>
            
            {/* Premium feature list */}
            <div className="space-y-3 border-t border-b border-white/5 py-6">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-xs sm:text-sm text-white/80 font-medium">WhatsApp-Based Bookkeeping</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-xs sm:text-sm text-white/80 font-medium">Autonomous Invoice Generation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-xs sm:text-sm text-white/80 font-medium">Real-time Database Syncing</span>
              </div>
            </div>
            
            {/* Glowing CTA Button */}
            <div className="pt-2">
              <button
                id="mars-cta-button"
                onClick={handleRedirect}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white text-black hover:bg-white/90 text-sm font-semibold transition-all duration-300 shadow-xl shadow-white/5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>✨ Access MARS AI Console</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          
        </div>
        
        {/* Mobile-Only Pulsing CTA Button */}
        <div className="w-full max-w-[280px] md:hidden mt-8 mx-auto">
          <button
            onClick={handleRedirect}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-xs uppercase tracking-widest font-semibold text-emerald-300 animate-pulse flex items-center justify-center gap-2 hover:bg-emerald-500/30 transition-all"
          >
            <span>✨ TAP TO ENTER MARS AI</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
