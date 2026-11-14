---
name: cineflow-audio
description: >-
  Dynamic sound design, semantic audio mapping, on-demand SFX generation, and beat synchronization for CineFlow videos.
  Use whenever matching sound effects to animations (whoosh, pop, click, impact, chime, shutter, coin),
  generating on-demand audio via scripts/generate-sfx.mjs, volume ducking, or beat-matching visual cuts.
---

# CineFlow Dynamic Sound Design & SFX Synthesis Engine

Never produce silent videos. CineFlow enables AI models to deeply analyze user prompts and visual animations, selecting or synthesizing the exact right acoustic sound effects (SFX) and background soundtracks tailored to the mood, pace, and meaning of every scene.

---

## 1. Semantic Prompt-to-Sound Mapping Heuristic

When creating any video, analyze the **intent and visual action** of each element to assign its acoustic counterpart:

| Visual Element / Animation | Acoustic SFX | Intent / Feeling |
| :--- | :--- | :--- |
| **Profile Photo / Avatar Reveal** | `sfx/shutter.wav` + `sfx/whoosh-fast.wav` | Crisp camera snapshot capturing human presence |
| **Major Title / Big Headline Slam** | `sfx/impact-heavy.wav` | Heavy cinematic 808 sub-bass anchoring high importance |
| **Pill Badges, Icons & Spring Entrances** | `sfx/pop-clean.wav` / `sfx/pop-warm.wav` | Tactile, responsive spring physics feedback |
| **Terminal Typing / CLI Code / Bullet Lines** | `sfx/typewriter.wav` / `sfx/click-digital.wav` | Technical precision, mechanical keyboard feel |
| **Financials, Money, Counters & Top-Ups** | `sfx/coin-ding.wav` + `sfx/bass-drop.wav` | Resonant metallic ring and deep wealth/scale impact |
| **Awards, Certifications & Achievements** | `sfx/chime-sparkle.wav` | Shimmering harmonic bell chord celebrating success |
| **Tech Orbiting / Sci-Fi Energy Streaks** | `sfx/laser-swoosh.wav` | High-velocity cybernetic motion |
| **Pre-Drop Builds & Scene Entrances** | `sfx/riser-tension.wav` | Exponential tension swell leading into high-impact reveals |
| **Punchy Transition Jump Cuts** | `sfx/impact-punch.wav` | Rapid, punchy mid-frequency transition cut |

---

## 2. Pre-Built Studio Sound Library (`public/sfx/`)

All foundational sound effects are synthesized in 44.1kHz 16-bit PCM WAV format inside `public/sfx/`:

- **Transitions:** `whoosh-fast.wav`, `whoosh-cinematic.wav`, `laser-swoosh.wav`
- **Impacts & Drops:** `impact-heavy.wav`, `impact-punch.wav`, `bass-drop.wav`
- **Pops & Clicks:** `pop-clean.wav`, `pop-warm.wav`, `click-digital.wav`, `typewriter.wav`
- **Accents & Milestones:** `coin-ding.wav`, `shutter.wav`, `chime-sparkle.wav`, `riser-tension.wav`
- **Soundtracks:**
  - `sfx/beat-electronic.wav` (or `beat.wav`): 60s 120 BPM upbeat electronic tech beat with 808 kick, snare, hi-hats, bassline, and synth arpeggio.
  - `sfx/beat-lofi.wav`: 60s 85 BPM relaxed lo-fi chillhop beat with dusty Rhodes chords and soft vinyl crackle.

---

## 3. On-Demand Custom SFX Generation

If a prompt requires a custom or new sound effect not covered by existing files, synthesize it on the fly:

```bash
node scripts/generate-sfx.mjs custom <filename.wav> <type>
```

*Example:*
```bash
node scripts/generate-sfx.mjs custom notification-chime.wav chime
node scripts/generate-sfx.mjs custom cyber-laser.wav laser-swoosh
```

---

## 4. Multi-Track Synchronization in Remotion

Trigger sound effects at the exact frame where visual elements appear:

```tsx
import {Audio, Sequence, staticFile} from 'remotion';

// Play background soundtrack throughout video
<Audio src={staticFile('sfx/beat.wav')} volume={0.35} />

// Trigger camera snapshot when avatar pops in at frame 14
<Sequence from={14}>
  <Audio src={staticFile('sfx/shutter.wav')} volume={0.8} />
</Sequence>

// Trigger heavy 808 boom when main headline slams at frame 32
<Sequence from={32}>
  <Audio src={staticFile('sfx/impact-heavy.wav')} volume={0.85} />
</Sequence>

// Trigger coin ring on financial counter at frame 120
<Sequence from={120}>
  <Audio src={staticFile('sfx/coin-ding.wav')} volume={0.8} />
</Sequence>
```
