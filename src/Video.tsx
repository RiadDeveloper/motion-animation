import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile} from 'remotion';
import assets from './assets.json';
import {Background, C, FONT, T} from './ui';
import {Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7} from './scenes';

export const FPS = 30;
export const TOTAL = 60 * FPS;

// Scene start times in seconds, straight from the brief.
const scenes: {start: number; end: number; C: React.FC}[] = [
	{start: 0, end: 6, C: Scene1},
	{start: 6, end: 14, C: Scene2},
	{start: 14, end: 22, C: Scene3},
	{start: 22, end: 38, C: Scene4},
	{start: 38, end: 46, C: Scene5},
	{start: 46, end: 52, C: Scene6},
	{start: 52, end: 60, C: Scene7},
];

export const Video: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT, color: C.text}}>
		<Background />
		{scenes.map(({start, end, C: Comp}, i) => {
			const last = i === scenes.length - 1;
			return (
				<Sequence
					key={i}
					from={start * FPS}
					// Each scene overlaps the next by T frames for the transition.
					durationInFrames={(end - start) * FPS + (last ? 0 : T)}
				>
					<Comp />
				</Sequence>
			);
		})}
		{assets.music ? (
			<Audio
				src={staticFile(assets.music)}
				volume={(f) =>
					interpolate(f, [0, 30, TOTAL - 75, TOTAL - 5], [0, 0.8, 0.8, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})
				}
			/>
		) : null}
	</AbsoluteFill>
);
