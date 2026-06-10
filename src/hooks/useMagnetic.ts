import { useEffect, useRef } from "react";

export function useMagnetic(strength = 0.35, threshold = 100) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold) {
        // Apply magnetic pull proportional to cursor closeness
        const factor = (1 - distance / threshold) * strength;
        const x = dx * factor;
        const y = dy * factor;

        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      } else {
        // Reset when outside of threshold
        el.style.setProperty("--x", "0px");
        el.style.setProperty("--y", "0px");
        el.style.transform = "translate3d(0px, 0px, 0)";
      }
    };

    const handleMouseLeave = () => {
      el.style.setProperty("--x", "0px");
      el.style.setProperty("--y", "0px");
      el.style.transform = "translate3d(0px, 0px, 0)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, threshold]);

  return ref;
}

export default useMagnetic;
