import { useEffect, useRef, useState, useId } from "react";
import { gsap } from "gsap";

export default function BorderLaserCard({
  children,
  className = "",
  borderRadius = 24,
  duration = 5,
  id
}: {
  children: React.ReactNode;
  className?: string;
  borderRadius?: number;
  duration?: number;
  id?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<SVGRectElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const uniqueId = useId();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const target = entry.target as HTMLElement;
        setDimensions({
          width: target.offsetWidth,
          height: target.offsetHeight
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const perimeter = 2 * (dimensions.width + dimensions.height);
  const laserLength = Math.min(120, perimeter * 0.15); // Dynamic laser length based on card size

  useEffect(() => {
    const laser = laserRef.current;
    if (!laser || perimeter === 0) return;

    // Set initial dasharray and offset
    gsap.set(laser, {
      strokeDasharray: `${laserLength} ${perimeter - laserLength}`,
      strokeDashoffset: 0
    });

    // Infinitely animate the dashoffset around the rect
    const tween = gsap.to(laser, {
      strokeDashoffset: -perimeter,
      duration: duration,
      ease: "none",
      repeat: -1
    });

    return () => {
      tween.kill();
    };
  }, [perimeter, laserLength, duration]);

  // Clean IDs for SVGs to prevent duplicate target conflicts
  const gradientId = `laserGradient-${uniqueId.replace(/:/g, "")}`;
  const glowId = `laserGlow-${uniqueId.replace(/:/g, "")}`;

  return (
    <div
      id={id}
      ref={cardRef}
      className={`relative overflow-hidden crt-scanline hologram-grid ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        background: "#0D0D0D"
      }}
    >
      {/* SVG Border Overlay */}
      {dimensions.width > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ borderRadius: `${borderRadius}px` }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#262626" stopOpacity="0" />
              <stop offset="45%" stopColor="#E8EDF5" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="55%" stopColor="#E8EDF5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#262626" stopOpacity="0" />
            </linearGradient>
            <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Static Border */}
          <rect
            x="0.5"
            y="0.5"
            width={dimensions.width - 1}
            height={dimensions.height - 1}
            rx={borderRadius}
            fill="none"
            stroke="#262626"
            strokeWidth="1"
          />

          {/* Traveling Laser Line */}
          <rect
            ref={laserRef}
            x="0.5"
            y="0.5"
            width={dimensions.width - 1}
            height={dimensions.height - 1}
            rx={borderRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.5"
            filter={`url(#${glowId})`}
          />
        </svg>
      )}

      {/* Card Content wrapper */}
      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </div>
  );
}
