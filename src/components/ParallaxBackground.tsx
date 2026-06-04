import { useEffect, useRef, useCallback } from "react";

/**
 * Cursor-driven parallax background.
 *
 * Renders a full-viewport fixed background image that shifts subtly
 * in the opposite direction of the cursor, creating a depth illusion.
 * The image is scaled slightly larger than the viewport to allow
 * room for the parallax movement without revealing edges.
 */

const PARALLAX_STRENGTH = 25; // max px of shift
const EASE = 0.08;            // lerp factor per frame

export default function ParallaxBackground({ src = "/nebula.jpg" }: { src?: string }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  const animate = useCallback(() => {
    current.current.x += (target.current.x - current.current.x) * EASE;
    current.current.y += (target.current.y - current.current.y) * EASE;

    if (imgRef.current) {
      imgRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) scale(1.08)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      /* normalize to [-1, 1] */
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      /* move opposite to cursor direction */
      target.current.x = -nx * PARALLAX_STRENGTH;
      target.current.y = -ny * PARALLAX_STRENGTH;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden"
    >
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          inset: "-4%",
          width: "108%",
          height: "108%",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
          transform: "translate3d(0, 0, 0) scale(1.08)",
        }}
      />
    </div>
  );
}
