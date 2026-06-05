import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SYMBOLS = "!@#$%^&*?XZ79";

export default function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = text.split("");
    const length = chars.length;
    const obj = { progress: 0 };

    const tl = gsap.to(obj, {
      progress: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
        fastScrollEnd: true,
      },
      onUpdate: () => {
        const p = obj.progress;
        const resolved = chars.map((char, index) => {
          if (char === " ") return " ";
          
          const threshold = index / length;
          if (p >= threshold) {
            // Lock in letters progressively
            if (p >= threshold + 0.08 || index === 0) {
              return char;
            }
          }
          // Shuffle letters rapidly
          return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        });
        setDisplayText(resolved.join(""));
      },
      onComplete: () => {
        setDisplayText(text);
      }
    });

    return () => {
      tl.kill();
    };
  }, [text]);

  return (
    <span ref={containerRef} className={`inline-block select-none ${className}`}>
      {displayText}
    </span>
  );
}
