import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { RefObject, MutableRefObject } from "react";
import * as THREE from "three";
import { generateBrainPositions } from "./brainGeometry";

const PARTICLE_COUNT = 4000;
const SPHERE_RADIUS = 2.0;

/* Shaders */

const particleVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aOpacity;
  attribute float aGlow;
  attribute float aSoftness;
  attribute float aCore;
  attribute float aSpeed;
  attribute float aRadiusOffset;
  attribute vec3  aBrainPosition;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2  uMouse;
  uniform float uPass;
  uniform float uRepelStrength;
  uniform float uMorphProgress;
  uniform float uExplode;
  uniform float uExplodeTime;

  const float sphereRadius = 2.0;
  const float repelRadius = 0.42;
  const float glowRadius  = 1.2;
  const float depthFactor = 1.0;

  varying float vAlpha;
  varying float vSoftness;
  varying float vEdge;
  varying float vBrightness;
  varying float vGlow;
  varying float vCore;
  varying float vCursorGlow;

  void main() {
    /* lerp between sphere position and brain position */
    vec3 basePos = mix(position, aBrainPosition, uMorphProgress);

    // Blast dispersion outward along radial normal vector
    vec3 dir = normalize(basePos);
    if (length(basePos) < 0.0001) {
      dir = vec3(0.0, 1.0, 0.0);
    }
    
    // Smooth blast curve that levels off so stars linger surrounding the viewport
    float blastProgress = sin(uExplode * 1.5708);
    float maxDistance = 24.0 * (0.3 + aSpeed * 0.7);
    vec3 pos = basePos + dir * blastProgress * maxDistance;

    // Party-popper drift effect (drift down + wind sway)
    if (uExplode > 0.001) {
      pos.y -= uExplodeTime * 0.7 * (0.4 + aSpeed * 0.6); // Drift down (gravity)
      pos.x += sin(uTime * 0.25 + aPhase * 6.28) * uExplodeTime * 0.35 * (0.4 + aSpeed * 0.6); // Wind sway
      pos.z += cos(uTime * 0.20 + aPhase * 3.14) * uExplodeTime * 0.35 * (0.4 + aSpeed * 0.6);
    }

    /* individual orbital wobble — reduce during morph for clarity */
    float wobbleScale = 1.0 - uMorphProgress * 0.7;
    float spd = 0.2 + aPhase * 0.15;
    float amp = (0.06 + aPhase * 0.04) * wobbleScale;
    pos.x += sin(uTime * spd + aPhase * 6.283) * amp;
    pos.y += cos(uTime * spd * 0.8 + aPhase * 4.712) * amp;
    pos.z += sin(uTime * spd * 0.6 + aPhase * 3.141) * amp;

    /* slow global Y-rotation — freeze during brain morph */
    float rotSpeed = 0.12 * (1.0 - uMorphProgress);
    float a = uTime * rotSpeed;
    float c = cos(a), s = sin(a);
    vec3 r = vec3(pos.x * c + pos.z * s, pos.y, -pos.x * s + pos.z * c);

    float projectedTargetX = uMouse.x * (1.0 - r.z / 50.0);
    float projectedTargetY = uMouse.y * (1.0 - r.z / 50.0);
    vec2 cursor = vec2(projectedTargetX, projectedTargetY);
    vec2 delta = r.xy - cursor;
    float dist = length(delta);

    /* reduce repulsion during brain morph */
    float effectiveRepel = uRepelStrength * (1.0 - uMorphProgress * 0.8);

    vec3 homePos = vec3(r.x, r.y, r.z * depthFactor);
    vec3 targetPos = homePos;

    if (effectiveRepel > 0.001 && dist < repelRadius) {
      vec2 direction = delta / max(dist, 0.0001);

      if (dist < 0.0001) {
        direction = normalize(vec2(cos(aPhase * 37.17), sin(aPhase * 41.31)));
      }

      targetPos.xy = cursor + direction * repelRadius;
    }

    r = mix(homePos, targetPos, clamp(effectiveRepel, 0.0, 1.0));

    /* cursor proximity glow — wider than repel so particles light up before being pushed */
    float cursorProximity = 1.0 - smoothstep(0.0, glowRadius, dist);
    vCursorGlow = cursorProximity * cursorProximity * effectiveRepel;

    float z01 = smoothstep(0.0, 1.0, clamp((r.z / sphereRadius + 1.0) * 0.5, 0.0, 1.0));
    float frontMask = smoothstep(-0.04, 0.08, r.z / sphereRadius);
    float radial01 = clamp(length(r.xy) / sphereRadius, 0.0, 1.0);
    float edge01 = smoothstep(0.5, 1.0, radial01);

    float depthVisibility = mix(0.2, 1.0, z01);
    float visibility = mix(depthVisibility, 1.0, frontMask);

    /* during brain morph, make all particles more uniformly visible */
    visibility = mix(visibility, 0.85, uMorphProgress);

    float softness = mix(0.85, 0.0, z01);
    float passMask = mix(1.0 - frontMask, frontMask, step(0.5, uPass));

    /* during brain morph, show all particles from both passes */
    passMask = mix(passMask, 1.0, uMorphProgress * 0.7);

    vec4 mv = modelViewMatrix * vec4(r, 1.0);
    float pulse = 1.0 + 0.12 * sin(uTime * 0.4 + aPhase * 6.283);
    float depthSize = mix(0.58, 1.0, z01);
    float rimSize = mix(1.0, 1.18, edge01);

    float cursorSizeBoost = 1.0 + vCursorGlow * 0.6;

    /* slightly smaller particles during brain morph for sharper detail */
    float morphSizeScale = mix(1.0, 0.75, uMorphProgress);

    gl_PointSize = aSize * 1.495 * pulse * depthSize * rimSize * cursorSizeBoost * morphSizeScale * uPixelRatio * (128.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;

    vSoftness = clamp(softness + aSoftness * 0.62, 0.0, 1.0);
    vEdge = edge01;
    /* dim base particles, cursor glow brings them to full brightness */
    float baseDim = mix(0.40, 0.70, uMorphProgress);
    float cursorBrighten = vCursorGlow * 0.65;
    float dimFactor = clamp(baseDim + cursorBrighten, 0.0, 1.0);
    
    // Gradual one-by-one fade based on unique phase lifetime thresholds after blast
    float fadeFactor = 1.0;
    if (uExplodeTime > 4.5) {
      float fadeProgress = (uExplodeTime - 4.5) / 2.5; // 0.0 to 1.0 over 2.5 seconds
      float particleLifetime = 0.15 + aPhase * 0.85; // individual lifetimes
      fadeFactor = clamp((particleLifetime - fadeProgress) / 0.15, 0.0, 1.0);
    }
    vAlpha = (0.82 + 0.18 * sin(uTime * 0.3 + aPhase * 3.0)) * visibility * passMask * aOpacity * dimFactor * fadeFactor;
    
    vBrightness = mix(0.35, 1.35, z01) + edge01 * 0.5 + vCursorGlow * 1.8;
    vGlow = aGlow;
    vCore = aCore;
  }
`;

const particleFragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vSoftness;
  varying float vEdge;
  varying float vBrightness;
  varying float vGlow;
  varying float vCore;
  varying float vCursorGlow;

  void main() {
    if (vAlpha <= 0.003) discard;

    vec2 p = gl_PointCoord - vec2(0.5);
    float d = length(p);
    if (d > 0.5) discard;

    float coreRadius = mix(0.1, 0.3, vSoftness);
    float sharpCore = (1.0 - smoothstep(0.0, coreRadius, d)) * vCore;
    float softHalo = 1.0 - smoothstep(mix(0.1, 0.015, vSoftness), 0.5, d);
    float outerGlow = pow(1.0 - smoothstep(0.08, 0.5, d), 1.15);
    float rimSpark = 1.0 - smoothstep(0.0, 0.32, d);

    float coreStrength = mix(1.55, 0.16, vSoftness);
    float haloStrength = mix(0.76, 0.98, vSoftness);
    float alpha = (sharpCore * coreStrength + softHalo * haloStrength + outerGlow * vGlow * 0.75 + rimSpark * vEdge * 0.32) * vAlpha;
    alpha = clamp(alpha, 0.0, 1.0);

    vec3 color = vec3(0.98, 0.995, 1.0);
    vec3 glowColor = color * (1.15 + softHalo * (1.15 + vGlow * 1.25) + outerGlow * vGlow * 2.25 + sharpCore * vBrightness * 1.28);

    /* cursor glow boost — intensify color near cursor */
    glowColor += color * vCursorGlow * 2.5;

    gl_FragColor = vec4(glowColor * alpha, alpha);
  }
`;

const coreVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coreFragmentShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - vec2(0.5);
    float d = length(p) * 2.0;
    if (d > 1.0) discard;

    float body = pow(1.0 - smoothstep(0.02, 1.0, d), 1.05);
    float feather = 1.0 - smoothstep(0.68, 1.0, d);
    float alpha = clamp(body * feather * 1.08, 0.0, 1.0);
    vec3 color = vec3(0.18, 0.205, 0.215);

    gl_FragColor = vec4(color, alpha);
  }
