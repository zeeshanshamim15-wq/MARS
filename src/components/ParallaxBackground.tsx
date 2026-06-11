import { useEffect, useRef, useCallback } from "react";

/**
 * Parallax background driven by desktop mouse pointer or mobile gyroscope.
 *
 * Renders a full-viewport fixed background image that shifts subtly
 * in the opposite direction of the cursor/tilt, creating a depth illusion.
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

  const isAnimating = useRef(false);

  const animate = useCallback(() => {
    const dx = target.current.x - current.current.x;
    const dy = target.current.y - current.current.y;

    if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
      current.current.x += dx * EASE;
      current.current.y += dy * EASE;

      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) scale(1.08)`;
      }
      rafId.current = requestAnimationFrame(animate);
    } else {
      current.current.x = target.current.x;
      current.current.y = target.current.y;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) scale(1.08)`;
      }
      isAnimating.current = false;
    }
  }, []);

  const triggerAnimation = useCallback(() => {
    if (!isAnimating.current) {
      isAnimating.current = true;
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    // Desktop mousemove listener
    const handleMove = (e: PointerEvent) => {
      // Ignore touch gestures to avoid conflicts with gyroscope parallax
      if (e.pointerType === "touch") return;

      /* normalize to [-1, 1] */
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      /* move opposite to cursor direction */
      target.current.x = -nx * PARALLAX_STRENGTH;
      target.current.y = -ny * PARALLAX_STRENGTH;
      triggerAnimation();
    };

    window.addEventListener("pointermove", handleMove, { passive: true });

    // Gyroscope tracking references
    const hasBaseline = { current: false };
    const baseline = { current: { beta: 60, gamma: 0 } };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const { beta, gamma } = e;
      if (beta === null || gamma === null) return;

      if (!hasBaseline.current) {
        baseline.current = { beta, gamma };
        hasBaseline.current = true;
      } else {
        // Slow auto-calibration/drift correction (0.5% weight)
        // Helps adapt to changes in how the user naturally holds their phone
        baseline.current.beta = baseline.current.beta * 0.995 + beta * 0.005;
        baseline.current.gamma = baseline.current.gamma * 0.995 + gamma * 0.005;
      }

      const deltaBeta = beta - baseline.current.beta;
      const deltaGamma = gamma - baseline.current.gamma;

      // Constrain tilt angle ranges to [-45, 45] degrees
      const MAX_TILT = 45;
      const nx = Math.max(-1, Math.min(1, deltaGamma / MAX_TILT));
      const ny = Math.max(-1, Math.min(1, deltaBeta / MAX_TILT));

      // Update target positions for smooth LERP interpolation
      target.current.x = -nx * PARALLAX_STRENGTH;
      target.current.y = -ny * PARALLAX_STRENGTH;
      triggerAnimation();
    };

    let gyroActive = false;

    // Helper to safely request iOS permissions and bind orientation listener
    const bindGyro = () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        // iOS 13+ requires user interaction to request permission
        const requestPermissionAndBind = async () => {
          try {
            const status = await (DeviceOrientationEvent as any).requestPermission();
            if (status === "granted" && !gyroActive) {
              gyroActive = true;
              window.addEventListener("deviceorientation", handleOrientation, { passive: true });
            }
          } catch (err) {
            console.warn("DeviceOrientation permission error:", err);
          }
        };

        const onFirstInteraction = () => {
          requestPermissionAndBind();
          window.removeEventListener("touchstart", onFirstInteraction);
          window.removeEventListener("pointerdown", onFirstInteraction);
        };

        window.addEventListener("touchstart", onFirstInteraction, { passive: true });
        window.addEventListener("pointerdown", onFirstInteraction, { passive: true });

        return () => {
          window.removeEventListener("touchstart", onFirstInteraction);
          window.removeEventListener("pointerdown", onFirstInteraction);
          if (gyroActive) {
            window.removeEventListener("deviceorientation", handleOrientation);
          }
        };
      } else {
        // Android / non-iOS / legacy browsers
        window.addEventListener("deviceorientation", handleOrientation, { passive: true });
        gyroActive = true;
        return () => {
          if (gyroActive) {
            window.removeEventListener("deviceorientation", handleOrientation);
          }
        };
      }
    };

    const unbindGyro = bindGyro();
    
    // Initial paint & animation run
    triggerAnimation();

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (unbindGyro) unbindGyro();
      cancelAnimationFrame(rafId.current);
    };
  }, [animate, triggerAnimation]);

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
