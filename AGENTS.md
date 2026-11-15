# CineFlow AI Agent Guardrails & Operating Standards

> **MANDATORY INSTRUCTIONS FOR ALL AI CODING AGENTS (Antigravity, Cursor, Claude Code, Codex, Copilot)**  
> This project is a **public open-source AI video creation and editing engine on GitHub**.  
> When any user prompts you to create a video, edit footage, or generate a music lyric video, you MUST strictly adhere to these guardrails to ensure **100% bug-free, studio-grade video production on the first attempt with ZERO contamination to the core engine**.

---

## 🛑 1. Core Architecture Rules (The Zero-Touch Core & Workspace Isolation)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       IMMUTABLE CORE ENGINE (NEVER TOUCH)                   │
│  src/ui.tsx  •  src/editor.tsx  •  src/lyrics.tsx  •  src/videos/index.tsx   │
│  src/Root.tsx  •  src/index.ts  •  scripts/*  •  package.json               │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Read-Only Imports)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        USER WORKSPACE (AI OPERATES HERE ONLY)               │
│  1. Root User Manifest : user-project.json (User info, channel, active meta)│
│  2. User Video Projects: src/videos/<video-name>.tsx (100% self-contained) │
│  3. User Media Assets  : public/<asset-name> (User MP3, clips, cover SVGs)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **Core Engine is 100% Read-Only & Protected:**
   - **NEVER modify or touch core engine files:**  
     `src/ui.tsx`, `src/editor.tsx`, `src/lyrics.tsx`, `src/index.ts`, `src/Root.tsx`, `src/videos/index.tsx`, `src/videos/EmptyPlaceholder.tsx`, `package.json`, `tsconfig.json`.
   - The core engine is what gets pushed to GitHub as a clean public framework. It must remain pure, stable, and completely untouched.
   - `src/videos/index.tsx` uses native dynamic Webpack discovery (`require.context`) to automatically detect any `.tsx` video created under `src/videos/`. You MUST NEVER edit `src/videos/index.tsx`.

2. **Root User Manifest (`user-project.json`):**
   - The user's branding, YouTube channel name (e.g. **"Musical Riad"**), brand colors, active project name, and composition details reside in the root directory file: `user-project.json`.
   - When a user asks to create or edit a video, read `user-project.json` to honor their channel identity and update `activeProject` accordingly.

3. **Self-Contained Video Project (`src/videos/<video-name>.tsx`):**
   - Every video project MUST live in its own single, self-contained file: `src/videos/<video-name>.tsx` (or a dedicated project folder `src/videos/<video-name>/index.tsx`).
   - If the user deletes `src/videos/<video-name>.tsx`, that video is immediately erased from the system without leaving any broken references or collateral changes in the repository.

4. **Modifying an Existing Video vs Creating a New Video:**
   - **Modifying:** When the user asks to edit or adjust an existing video (e.g. "change scene 2 timing", "update text at 15s"), locate and edit ONLY `src/videos/<video-name>.tsx`.
   - **New Video:** When the user provides a prompt for a new, separate video concept, create a brand-new isolated file: `src/videos/<new-video-name>.tsx`.

5. **Mandatory TypeScript Verification:**
   - You MUST run `npm run typecheck` (`node scripts/sync-videos.mjs && tsc --noEmit`) after writing or editing code. If there are any errors, fix them before answering.

---

## 🎬 2. The Three Autonomous AI Video Workflows

### 🅰️ Workflow 1: Autonomous Video Generation From Prompt
When a user says: *"Make a 20s promo video for a SaaS app"*, *"Create a developer intro"*, or *"Build an explainer video"*:
1. Select the visual aesthetic (glassmorphism cards, glowing neons, cyber matrix, kinetic typography).
2. Write the self-contained video inside `src/videos/<video-name>.tsx`.
3. Apply unique, scene-adaptive dynamic backgrounds (never repeat the exact same background across all scenes).
4. Synchronize animation sound effects (`sfx/whoosh.wav`, `sfx/pop.wav`, `sfx/impact.wav`, `sfx/click.wav`, `sfx/chime.wav`) with an ambient electronic beat.
5. Update `user-project.json` with the new composition ID.

### 🅱️ Workflow 2: Autonomous Video Editing & Post-Production
When a user provides an existing video file (in `public/`) and says: *"Edit this video"*, *"Reframe to 9:16 vertical"*, *"Add subtitles and lower-thirds"*, or *"Make a high-retention reel"*:
1. Use `<VideoClip>` to trim, scale, and adjust speed/volume.
2. Use `<ReframeVertical>` to convert 16:9 widescreen to 9:16 vertical shorts with blurred background.
3. Use `<CaptionOverlay>` for word-by-word active highlighting karaoke subtitles.
4. Use `<LowerThird>` for broadcast-grade title cards and `<PunchZoom>` for spoken emphasis.
5. Apply `<DuckedMusic>` so background music automatically ducks when voiceover plays.

### 🅲️ Workflow 3: Autonomous Music & Lyric Video Production
When a user supplies an audio track (e.g. `public/Majaal.mp3`) and song lyrics:
1. **Audio Analysis & Timestamping:**
   - Inspect song length ($30\text{ fps} \times \text{duration in seconds}$).
   - Autonomously analyze rhythm, vocal bursts, and acoustic energy peaks to create millisecond-accurate word-by-word timestamps (`words: LyricWord[]`).
2. **Custom Album Art & Channel Branding:**
   - If user specifies a YouTube channel (e.g. **"Musical Riad"**), prominently embed their channel badge, verified artist icon, and custom album artwork (e.g. `public/cover-musical-riad.svg`).
3. **Aesthetic Selection:**
   - Spotify 3D floating particle card (`<SpotifyLyricCard>`).
   - Aggressive rap/drill kinetic word wall (`<WordWall3D>`, `<BeatCameraShake>`).
   - Cozy lo-fi spinning vinyl player (`<VinylRecordPlayer>`).
   - Synthwave retro neon horizon (`<NeonSynthHorizon>`).
4. **Vocal Lighting:**
   - Active sung words light up in electric green/neon with glowing sparks as the singer vocalizes.

---

## 🔊 3. Mandatory Audio Design Standards

Never produce silent videos. Every video MUST include complete audio design:
1. **Soundtrack:** `<Audio src={staticFile('sfx/beat.wav')} volume={0.35} />` (or user's audio in `public/`).
2. **Animation Sound Effects (SFX):**
   - `sfx/whoosh.wav` — Transitions and card slide-ins.
   - `sfx/pop.wav` — Badges, icons, buttons.
   - `sfx/impact.wav` — Big headlines, milestones, beat drops.
   - `sfx/click.wav` — Typing lines and UI clicks.
   - `sfx/chime.wav` — Achievements, awards, success states.
   - `sfx/riser.wav` — Tension builds before big reveals.

---

## 🎨 4. Aesthetic Typography & Design Tokens

Always import from `@remotion/google-fonts` and CineFlow kits:
- **Headings & Titles:** `Outfit` (weights: 700, 800, 900) for modern, geometric display.
- **Body, Lyrics & UI:** `PlusJakartaSans` (weights: 500, 600, 700) for ultra-clean readability.
- **Color Tokens (`C` in `src/ui.tsx`):**
  - `C.bg`: `#0B0B0F` (Cosmic obsidian)
  - `C.lime`: `#A3E635` / `#1ED760` (Vibrant electric green)
  - `C.violet`: `#7C3AED` (Royal neon violet)
  - `C.text`: `#F5F5F7` (Pristine off-white)
  - `C.dim`: `#A1A1AA` (Soft muted slate)

---

## 📋 5. Mandatory 4-Step Checklist Before Answering the User

1. [ ] Code written strictly inside `src/videos/<video-name>.tsx` (zero edits to core files).
2. [ ] User branding & metadata updated in `user-project.json`.
3. [ ] `npm run typecheck` passes with 0 errors.
4. [ ] Response contains the preview command (`npm run studio`) and render command:  
       `npx remotion render src/index.ts <CompositionId> out/<video-name>.mp4`.