`;

/* Component */

type ParticleSphereProps = {
  sphereRef?: RefObject<THREE.Group | null>;
  morphProgressRef?: MutableRefObject<number>;
  explodeProgressRef?: MutableRefObject<number>;
};

export default function ParticleSphere({ sphereRef, morphProgressRef, explodeProgressRef }: ParticleSphereProps) {
  const backMatRef = useRef<THREE.ShaderMaterial>(null);
  const frontMatRef = useRef<THREE.ShaderMaterial>(null);
  const coreMatRef = useRef<THREE.ShaderMaterial>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const virtualMouse = useRef(new THREE.Vector2(0, 0));
  const pointer = useRef(new THREE.Vector2(0, 0));
  const pointerActive = useRef(false);
  const repelStrength = useRef(0);

  const blastTriggered = useRef(false);
  const blastTime = useRef(0);
  const explodeProgress = useRef(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particleCount = isMobile ? 1600 : 4000;

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const inBounds =
        event.clientX >= 0 &&
        event.clientX <= window.innerWidth &&
        event.clientY >= 0 &&
        event.clientY <= window.innerHeight;

      pointerActive.current = inBounds;
      if (!inBounds) return;

      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handlePointerLeave = () => {
      pointerActive.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, []);

  /* generate surface-only particle attributes + brain target positions */
  const { positions, brainPositions, sizes, phases, opacities, glows, softnesses, cores, speeds, radiusOffsets } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);
    const ph = new Float32Array(particleCount);
    const opacity = new Float32Array(particleCount);
    const glow = new Float32Array(particleCount);
    const soft = new Float32Array(particleCount);
    const core = new Float32Array(particleCount);
    const speed = new Float32Array(particleCount);
    const radiusOffset = new Float32Array(particleCount);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < particleCount; i++) {
      const t = (i + 0.5) / particleCount;
      const theta = Math.acos(1 - 2 * t);
      const phi = i * goldenAngle + (Math.random() - 0.5) * 0.018;
      const sinTheta = Math.sin(theta);
      const radius = SPHERE_RADIUS;

      pos[i * 3] = radius * sinTheta * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.cos(theta);
      pos[i * 3 + 2] = radius * sinTheta * Math.sin(phi);

      const particleType = Math.random();
      let sizeScale = 1;

      if (particleType < 0.12) {
        opacity[i] = 0.95 + Math.random() * 0.35;
        glow[i] = 2.2 + Math.random() * 1.05;
        soft[i] = 0.12 + Math.random() * 0.24;
        core[i] = 0.9 + Math.random() * 0.2;
        sizeScale = 1.18 + Math.random() * 0.28;
      } else if (particleType < 0.56) {
        opacity[i] = 0.62 + Math.random() * 0.34;
        glow[i] = 1.05 + Math.random() * 0.75;
        soft[i] = 0.22 + Math.random() * 0.34;
        core[i] = 0.58 + Math.random() * 0.34;
        sizeScale = 0.92 + Math.random() * 0.22;
      } else if (particleType < 0.86) {
        opacity[i] = 0.25 + Math.random() * 0.3;
        glow[i] = 0.58 + Math.random() * 0.48;
        soft[i] = 0.58 + Math.random() * 0.3;
        core[i] = 0.18 + Math.random() * 0.34;
        sizeScale = 1.05 + Math.random() * 0.42;
      } else {
        opacity[i] = 0.07 + Math.random() * 0.16;
        glow[i] = 0.22 + Math.random() * 0.28;
        soft[i] = 0.84 + Math.random() * 0.16;
        core[i] = 0.02 + Math.random() * 0.14;
        sizeScale = 1.35 + Math.random() * 0.55;
      }

      sz[i] = (0.055 + Math.pow(Math.random(), 2.35) * 0.125) * sizeScale;
      ph[i] = Math.random() * Math.PI * 2;
      speed[i] = 0.72 + Math.random() * 1.35;
      radiusOffset[i] = (Math.random() - 0.5) * 0.06;
    }

    /* generate brain target positions */
    const brain = generateBrainPositions(particleCount, SPHERE_RADIUS);

    return {
      positions: pos,
      brainPositions: brain,
      sizes: sz,
      phases: ph,
      opacities: opacity,
      glows: glow,
      softnesses: soft,
      cores: core,
      speeds: speed,
      radiusOffsets: radiusOffset,
    };
  }, [particleCount]);

  const backUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPass: { value: 0 },
      uRepelStrength: { value: 0 },
      uMorphProgress: { value: 0 },
      uExplode: { value: 0 },
      uExplodeTime: { value: 0 },
    }),
    [],
  );

  const frontUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPass: { value: 1 },
      uRepelStrength: { value: 0 },
      uMorphProgress: { value: 0 },
      uExplode: { value: 0 },
      uExplodeTime: { value: 0 },
    }),
    [],
  );

  /* per-frame update - only touches uniforms, zero buffer writes */
  useFrame((state, delta) => {
    const { viewport: v } = state;
    const m = pointer.current;
    const t = state.clock.getElapsedTime();

    const destX = (m.x * v.width) / 2;
    const destY = (m.y * v.height) / 2;
    const smoothFactor = 0.05;
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;
    repelStrength.current += ((pointerActive.current ? 1 : 0) - repelStrength.current) * 0.12;

    const mp = morphProgressRef?.current ?? 0;
    const scrollProgress = explodeProgressRef?.current ?? 0;

    // Time-triggered explosion + gravity drift
    if (scrollProgress >= 0.3) {
      blastTriggered.current = true;
    } else if (scrollProgress < 0.05) {
      // Reset state when back at the top
      blastTriggered.current = false;
      blastTime.current = 0;
      explodeProgress.current = 0;
    }

    if (blastTriggered.current) {
      blastTime.current += delta;
      // Explode outwards fully in 1.2s
      explodeProgress.current = Math.min(1.0, blastTime.current / 1.2);
    }

    /* fade the foggy core as brain morph progresses or as it explodes */
    if (coreMeshRef.current) {
      const coreOpacity = Math.max(0, Math.min(1, 1 - mp - explodeProgress.current * 1.5));
      coreMeshRef.current.visible = coreOpacity > 0.01;
      if (coreMatRef.current) {
        coreMatRef.current.opacity = coreOpacity;
      }
    }

    /* push to GPU */
    for (const material of [backMatRef.current, frontMatRef.current]) {
      if (material) {
        material.uniforms.uTime.value = t;
        material.uniforms.uMouse.value.copy(virtualMouse.current);
        material.uniforms.uRepelStrength.value = repelStrength.current;
        material.uniforms.uMorphProgress.value = mp;
        material.uniforms.uExplode.value = explodeProgress.current;
        material.uniforms.uExplodeTime.value = blastTime.current;
      }
    }
  });

  const renderParticleGeometry = () => (
    <bufferGeometry key={particleCount}>
      <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      <bufferAttribute attach="attributes-aBrainPosition" count={particleCount} array={brainPositions} itemSize={3} />
      <bufferAttribute attach="attributes-aSize" count={particleCount} array={sizes} itemSize={1} />
      <bufferAttribute attach="attributes-aPhase" count={particleCount} array={phases} itemSize={1} />
      <bufferAttribute attach="attributes-aOpacity" count={particleCount} array={opacities} itemSize={1} />
      <bufferAttribute attach="attributes-aGlow" count={particleCount} array={glows} itemSize={1} />
      <bufferAttribute attach="attributes-aSoftness" count={particleCount} array={softnesses} itemSize={1} />
      <bufferAttribute attach="attributes-aCore" count={particleCount} array={cores} itemSize={1} />
      <bufferAttribute attach="attributes-aSpeed" count={particleCount} array={speeds} itemSize={1} />
      <bufferAttribute attach="attributes-aRadiusOffset" count={particleCount} array={radiusOffsets} itemSize={1} />
    </bufferGeometry>
  );

  return (
    <group ref={sphereRef}>
      {/* back half of the shell, softened by the inner core */}
      <points renderOrder={0}>
        {renderParticleGeometry()}
        <shaderMaterial
          ref={backMatRef}
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          uniforms={backUniforms}
          transparent
          depthTest={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* soft opaque sphere sitting between the back and front particles */}
      <mesh ref={coreMeshRef} renderOrder={1}>
        <planeGeometry args={[SPHERE_RADIUS * 3.35, SPHERE_RADIUS * 3.35]} />
        <shaderMaterial
          ref={coreMatRef}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          transparent
          depthTest={false}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* front half of the shell, bright and sharp above the core */}
      <points renderOrder={2}>
        {renderParticleGeometry()}
        <shaderMaterial
          ref={frontMatRef}
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          uniforms={frontUniforms}
          transparent
          depthTest={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
