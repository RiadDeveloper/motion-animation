# CineFlow AI Agent Guardrails & Operating Standards

> **MANDATORY INSTRUCTIONS FOR ALL AI CODING AGENTS (Antigravity, Cursor, Claude Code, Codex, Copilot)**  
> Read this file before creating or editing any video in this repository. Follow these strict rules to ensure 100% bug-free, studio-grade video production on the first attempt.

---

## 🛑 1. Core Architecture Rules (Single-File Isolation & Zero Collateral Edit)

1. **Self-Contained Video File (`src/videos/<video-name>.tsx`):**
   - Every video project MUST live in its own single, self-contained file: `src/videos/<video-name>.tsx` (e.g. `src/videos/riad-developer-intro.tsx`).
   - Never write code across multiple scattered files unless explicitly requested.
   - **DO NOT TOUCH `src/videos/index.tsx` OR ANY OTHER FILE:** `src/videos/index.tsx` is permanently static and uses native Webpack runtime discovery to automatically detect and register any `.tsx` video created under `src/videos/`. You MUST NEVER modify or edit `src/videos/index.tsx`.
2. **Modifying an Existing Video:**
   - When the user asks to modify or adjust an existing video (e.g. "change scene 2 timing", "update text at 15s"), locate and edit ONLY `src/videos/<video-name>.tsx`. Never touch other files.
3. **Creating a New Video:**
   - When the user gives a prompt for a new, separate video concept, create a brand new isolated file: `src/videos/<new-video-name>.tsx`. Zero edits to `src/videos/index.tsx` or any existing file.
4. **Always Run TypeScript Verification:**
   - You MUST run `npm run typecheck` (`tsc --noEmit`) after writing or editing code. If there are any type errors, fix them before responding to the user.

---

## 🔊 2. Mandatory Audio Design & Sound Effects (SFX)

Never produce silent videos. Every video MUST include complete audio design:
1. **Background Soundtrack:**
   - Play an upbeat modern electronic beat or ambient music track throughout the video:
     `<Audio src={staticFile('sfx/beat.wav')} volume={0.35} />` (or user-supplied music in `public/`).
2. **Synchronized Animation Sound Effects (SFX):**
   Use the pre-built, studio-grade sound effects from `public/sfx/`:
   - `sfx/whoosh.wav` — Smooth airy sweep for scene transitions, card entrances, and slide-ins.
   - `sfx/pop.wav` — Punchy bubble pop for badges, icons, and spring elements.
   - `sfx/impact.wav` — Deep 808 sub-bass boom for big headlines, milestone numbers, and dramatic drops.
   - `sfx/click.wav` — Sleek tech UI transient click for typing lines, code, and bullet points.
   - `sfx/chime.wav` — Sparkling bell chord for achievements, awards, and certifications.
   - `sfx/riser.wav` — Tension swell leading into high-impact reveals.

---

## 🎨 3. Dynamic Scene-Adaptive Backgrounds (Never Same Background Throughout)

Never use a single repetitive background across the entire video. Each scene MUST feature a unique atmospheric backdrop tailored to its content:
- **Intro / Reveal:** Cosmic obsidian void with rotating nebula vortex and central orbiting particles.
- **Skills / Who I Am:** Cyber matrix grid with vertical drifting data lines.
- **Developer / GitHub:** Deep indigo slate with interconnected commit graph nodes and hexagonal mesh.
- **Projects / Showcase:** Multi-layered glass prism showcase with soft drifting depth bokeh.
- **Tech Stack:** 3D cyber particle accelerator with concentric pulsing energy rings and warp streaks.
- **Numbers / Metrics / Financials:** Radiant gold and amber luxury sun with upward floating golden embers.
- **Outro / Contact:** Studio creator spotlight with sweeping laser horizon and lime glow.

---

## 🧰 4. Use Built-In Primitives (Never Reinvent the Wheel)

Do NOT write raw unstyled CSS, install external animation libraries (like framer-motion or gsap), or reinvent animations. Always import from our bulletproof kits:

### From `src/ui.tsx` (Motion Graphics Kit)
- `Background` — Ambient glowing radial orbs, drift grid, floating particles.
- `Kinetic` — Letter-by-letter bouncy spring entrance for headlines.
- `Rise` — Slide, fade, and de-blur entrance with directional control (`up`, `left`, `right`, `scale`).
- `Scene` — Automatic scene transition with scale and blur overlap.
- `Tile` — Frosted glassmorphic container with glowing drop shadow.
- `Photo` — Avatar / image in a glowing ring with orbiting particles, with `src` or initials fallback.
- `spr(frame, fps, delay, config)` — Spring helper with `POP` and `SMOOTH` configs.
- `C` & `gradientText()` — Color palette tokens (`C.bg`, `C.lime`, `C.violet`, `C.text`, `C.dim`).
- `Brand` & `Line` & `icons` — SVG icon utilities and Simple Icons wrapper.

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
- `AudioWaveform` — Pulsing visualizer bars reacting to speech/music.
- `DuckedMusic` — Background music that automatically ducks volume during voiceover.
- `EditorProgressBar` — Sleek animated timeline progress bar (top/bottom).
- `KeywordCallout` — Punchy animated pop card for spoken keyphrases.
- `PictureInPicture` — PiP camera/facecam overlay.

### From `src/lyrics.tsx` (Music Video Kit)
- `SpotifyLyricCard` — 3D tilted Spotify card with cover art, track info, and live singing lines.
- `WordWall3D` — Massive 3D lyric word wall drifting in the background.
- `VinylRecordPlayer` — Spinning 33 RPM vinyl record player with floating lyrics for lo-fi/acoustic tracks.
- `NeonSynthHorizon` — Scrolling 3D perspective grid horizon and synth sun for EDM/synthwave.
- `BeatCameraShake` — Frame shake synced to heavy 808 bass kicks.
- `MusicPlayerHUD` — Glassmorphic playback scrubber and timer.
- `RapWordImpact` — Aggressive kinetic typography slamming on screen for rap/drill tracks.

---

## ⏱️ 5. Strict Frame & Timing Math

- **Standard FPS:** Always default to `fps: 30`.
- **Duration Formula:** $\text{durationInFrames} = \text{seconds} \times 30$
  - 15 seconds = 450 frames
  - 30 seconds = 900 frames
  - 60 seconds = 1800 frames
- **Assets:** Any media referenced with `staticFile('name.ext')` MUST reside in the `public/` folder.

---

## 📋 6. Mandatory 4-Step Checklist Before Answering the User

1. [ ] Code written in a single self-contained file: `src/videos/<video-name>.tsx`.
2. [ ] Zero modifications to other files (auto-sync handles registration).
3. [ ] `npm run typecheck` passes with 0 errors.
4. [ ] Response contains the preview command (`npm run studio`) and render command:
       `npx remotion render src/index.ts <CompositionId> out/<video-name>.mp4`.
