import { Suspense, lazy, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { RefObject, MutableRefObject } from "react";
import type { Group } from "three";

const ParticleSphere = lazy(() => import("./ParticleSphere"));

type HeroCanvasProps = {
  sphereRef?: RefObject<Group | null>;
  morphProgressRef?: MutableRefObject<number>;
  explodeProgressRef?: MutableRefObject<number>;
};

export default function HeroCanvas({ sphereRef, morphProgressRef, explodeProgressRef }: HeroCanvasProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const dprProps: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      dpr={dprProps}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      /* prevent R3F from overriding the body background */
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      {/* low ambient + a point light for subtle glow emphasis */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#c8d0ff" />

      <Suspense fallback={null}>
        <ParticleSphere sphereRef={sphereRef} morphProgressRef={morphProgressRef} explodeProgressRef={explodeProgressRef} />
      </Suspense>
    </Canvas>
  );
}
