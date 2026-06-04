/**
 * Brain-shaped point cloud — designed to be clearly recognizable
 * as a brain silhouette when viewed from the front (Z-axis forward).
 *
 * The brain is oriented so its longest axis runs along X (left-right on screen)
 * and height along Y. Depth (Z) gives it 3D volume.
 */

/* ─── deterministic PRNG ─────────────────────────────── */

function mulberry32(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ─── SDF-style brain outline ──────────────────────────── */

/**
 * Returns the signed distance from point (px, py) to the brain outline.
 * Negative = inside, Positive = outside.
 * The brain faces RIGHT (front is +X), viewed from the side.
 */
function brainSDF(px: number, py: number): number {
  /* cerebrum: large upper ellipse */
  const cerebrumCx = 0.0, cerebrumCy = 0.15;
  const cerebrumRx = 1.05, cerebrumRy = 0.72;
  const dCerebrum = Math.sqrt(
    ((px - cerebrumCx) / cerebrumRx) ** 2 +
    ((py - cerebrumCy) / cerebrumRy) ** 2
  ) - 1;

  /* frontal bulge: extends the front-top */
  const frontalCx = 0.55, frontalCy = 0.35;
  const frontalR = 0.55;
  const dFrontal = Math.sqrt(
    (px - frontalCx) ** 2 + (py - frontalCy) ** 2
  ) / frontalR - 1;

  /* temporal lobe: lower bump on the front */
  const temporalCx = 0.4, temporalCy = -0.35;
  const temporalRx = 0.5, temporalRy = 0.32;
  const dTemporal = Math.sqrt(
    ((px - temporalCx) / temporalRx) ** 2 +
    ((py - temporalCy) / temporalRy) ** 2
  ) - 1;

  /* cerebellum: small ball at the back-bottom */
  const cerebCx = -0.72, cerebCy = -0.35;
  const cerebR = 0.38;
  const dCereb = Math.sqrt(
    (px - cerebCx) ** 2 + (py - cerebCy) ** 2
  ) / cerebR - 1;

  /* brain stem: narrow cylinder going down from cerebellum */
  const stemCx = -0.45, stemW = 0.14;
  const stemTop = -0.5, stemBot = -0.95;
  let dStem = 1e9;
  if (py < stemTop && py > stemBot) {
    dStem = Math.abs(px - stemCx) / stemW - 1;
  }

  /* smooth union of all shapes */
  let d = dCerebrum;
  d = Math.min(d, dFrontal);
  d = Math.min(d, dTemporal);
  d = Math.min(d, dCereb);
  d = Math.min(d, dStem);

  return d;
}

/* ─── sulci generator (surface grooves) ───────────────── */

function sulci(x: number, y: number): number {
  /* curved horizontal grooves across the cerebrum */
  const g1 = Math.sin(y * 14.0 + x * 2.5) * 0.025;
  const g2 = Math.sin(y * 9.0 - x * 3.0 + 1.7) * 0.018;
  const g3 = Math.sin((x + y * 0.7) * 11.0) * 0.015;

  /* only on upper cerebrum */
  const mask = Math.max(0, Math.min(1, (y + 0.1) * 2.0));
  return (g1 + g2 + g3) * mask;
}

/* ─── public API ──────────────────────────────────────── */

export function generateBrainPositions(count: number, scale = 2.0): Float32Array {
  const out = new Float32Array(count * 3);
  const rng = mulberry32(12345);

  /* allocation: 55% outline, 45% interior fill */
  const outlineN = Math.floor(count * 0.55);
  let placed = 0;

  /* ── 1. Outline points: sample along the boundary ───── */
  for (let i = 0; i < outlineN; i++) {
    /* rejection sampling near the SDF=0 boundary */
    let attempts = 0;
    while (attempts < 100) {
      attempts++;
      const px = (rng() * 2.8 - 1.3);  /* X range: -1.3 to 1.5 */
      const py = (rng() * 2.4 - 1.1);  /* Y range: -1.1 to 1.3 */

      const d = brainSDF(px, py);

      /* keep points within a thin shell around the boundary */
      if (d > -0.08 && d < 0.03) {
        /* add sulci displacement along the normal */
        const s = sulci(px, py);
        const depth = (rng() * 2 - 1) * 0.35 * (1 - Math.abs(d) * 5);

        out[placed * 3]     = (px + s) * scale;
        out[placed * 3 + 1] = py * scale;
        out[placed * 3 + 2] = depth * scale;
        placed++;
        break;
      }
    }
  }

  /* ── 2. Interior sulci lines — give structure inside ─── */
  const fillTarget = count;
  let fillAttempts = 0;

  while (placed < fillTarget && fillAttempts < count * 80) {
    fillAttempts++;

    const px = (rng() * 2.8 - 1.3);
    const py = (rng() * 2.4 - 1.1);
    const d = brainSDF(px, py);

    /* must be inside the brain */
    if (d > 0) continue;

    /* prefer areas near sulci grooves (for internal texture) */
    const s = sulci(px, py);
    const sulciStrength = Math.abs(Math.sin(py * 14 + px * 2.5));

    /* reject most flat interior points; keep sulci and near-edge */
    const edgeDist = -d;
    const keepProb = 0.15 + sulciStrength * 0.4 + Math.max(0, 1 - edgeDist * 6) * 0.3;
    if (rng() > keepProb) continue;

    const depth = (rng() * 2 - 1) * 0.3 * Math.max(0.1, 1 - edgeDist * 2);

    out[placed * 3]     = (px + s * 0.5) * scale;
    out[placed * 3 + 1] = py * scale;
    out[placed * 3 + 2] = depth * scale;
    placed++;
  }

  /* fill any remaining */
  for (let i = placed; i < count; i++) {
    const src = Math.floor(rng() * Math.max(1, placed));
    out[i * 3]     = out[src * 3]     + (rng() - 0.5) * 0.04 * scale;
    out[i * 3 + 1] = out[src * 3 + 1] + (rng() - 0.5) * 0.04 * scale;
    out[i * 3 + 2] = out[src * 3 + 2] + (rng() - 0.5) * 0.04 * scale;
  }

  return out;
}
