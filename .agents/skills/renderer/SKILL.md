---
name: cineflow-renderer
description: >-
  CLI rendering, export optimization, concurrency tuning, and troubleshooting for CineFlow.
  Use whenever rendering videos to MP4, WebM, or GIF, exporting still image thumbnails,
  tuning render performance/concurrency, or fixing headless Chrome and bundling errors.
---

# CineFlow Video Renderer & CLI Guide

This skill guides running and optimizing Remotion rendering commands for production exports.

---

## 1. Primary Render Commands

### 1. List Available Compositions
Verify which videos are registered and available to render:
```bash
npx remotion compositions
```

### 2. Standard MP4 Render (Full HD 1080p)
```bash
npx remotion render src/index.ts <CompositionId> out/<output-filename>.mp4
```
*Example:*
```bash
npx remotion render src/index.ts Welcome out/welcome.mp4
```

### 3. Render a Still Frame (Thumbnail / Poster Image)
Render a single frame as a PNG or JPEG:
```bash
npx remotion still src/index.ts <CompositionId> out/thumbnail.png --frame=45
```

---

## 2. Quality & Performance Flags

| Flag | Purpose | Recommended Value |
| :--- | :--- | :--- |
| `--concurrency` | Number of worker threads for parallel frame rendering | `50%` to `100%` of CPU cores (e.g. `--concurrency=4` or `--concurrency=8`) |
| `--crf` | Constant Rate Factor (Video compression quality) | `18` (high quality), `23` (default), `28` (small file size) |
| `--pixel-format` | Chroma subsampling | `yuv420p` (maximum compatibility for iOS, Android & web) |
| `--gl` | OpenGL renderer backend | `angle` or `swiftshader` |
| `--quiet` | Suppress verbose frame logs | Recommended for automated scripts |

### High Quality Fast Render Example:
```bash
npx remotion render src/index.ts <CompositionId> out/<output>.mp4 --concurrency=6 --crf=18 --pixel-format=yuv420p
```

---

## 3. Specialized Formats

### 1. Transparent WebM (Alpha Channel)
For animated overlays, transparent stickers, or HUDs:
```bash
npx remotion render src/index.ts <CompositionId> out/overlay.webm --codec=vp9
```

### 2. Animated GIF
For README previews or Discord / Slack:
```bash
npx remotion render src/index.ts <CompositionId> out/preview.gif
```

---

## 4. Common Errors & Troubleshooting

1. **`Composition not found`**:
   - Ensure the video composition is registered inside `<Folder name="Videos">` in `src/videos/index.tsx`.
   - Run `npx remotion compositions` to verify the exact ID spelling.

2. **TypeScript Compilation Error (`tsc --noEmit`)**:
   - Always run `npx tsc --noEmit` before rendering to catch any missing props, bad imports, or syntax issues upfront.

3. **Missing Static Asset (`staticFile`)**:
   - Check that assets referenced by `staticFile('filename.png')` exist in the `public/` directory.
