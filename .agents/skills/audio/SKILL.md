---
name: cineflow-audio
description: >-
  Audio integration, sound design, volume interpolation, and beat-matching for CineFlow videos.
  Use whenever adding background music, sound effects (whoosh, pop, click, riser), audio ducking,
  fading in/out, or synchronizing visual scene transitions with audio tracks.
---

# CineFlow Audio Sync & Sound Design Skill

This skill guides adding audio tracks, sound effects, automated volume curves, and audio-visual synchronization in Remotion.

---

## 1. Core Audio Component in Remotion

Remotion provides the `<Audio />` component for seamless audio playback and rendering:

```tsx
import {Audio, staticFile, interpolate} from 'remotion';

// Place audio files in the public/ folder or reference via URL
<Audio
  src={staticFile('music.mp3')}
  volume={(f) =>
    interpolate(f, [0, 30, TOTAL_FRAMES - 60, TOTAL_FRAMES], [0, 0.8, 0.8, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  }
/>
```

---

## 2. Professional Volume Automation Curves

### 1. Fade-in and Fade-out Curve
Smoothly rises from 0 to full volume over the first $N$ frames, holds, then fades out before the video ends:

```tsx
export const audioVolumeCurve = (
  frame: number,
  totalFrames: number,
  fadeInFrames = 30,
  fadeOutFrames = 60,
  maxVolume = 0.8
) => {
  return interpolate(
    frame,
    [0, fadeInFrames, totalFrames - fadeOutFrames, totalFrames],
    [0, maxVolume, maxVolume, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
};
```

### 2. Audio Ducking (During Voiceover or Key Messages)
Lowering background music volume when key audio or important messaging is highlighted:

```tsx
<Audio
  src={staticFile('background-music.mp3')}
  volume={(f) => {
    // Duck volume during scene 2 (frames 150 to 300)
    return interpolate(
      f,
      [0, 30, 140, 160, 290, 310, total - 45, total],
      [0, 0.8, 0.8, 0.25, 0.25, 0.8, 0.8, 0],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
    );
  }}
/>
```

---

## 3. Multi-Track Sound Effects (SFX)

Add punchy micro-sounds (whooshes, pops, impacts) triggered precisely on scene transitions or element arrivals:

```tsx
import {Audio, Sequence, staticFile} from 'remotion';

// Trigger whoosh on scene transition at frame 90
<Sequence from={90}>
  <Audio src={staticFile('sfx/whoosh.mp3')} volume={0.6} />
</Sequence>

// Trigger pop sound when badge appears at frame 140
<Sequence from={140}>
  <Audio src={staticFile('sfx/pop.mp3')} volume={0.7} />
</Sequence>
```

---

## 4. BPM & Beat Synchronization Math

To sync scene cuts or visual pulses to music BPM:

$$\text{FramesPerBeat} = \frac{60}{\text{BPM}} \times \text{FPS}$$

For a 120 BPM track at 30 FPS:
$$\text{FramesPerBeat} = \frac{60}{120} \times 30 = 15 \text{ frames}$$

- **Every 1 beat (15 frames):** Micro pulse, particle flash, or shockwave ring.
- **Every 4 beats (60 frames / 2 seconds):** Secondary element arrival.
- **Every 8 or 16 beats (120 or 240 frames):** Major scene cut / camera shift.
