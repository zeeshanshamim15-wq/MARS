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

  // Handle redirect to external MARS AI website
  const handleRedirect = () => {
    window.open("https://mars-ai-web.onrender.com/", "_blank");
  };

  // 1. GSAP ScrollTrigger Reveal on viewport enter
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
        // Pause at the end, clear chat, restart
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
        // Simulate real-time typing for user message
        setCurrentText("");
        for (let i = 0; i <= currentItem.text.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 45));
          if (!active) return;
          setCurrentText(currentItem.text.slice(0, i));
        }

        // Complete user typing and push message to chat list
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
        // Simulate abdul typing delay
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1400));
        if (!active) return;
        setIsTyping(false);
        step++;
        runScript();
      } else if (currentItem.sender === "abdul") {
        // Display abdul response
        setMessages((prev) => [
          ...prev,
          {
            sender: "abdul",
            text: currentItem.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        // Delay to read message
        await new Promise((resolve) => setTimeout(resolve, 2500));
        if (!active) return;
        step++;
        runScript();
      }
    };

    runScript();

    return () => {
      active = false;
    };
  }, []);

  // 3. Scroll chat message list to bottom (inner container only)
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, currentText, isTyping]);

  // 4. Desktop 3D Mouse Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // Mobile safeguard: disable tilt

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
        scale: 1.02, // Minimal scale to avoid text blurry scaling
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

  // 5. Mascot Micro-Interaction GSAP Timeline Loop
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

      // Coordinates translation relative to the portal's padding box top-left corner (accounts for padding/borders & window scroll)
      const getPositionCoords = (el: HTMLElement) => {
        const elRect = el.getBoundingClientRect();
        const portalRect = portal.getBoundingClientRect();
        const style = window.getComputedStyle(portal);
        const borderLeft = parseFloat(style.borderLeftWidth) || 0;
        const borderTop = parseFloat(style.borderTopWidth) || 0;
        
        // DO NOT SUBTRACT PADDING. absolute anchors to the padding-box edge.
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

      // Temporarily force the phone to its final resting state to get true coordinates
      const currentPhoneY = gsap.getProperty(phone, "y");
      gsap.set(phone, { y: 0 });

      // Extract true coordinates
      const phoneCoords = getPositionCoords(phone);
      const headingCoords = getPositionCoords(heading);
      const buttonCoords = getPositionCoords(ctaBtn);
      const mascotWidth = mascot.offsetWidth || 64; // Fallback to 64px if unrendered
      const mascotHeight = mascot.offsetHeight || 64; // Fallback to 64px if unrendered

      // Restore the phone back to whatever its ScrollTrigger state currently is
      gsap.set(phone, { y: currentPhoneY });

      // 1. Starting hidden coords (behind middle-right edge of phone)
      // Sits directly on the boundary (completely hidden behind the right edge of the phone)
      const startX = phoneCoords.right - mascotWidth;
      const startY = phoneCoords.top + phoneCoords.height / 2 - mascotHeight / 2;

      // 2. Climb & Walk coordinates (top border of phone)
      const walkStartX = phoneCoords.left;
      const walkStartY = phoneCoords.top - mascotHeight;
      const walkEndX = phoneCoords.right - mascotWidth;

      // 3. Leap & Hang target (attaches to bottom of green heading)
      const hangX = headingCoords.left + headingCoords.width / 2 - mascotWidth / 2;
      const hangY = headingCoords.bottom; // exact bottom of letters to hang from it

      // 4. Land target (Access Console button)
      const landX = buttonCoords.left + buttonCoords.width / 2 - mascotWidth / 2;
      const landY = buttonCoords.top - mascotHeight; // exact top of the button

      const peakY = Math.min(walkStartY, hangY) - 140; // Force an arc 140px higher than the highest element

      // Force initial GSAP state immediately before animations begin
      gsap.set(mascot, { opacity: 1, autoAlpha: 1, x: startX, y: startY, scale: 1, scaleX: 1, scaleY: 1, rotation: 0, rotationZ: 0 });
      gsap.set(mascotImg, { y: 0 });

      timeline = gsap.timeline({
        repeat: -1,
        onRepeat: () => {
          gsap.set(mascotImg, { y: 0 });
          gsap.set(mascot, {
            x: startX,
            y: startY,
            opacity: 0,
            autoAlpha: 0,
            scale: 1,
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            rotationZ: 0,
            zIndex: 0,
            transformOrigin: "bottom center"
          });
        }
      });

      // Scene 1: The BGMI Peek
      timeline.set(mascot, { opacity: 1, autoAlpha: 1, x: startX, y: startY, scale: 1, scaleX: 1, scaleY: 1, rotation: 0, rotationZ: 0, zIndex: 0, transformOrigin: "bottom center" })
        .to(mascot, { x: startX + 40, duration: 1.0, ease: "power3.out" }) // duration: 1 to slide out
        .to(mascot, {}, "+=2.0") // explicit 2-second pause before it slides back in
        .to(mascot, { x: startX, duration: 0.2, ease: "power4.in" }); // slides back in to startX

      // Scene 2: The Muscle-Up
      timeline.set(mascot, { zIndex: 50, x: walkStartX, y: walkStartY + 30, rotation: -15, rotationZ: -15, transformOrigin: "bottom left" }) // Teleport slightly lower with -15deg tilt
        .to(mascot, { y: walkStartY, rotation: 0, rotationZ: 0, duration: 1.0, ease: "power2.out" }); // Slowly pull body up over 1 second

      // Scene 3: The Balance Walk
      timeline.call(() => {
          // Rapid but subtle rotation wobble to simulate struggling for balance
          gsap.fromTo(mascot, 
            { rotation: -5, rotationZ: -5 },
            { rotation: 5, rotationZ: 5, duration: 0.15, yoyo: true, repeat: 25, ease: "sine.inOut" }
          );
        })
        .to(mascot, {
          x: walkEndX,
          duration: 4.0, // Slow and cautious walk over 4 seconds
          ease: "none"
        })
        .set(mascot, { rotation: 0, rotationZ: 0 }); // Reset rotation

      // Scene 4: The Parkour Leap & Hang
      timeline.to(mascot, { x: hangX, duration: 1.5, ease: "power1.inOut" }, "leap")
        .to(mascot, { y: peakY, duration: 0.75, ease: "power2.out" }, "leap") // Fly up to the true peak
        .to(mascot, { y: hangY, duration: 0.75, ease: "power2.in" }, "leap+=0.75")
      .call(() => {
        gsap.set(mascot, { transformOrigin: "top center" });
      })
      .to(mascot, {
        rotation: 20,
        rotationZ: 20,
        duration: 0.1,
        ease: "power1.out"
      })
      .to(mascot, {
        rotation: -12,
        rotationZ: -12,
        duration: 0.4,
        ease: "power1.inOut"
      })
      .to(mascot, {
        rotation: 0,
        rotationZ: 0,
        duration: 2.0, // Decaying swing over 2 seconds of dangling struggle
        ease: "elastic.out(1, 0.4)"
      });

      // Scene 5: The Heavy Drop & Recover
      timeline.to(mascot, {
        x: landX,
        y: landY,
        duration: 0.5,
        ease: "power2.in" // Heavy gravity fall
      })
      .call(() => {
        gsap.set(mascot, { transformOrigin: "bottom center" });
      })
      .to(mascot, { scaleY: 0.5, scaleX: 1.4, duration: 0.08, ease: "power1.out" }) // heavy squash
      .to(mascot, { scaleY: 1, scaleX: 1, duration: 0.5, ease: "power2.out" }); // slowly stand back up (0.5s stretch back)

      // Scene 6: The Friendly Wave & Deliberate Tap
      timeline.to(mascot, { rotation: 15, duration: 0.3, ease: "power1.inOut" }) // Wave right
        .to(mascot, { rotation: -15, duration: 0.3, yoyo: true, repeat: 3, ease: "power1.inOut" }) // Friendly slow wave
        .to(mascot, { rotation: 0, duration: 0.3, ease: "power1.out" }) // Back to center
        // The TAP: Lean forward, shift right, and push down slightly
        .to(mascot, { rotation: 25, x: "+=15", y: "+=10", duration: 0.5, ease: "power2.inOut" }) 
        // Hold the tap for a split second, then release back to center
        .to(mascot, { rotation: 0, x: "-=15", y: "-=10", duration: 0.4, ease: "back.out(1.5)" }, "+=0.2"); 

      // Scene 7: The 'Tata' (Goodbye) & Console Hide
      timeline.to(mascot, { rotation: 10, duration: 0.15, yoyo: true, repeat: 3 }, "+=0.3") // Quick goodbye wiggle
        // SINK DOWN: Move y down by 70px to fully sink behind/under the console button before fading
        .to(mascot, { y: "+=70", opacity: 0, autoAlpha: 0, duration: 1.0, ease: "power2.in" }) 
        // EXACTLY 1.0 SECOND DELAY: Blank tween to pause before the timeline loops back to the Peek
        .to({}, { duration: 1.0 }) 
        // Final Reset for the next loop
        .set(mascot, { x: startX, y: startY, opacity: 0, autoAlpha: 0, scale: 1, scaleX: 1, scaleY: 1, rotation: 0, rotationZ: 0, zIndex: 0, transformOrigin: "bottom center" });
    };

    // Tiny timeout on mount to ensure correct coordinates from bounding client rects
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
      onClick={handleRedirect}
      className="relative flex flex-col items-center justify-center px-6 py-24 text-white border-t border-b border-white/5 overflow-hidden cursor-pointer select-none bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,rgba(0,0,0,0)_70%)]"
    >
      {/* Cinematic Pulsing Neon Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none z-0 animate-pulse"
      />

      {/* Floating Micro-Interaction Mascot Container */}
      <div
        ref={mascotRef}
        className="absolute top-0 left-0 pointer-events-none z-0 w-16 h-16 opacity-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        style={{ willChange: "transform" }}
      >
        {/* Glow behind mascot */}
        <div className="absolute inset-0 bg-emerald-500/10 rounded-full filter blur-[10px] pointer-events-none" />
        
        {/* Debug Mascot for Testing Physics */}
        <div
          ref={mascotImgRef}
          id="mars-debug-mascot"
          className="w-16 h-16 bg-red-500 rounded-full border-4 border-white absolute z-[9999] shadow-[0_0_20px_rgba(255,0,0,0.8)] top-0 left-0"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* 50/50 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Column: Visual Hook (Phone) */}
          <div className="flex justify-center items-center order-2 md:order-1 w-full">
            {/* Native Tailwind dimensions, no custom CSS scale() transform to prevent blurriness */}
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

                {/* Display user message in progress typing */}
                {currentText && (
                  <div className="flex flex-col max-w-[85%] ml-auto items-end">
                    <div className="rounded-2xl rounded-tr-none px-3.5 py-2 bg-white/10 text-white border border-white/5 text-[10px] sm:text-[11.5px] text-left antialiased">
                      {currentText}
                      <span className="inline-block w-1.5 h-3 bg-white animate-pulse ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Typing status dots */}
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
                <span ref={headingRef} className="font-semibold text-emerald-400">MARS AI</span>
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

        {/* Mobile-Only Pulsing CTA Button (Safety Fallback) */}
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
