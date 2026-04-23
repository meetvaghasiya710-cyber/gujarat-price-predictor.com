# Design Brief — Gujarat House Price Prediction System

**Purpose**: Premium real estate property valuation tool for buyers across Gujarat. Tone: commercial, trustworthy, refined. **Theme**: Dark mode (navy blue `#1d2a3a` + soft peach `#e4b895`).

## Palette

| Token | OKLCH | Purpose |
|---|---|---|
| Primary Navy | 0.25 0.08 265 | Trust, stability, primary CTAs |
| Accent Peach | 0.72 0.18 55 | Warmth, highlights, active states |
| Dark BG | 0.12 0 0 | Main background (dark mode) |
| Card Surface | 0.18 0 0 | Elevated card backgrounds |
| Text Primary | 0.93 0 0 | Body text, high contrast |
| Text Muted | 0.58 0 0 | Secondary text, subtle labels |
| Border | 0.28 0 0 | Subtle card / section dividers |
| Destructive | 0.65 0.19 22 | Warnings, errors, destructive actions |

## Typography

| Role | Font | Usage |
|---|---|---|
| Display | General Sans | Headlines, hero, feature titles (bold, geometric) |
| Body | DM Sans | Copy, form labels, descriptions (clean, readable) |
| Mono | Geist Mono | Code, technical values, data readouts |

## Structural Zones

| Zone | Treatment |
|---|---|
| Header | Dark navy card (`bg-card`) with subtle border-b |
| Hero | Full-bleed image with navy overlay + peach accent text |
| Prediction Form | Card stack layout, alternating `bg-card` / `bg-background` |
| Feature Cards | Elevated surfaces (`bg-card`), rounded 12px, `shadow-card` |
| Result Card | Prominent peach accent highlight, `shadow-elevated` |
| Footer | Muted background (`bg-background`), peach accent links |

## Spacing & Rhythm

- Base unit: 4px, scale 2/4/6/8/12/16/24/32/48
- Card padding: 24px (sm: 16px)
- Section gaps: 48px (sm: 32px)
- Form input gap: 16px

## Component Patterns

- Buttons: Primary (navy bg, peach text on hover), Secondary (peach outline)
- Inputs: `bg-input` border, focus ring peach, smooth transitions
- Cards: `rounded-lg`, `shadow-card`, `transition-smooth` on hover (lift effect)
- Dropdowns: Navy text on card bg, peach accent on selection
- Loading: Pulse animation (peach accent)

## Motion & Interaction

- Hover lift: `transition-smooth` + `shadow-elevated` on card hover
- Form submit: Fade-in result card, pulse loading indicator
- Page load: Staggered slide-up (sections fade-in at 0.4s)
- Input focus: Ring peach, smooth border transition

## Constraints

- No light mode (dark mode only)
- No gradients on backgrounds (use solid surfaces + peach accents)
- No animations > 0.5s (except indefinite pulse)
- No personal credits, student indicators, or metadata
- All images: high-quality real estate (houses, apartments, interiors)

## Signature Detail

Peach accent used surgically: button hovers, active form states, result highlights, link underlines. Creates premium warmth without visual chaos — trust + human touch.

