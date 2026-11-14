# CineFlow AI Agent Guardrails & Operating Standards

> **MANDATORY INSTRUCTIONS FOR ALL AI CODING AGENTS (Antigravity, Cursor, Claude Code, Codex, Copilot)**  
> Read this file before creating or editing any video in this repository. Follow these strict rules to ensure 100% bug-free, studio-grade video production on the first attempt.

---

## 🛑 1. Core Architecture Rules (Never Violate)

1. **Always Create an Isolated Folder:**
   - Every video project MUST live in its own dedicated directory: `src/videos/<project-name>/` (e.g. `src/videos/my-promo/index.tsx`).
   - Never write video components directly in `src/` or clutter the root directory.
2. **Always Register the Composition:**
   - After creating `src/videos/<project-name>/index.tsx`, you MUST import it and add its `<Composition />` inside `<Folder name="Videos">` in `src/videos/index.tsx`.
3. **Always Run TypeScript Verification:**
   - You MUST run `npx tsc --noEmit` after writing code. If there are any type errors, fix them before responding to the user.

---

## 🧰 2. Use Built-In Primitives (Never Reinvent the Wheel)

Do NOT write raw unstyled CSS or reinvent animations. Always import from our bulletproof kits:

### From `src/ui.tsx` (Motion Graphics Kit)
- `Background` — Ambient glowing radial orbs, drift grid, floating particles.
- `Kinetic` — Letter-by-letter bouncy spring entrance for headlines.
- `Rise` — Slide, fade, and de-blur entrance with directional control.
- `Scene` — Automatic scene transition with scale and blur overlap.
- `Tile` — Frosted glassmorphic container with glowing drop shadow.
- `spr(frame, fps, delay, config)` — Spring helper with `POP` and `SMOOTH` configs.
- `C` & `gradientText()` — Color palette tokens (`C.bg`, `C.lime`, `C.violet`, `C.text`, `C.dim`).

### From `src/editor.tsx` (Video Editing & Explainer Kit)
- `VideoClip` — Video player with trimming (`startFrom`, `endAt`), volume, and filters.
- `ReframeVertical` — Converts 16:9 widescreen videos to 9:16 vertical reels with blurred backdrop.
- `PunchZoom` — Dynamic camera zoom-in/out for jump cuts and spoken emphasis.
- `LowerThird` — Broadcast-grade speaker title card.
- `CaptionOverlay` — Word-by-word active highlighting karaoke subtitles.
- `ScreenshotMockup` — Renders images/screenshots inside a modern macOS window frame.
- `TerminalTypist` — Animated terminal typing CLI commands line-by-line with blinking cursor.
- `Card3D` — 3D perspective card with gyroscope tilt and specular sheen.
- `OneTakeCamera` — Smooth continuous 3D camera pan and tilt.
- `DuckedMusic` — Background music that automatically ducks volume during voiceover.
- `EditorProgressBar` — Sleek animated timeline progress bar.

### From `src/lyrics.tsx` (Music Video Kit)
- `SpotifyLyricCard` — 3D tilted Spotify card with cover art, track info, and live singing lines.
- `WordWall3D` — Massive 3D lyric word wall drifting in the background.
- `VinylRecordPlayer` — Spinning 33 RPM vinyl record player with floating lyrics for lo-fi/acoustic tracks.
- `NeonSynthHorizon` — Scrolling 3D perspective grid horizon and synth sun for EDM/synthwave.
- `BeatCameraShake` — Frame shake synced to heavy 808 bass kicks.
- `MusicPlayerHUD` — Glassmorphic playback scrubber and timer.

---

## ⏱️ 3. Strict Frame & Timing Math

- **Standard FPS:** Always default to `fps: 30`.
- **Duration Formula:** $\text{durationInFrames} = \text{seconds} \times 30$
  - 15 seconds = 450 frames
  - 30 seconds = 900 frames
  - 60 seconds = 1800 frames
- **Never overlap scenes without calculating transition overlap (`T = 15` frames).**
- **Assets:** Any media referenced with `staticFile('name.ext')` MUST reside in the `public/` folder.

---

## 📋 4. Mandatory 4-Step Checklist Before Answering the User

1. [ ] Code written in `src/videos/<project-name>/index.tsx`.
2. [ ] Composition registered in `src/videos/index.tsx`.
3. [ ] `npx tsc --noEmit` runs with 0 errors.
4. [ ] Response contains the preview command (`npm run studio`) and render command:
       `npx remotion render src/index.ts <CompositionId> out/<project-name>.mp4`.
