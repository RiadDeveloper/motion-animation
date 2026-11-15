---
name: cineflow-director
description: >-
  Master Autonomous AI Video Director & Skill Orchestrator for CineFlow.
  Use as the primary entry point whenever a user requests to create, edit, trim, reframe,
  enhance, or post-produce any video, reel, short, explainer, music/lyric video, or motion animation.
  Autonomously analyzes user prompts and media, enforces the Zero-Touch Core Architecture,
  picks the right specialized skill from .agents/skills/<skill-name>/SKILL.md, and executes the complete production end-to-end.
---

# CineFlow — Master AI Video Director & Skill Orchestrator

CineFlow is an open-source autonomous AI video director for programmatic video creation, editing, and music video production. When any user provides a natural language prompt, CineFlow autonomously analyzes intent, chooses the specialized skill, and executes end-to-end production without modifying core framework files.

---

## 🛑 Supreme Rule: Zero-Touch Core Architecture

To keep this public repository pristine on GitHub:
1. **Core Engine is 100% Read-Only:**  
   NEVER modify `src/ui.tsx`, `src/editor.tsx`, `src/lyrics.tsx`, `src/index.ts`, `src/Root.tsx`, `src/videos/index.tsx`, `scripts/`, or `package.json`.
2. **User Manifest in Root (`user-project.json`):**  
   User identity, YouTube channel branding (e.g. **"Musical Riad"**), brand colors, active project metadata, and render targets live in the root `user-project.json`. Read and update this file with user details.
3. **Isolated Video Workspaces (`src/videos/<video-name>.tsx`):**  
   All code for a video must live strictly inside `src/videos/<video-name>.tsx` (or `src/videos/<video-name>/index.tsx`). Deleting that file/folder completely deletes the video with 0 collateral edits.
4. **User Assets in `public/`:**  
   User MP3 songs, background videos, and custom cover SVGs/images reside in `public/`.

---

## 1. Autonomous Skill Selector

| User Prompt Type | Auto-Selected Skill | Reference Path |
| :--- | :--- | :--- |
| **Music & Lyric Videos**<br>Spotify 3D tilted cards, rap & drill word walls, bass kick camera shakes, lo-fi vinyl, synthwave neon, audio burst analysis | `cineflow-lyrics`<br>`cineflow-audio` | `.agents/skills/lyrics/SKILL.md`<br>`.agents/skills/audio/SKILL.md` |
| **Editing Existing Footage**<br>Cut, trim, jump cuts, punch zoom, lower-thirds, subtitles, PiP facecam, audio ducking | `cineflow-editor`<br>`cineflow-audio` | `.agents/skills/editor/SKILL.md`<br>`.agents/skills/audio/SKILL.md` |
| **Explainers & Tech Tutorials**<br>Concepts, code typing in terminal, continuous 3D camera, architecture diagrams | `cineflow-explainers`<br>`cineflow-design` | `.agents/skills/explainers/SKILL.md`<br>`.agents/skills/design/SKILL.md` |
| **Vertical Shorts & Reels**<br>9:16 mobile feeds, 2s hook, top progress bar, karaoke captions, landscape-to-vertical | `cineflow-shorts`<br>`cineflow-editor` | `.agents/skills/shorts/SKILL.md`<br>`.agents/skills/editor/SKILL.md` |
| **New Motion Graphics From Scratch**<br>SaaS promos, product intros, kinetic typography, neon glassmorphism | `cineflow-creator`<br>`cineflow-design` | `.agents/skills/creator/SKILL.md`<br>`.agents/skills/design/SKILL.md` |
| **CLI Rendering & Exporting**<br>Render to MP4, WebM overlay, animated GIF, still thumbnails, concurrency tuning | `cineflow-renderer` | `.agents/skills/renderer/SKILL.md` |

---

## 2. Standard Production Pipeline

```mermaid
flowchart LR
    A["1. Inspect Prompt & user-project.json"] --> B["2. Write src/videos/<project>.tsx"]
    B --> C["3. Auto-Sync & Verify (npm run typecheck)"]
    C --> D["4. Deliver Studio & Render Commands"]
```

### Production Checklist:
1. **Locate or Create File:**  
   - If user asks to modify an existing video: edit `src/videos/<video-name>.tsx`.
   - If user asks for a new video: create a new file `src/videos/<new-video-name>.tsx`.
2. **Audio & Sound Design:**  
   - Include ambient electronic soundtrack or user MP3.
   - Add animation sound effects (`sfx/whoosh.wav`, `sfx/pop.wav`, `sfx/impact.wav`, `sfx/click.wav`, `sfx/chime.wav`).
3. **Unique Scene Backgrounds:**  
   - Never repeat the same background throughout. Each scene gets a tailored backdrop.
4. **Verify Types:**  
   - Always run `npm run typecheck` (`node scripts/sync-videos.mjs && tsc --noEmit`) before responding.
5. **Update Manifest:**  
   - Record active project in `user-project.json`.
