
# MARS — Premium Navigation Bar

A futuristic, Apple/Linear-grade navbar that anchors the MARS brand: AI, automation, and consulting. The navbar lives at the top of the landing page and behaves as a quiet, intelligent layer that reacts subtly to scroll and hover.

## Layout
- **Fixed top navbar**, full width, horizontally centered content.
- **Three-zone symmetric layout**:
  - Left: `Home` · `Services`
  - Center: **MARS** logo (wordmark, perfectly centered on the page)
  - Right: `Contact Us` · `About Us`
- Generous horizontal padding, consistent gaps between items, pixel-balanced left/right zones (equal widths so the logo stays visually centered).
- Mobile: collapses into a clean hamburger that opens a minimal full-width sheet (same typography, same glass treatment).

## Typography
- Family: **Urbanist** (loaded via Google Fonts).
- Weight: **500 (Medium)** for nav items, slightly heavier for the MARS logo.
- Default color at top of page: `#2F2F2F` (merged with the light hero).
- Once scrolled (dark glass state): text shifts to a soft white for legibility.
- Comfortable letter-spacing; generous line height.

## Scroll Behavior
- **At top of page**: fully transparent — no background, no border, no shadow. Sits directly on the hero.
- **After ~20px scroll**: smooth transition into a **glassmorphic bar**:
  - `backdrop-blur` (medium-strong)
  - Background: `rgba(0,0,0,0.4)`
  - Hairline soft border / subtle inner glow for depth
  - Slight downward shadow for separation
- Transition: `ease-in-out`, ~400ms, on background, color, blur, and border together.

## Hover & Micro-interactions
- Menu items glow on hover with a **soft white illumination** (text-shadow based, never neon).
- Subtle **scale 1.03** on hover.
- Minimal underline animation (thin line expanding from center, ~250ms).
- Light **letter-spacing expansion** (+0.5px) for a premium feel.
- All transitions 200–300ms, easing curves tuned for fluidity.
- Logo gets a very subtle glow on hover; clicking returns to top.

## Hero Section (supporting context)
A simple, elegant hero so the transparent → glass transition is visible and meaningful:
- Light, near-white background with a soft gradient hint.
- MARS tagline ("Intelligence, automated.") and a quiet CTA.
- Enough vertical space below to demonstrate the scroll-triggered glass state.

## Tech Notes
- Implemented as `src/components/Navbar.tsx`, used in `src/pages/Index.tsx`.
- Urbanist loaded in `index.html`; design tokens (nav colors, glass background, glow) added to `index.css` and `tailwind.config.ts` so nothing is hardcoded.
- Scroll state via a lightweight `useEffect` listener with passive scroll for performance.
- No heavy libraries — pure Tailwind + CSS transitions for 60fps smoothness.

## Out of Scope
- Real page content for Services / About / Contact (links will anchor or route to placeholders).
- Authentication, CMS, or backend.
