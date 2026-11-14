---
name: cineflow-design
description: >-
  Motion graphics design rules, physics easing curves, and visual aesthetics guide for CineFlow.
  Use whenever styling video scenes, fine-tuning animation timing, creating complex kinetic typography,
  designing glassmorphism cards, glowing neons, particle fields, or troubleshooting visual motion quality.
---

# CineFlow Motion Design System & Aesthetics Guide

This skill provides the mathematical and visual principles necessary to produce high-end, studio-grade motion graphics in Remotion.

---

## 1. Physics & Easing Rules

### The Golden Rule of Motion
> **Never use linear animations (`linear`) for UI elements.** Real-world objects have mass, momentum, and friction. Always use spring physics or cubic bezier curves.

### Spring Configurations
Remotion's `spring()` calculates natural physical motion:

```tsx
import {spring} from 'remotion';

// 1. POP (High energy, bouncy, perfect for logos, badges, and headline words)
export const POP = {
  damping: 14,
  mass: 0.7,
  stiffness: 120,
};

// 2. SMOOTH (Refined, fluid, perfect for containers, cards, and slide-ins)
export const SMOOTH = {
  damping: 200,
  mass: 1.0,
  stiffness: 100,
};

// 3. CRUNCH / SNAPPY (Tech, UI clicks, metric counters)
export const SNAPPY = {
  damping: 24,
  mass: 0.5,
  stiffness: 180,
};

// Helper: spring with delay
export const spr = (frame: number, fps: number, delay = 0, config = SMOOTH) =>
  spring({frame: frame - delay, fps, config});
```

---

## 2. Timing & Stagger Arithmetic

When multiple elements appear (e.g. letters in a word, items in a list, cards in a grid), animate them with **staggered offsets**:

$$\text{elementDelay}_i = \text{startDelay} + i \times \text{staggerFrames}$$

- **Kinetic text letters:** $\text{stagger} = 1.5 \text{ to } 2.5 \text{ frames}$
- **List items or feature badges:** $\text{stagger} = 6 \text{ to } 12 \text{ frames}$
- **Grid cards:** $\text{stagger} = 15 \text{ to } 25 \text{ frames}$

```tsx
{items.map((item, i) => {
  const p = spr(frame, fps, baseDelay + i * 8, POP);
  return (
    <div
      key={i}
      style={{
        opacity: Math.min(1, p * 1.5),
        transform: `translateY(${(1 - p) * 50}px) scale(${0.85 + p * 0.15})`,
      }}
    >
      {item}
    </div>
  );
})}
```

---

## 3. Visual Styling & Color Tokens

Consistent high-contrast dark theme presets:

```tsx
export const Colors = {
  bg: '#0B0B0F',            // Deep obsidian canvas
  surface: 'rgba(255,255,255,0.045)', // Frosted glass
  surfaceBorder: 'rgba(255,255,255,0.10)',
  lime: '#A3E635',          // Primary electric accent
  violet: '#7C3AED',        // Secondary deep accent
  violetSoft: '#A78BFA',    // Secondary highlight
  cyan: '#22D3EE',          // Vibrant cyber accent
  textPrimary: '#F5F5F7',   // Ultra bright white
  textSecondary: '#A1A1AA', // Cool slate gray
};
```

### Frosted Glassmorphism Tile
```tsx
export const GlassCard: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 28,
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
      backdropFilter: 'blur(20px)',
      padding: 40,
    }}
  >
    {children}
  </div>
);
```

### Dynamic Light Sweep Effect
Crosses across cards as they land:
```tsx
const sweep = interpolate(frame, [delay + 10, delay + 50], [-40, 140], clamp);

<div
  style={{
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(105deg, transparent ${sweep - 20}%, rgba(163,230,53,0.18) ${sweep}%, transparent ${sweep + 20}%)`,
  }}
/>
```

---

## 4. Typography Hierarchy
1. **Hero Title:** 96px – 140px, font weight 900, tight line height (1.0 - 1.1), tracking -2px to +2px.
2. **Subheadings / Key Stats:** 48px – 72px, font weight 700 - 800.
3. **Descriptions / Badges:** 24px – 36px, font weight 500 - 600.
4. Always use `fontVariantNumeric: 'tabular-nums'` for live counters to avoid jitter.
