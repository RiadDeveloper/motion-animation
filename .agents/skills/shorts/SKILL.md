---
name: cineflow-shorts
description: >-
  Specialized skill for creating high-retention vertical (9:16) motion graphics videos for
  YouTube Shorts, Instagram Reels, and TikTok using CineFlow. Use whenever the user asks for
  a short, reel, TikTok video, vertical video, or 9:16 format video (e.g. "make a 15s YouTube short",
  "create an Instagram Reel about X", "build a viral coding tip short").
---

# CineFlow Shorts & Reels Creator (9:16 Vertical Engine)

This skill specializes in designing and generating vertical motion graphic videos optimized for mobile platforms (YouTube Shorts, Instagram Reels, TikTok).

---

## 1. Vertical Specifications & Safe Zones

Mobile social platforms display overlays (captions, username, sound tags, like/comment buttons). Video content must adhere to strict safe zones:

```text
+-----------------------+  Y = 0
|      TOP BARRIER      |  Avoid crucial content (Profile / Audio tag overlay: 0 - 220px)
+-----------------------+  Y = 220
|                       |
|                       |
|       SAFE ZONE       |  MAIN CONTENT, KINETIC TEXT, VISUALS, METRICS
|     (1080 x 1300)     |  Keep all vital elements centered within Y: 220px to 1550px
|                       |
|                       |
+-----------------------+  Y = 1550
|    BOTTOM BARRIER     |  Avoid crucial content (Description, Audio, Action buttons)
+-----------------------+  Y = 1920
```

- **Width:** 1080px
- **Height:** 1920px
- **FPS:** 30 (or 60 for ultra-fluid motion)
- **Duration:** Typically 15s (450 frames), 30s (900 frames), or 45s (1350 frames).

---

## 2. Retention Mechanics for Vertical Videos

To maximize viewer engagement on short-form feeds:

1. **The 2-Second Visual Hook:**
   - Immediately display high-contrast, kinetic headline using `<Kinetic />` within frames 0–45.
   - Animate a shockwave ring or visual burst at frame 0.
2. **Top/Bottom Animated Progress Bar:**
   - Use the pre-built `<EditorProgressBar position="top" color={C.lime} />` from `../../editor`, or customize:
   ```tsx
   import {EditorProgressBar} from '../../editor';
   // Inside composition:
   <EditorProgressBar position="top" height={6} color={C.lime} />
   ```
3. **Pacing & Cuts:**
   - Switch scenes or layout angles every 2.5 to 4 seconds (75 to 120 frames).
   - Use staggered spring cards (`POP` physics) so the screen is continuously animated.
4. **Bold Kinetic Typography:**
   - Text size should be large ($72\text{px} - 120\text{px}$) for readability on small smartphone screens.

---

## 3. Standard Shorts Directory Structure

Follow the repository standard inside `src/videos/`:

```text
src/videos/<short-name>/
├── index.tsx              # Composition (1080x1920), progress bar, background, audio
└── scenes.tsx             # Hook scene, core value scenes, CTA scene
```

**Example Composition Definition:**
```tsx
export const SHORT_CONFIG = {
  id: 'CodingTipsShort',
  fps: 30,
  durationInFrames: 30 * 20, // 20 seconds = 600 frames
  width: 1080,
  height: 1920,
};
```

---

## 4. Registering and Rendering

Add the short to `src/videos/index.tsx`:

```tsx
import {CodingTipsShort, SHORT_CONFIG} from './coding-tips-short';

// Inside <Folder name="Videos">:
<Composition
  id={SHORT_CONFIG.id}
  component={CodingTipsShort}
  durationInFrames={SHORT_CONFIG.durationInFrames}
  fps={SHORT_CONFIG.fps}
  width={SHORT_CONFIG.width}
  height={SHORT_CONFIG.height}
/>
```

Render command:
```bash
npx remotion render src/index.ts CodingTipsShort out/coding-tips-short.mp4
```
