# Riad Developer — Intro Video (Remotion)

60-second, 1920×1080, 30 fps motion graphics intro, built in code with [Remotion](https://remotion.dev).

## Your files

Put these in the `public` folder (the names matter, the extension can vary):

- `public/photo.jpg` — your photo (jpg, jpeg, png or webp). Square-ish, face centred works best. Without it the video shows an "RD" placeholder.
- `public/music.mp3` — optional background track (mp3, wav, m4a). Without it the video is silent.

## Commands

```bash
npm install
```

```bash
npm run studio
```

```bash
npm run render
```

- `studio` opens a live preview in the browser where you can scrub through the timeline.
- `render` writes the final video to `out/riad-intro.mp4`.

## Where things are

- `src/Video.tsx` — scene order and timing
- `src/scenes.tsx` — the seven scenes and all on-screen text
- `src/ui.tsx` — colours, background, photo ring, shared animation helpers
