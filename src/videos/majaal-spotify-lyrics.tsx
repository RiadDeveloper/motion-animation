import React from 'react';
import {
	AbsoluteFill,
	Audio,
	random,
	staticFile,
	useCurrentFrame,
} from 'remotion';
import {EditorProgressBar} from '../editor';
import {LyricLine, SpotifyLyricCard, WordWall3D} from '../lyrics';
import {C, FONT} from '../ui';

// =========================================================================
// COMPOSITION CONFIGURATION (127.4s | 3823 Frames | 1080p @ 30 FPS)
// =========================================================================
export const config = {
	id: 'MajaalSpotifyLyrics',
	fps: 30,
	durationInFrames: 3823,
	width: 1920,
	height: 1080,
};

// =========================================================================
// LYRIC DATA & KEYWORDS
// =========================================================================
const keywords = [
	'MAJAAL',
	'TEHSEEN',
	'MAHI',
	'TERE NAAL',
	'TERE BAAD',
	'ZINDAGI',
	'CHANN',
	'YAAR',
	'DIL',
	'HUM TERE BAAD',
	'JATAN',
	'PYAAR',
	'SAWAAL',
	'RUL JAAWAAN',
	'MALAAL',
	'ROMANCE',
	'MELODY',
	'PUNJABI',
	'SOUL',
	'VIBES',
];

const lyrics: LyricLine[] = [
	{startFrame: 0, endFrame: 450, text: '♪ Instrumental Intro • Tehseen ♪'},
	// Stanza 1: Hook / Chorus 1
	{startFrame: 450, endFrame: 570, text: 'Ke Mahi tere naal nahi,', translation: 'Beloved, without you by my side,'},
	{startFrame: 570, endFrame: 690, text: 'Ke Mahi tere baad nahi,', translation: 'Beloved, there is no one after you,'},
	{startFrame: 690, endFrame: 810, text: 'Koi zindagi ’ch aa jaave,', translation: 'That anyone else could enter my life,'},
	{startFrame: 810, endFrame: 930, text: 'Ae kise di majaal nahi.', translation: 'No one has the audacity or power.'},
	// Stanza 2: Verse 1
	{startFrame: 930, endFrame: 1050, text: 'Chann vi saada yaar hove,', translation: 'Even the moon would become our friend,'},
	{startFrame: 1050, endFrame: 1170, text: 'Jo tu mere naal hove,', translation: 'If only you were here with me,'},
	{startFrame: 1170, endFrame: 1290, text: 'Main har vele hassda rawaan,', translation: 'I would smile and laugh every moment,'},
	{startFrame: 1290, endFrame: 1410, text: 'Te eho mera haal hove.', translation: 'And that would be the state of my heart.'},
	// Stanza 3: Hook / Chorus 2
	{startFrame: 1410, endFrame: 1530, text: 'Ke Mahi tere naal nahi,', translation: 'Beloved, without you by my side,'},
	{startFrame: 1530, endFrame: 1650, text: 'Ke Mahi tere baad nahi,', translation: 'Beloved, there is no one after you,'},
	{startFrame: 1650, endFrame: 1770, text: 'Koi zindagi ’ch aa jaave,', translation: 'That anyone else could enter my life,'},
	{startFrame: 1770, endFrame: 1890, text: 'Ae kise di majaal nahi.', translation: 'No one has the audacity or power.'},
	// Stanza 4: Bridge Part 1
	{startFrame: 1890, endFrame: 1950, text: 'Hum tere baad', translation: 'After you,'},
	{startFrame: 1950, endFrame: 2010, text: 'Ab kisko kahein?', translation: 'Whom shall we call our own?'},
	{startFrame: 2010, endFrame: 2070, text: 'Tu nahi mila,', translation: 'If you were not meant to be,'},
	{startFrame: 2070, endFrame: 2130, text: 'To kya jatan karein?', translation: 'Then what effort should we make?'},
	// Stanza 5: Bridge Part 2
	{startFrame: 2130, endFrame: 2190, text: 'Hum tere baad', translation: 'After you,'},
	{startFrame: 2190, endFrame: 2250, text: 'Ab kisko kahein?', translation: 'Whom shall we call our own?'},
	{startFrame: 2250, endFrame: 2310, text: 'Tu nahi mila,', translation: 'If you were not meant to be,'},
	{startFrame: 2310, endFrame: 2370, text: 'To kya jatan karein?', translation: 'Then what effort should we make?'},
	// Stanza 6: Verse 2
	{startFrame: 2370, endFrame: 2490, text: 'Ke mainu tere pyaar te', translation: 'Upon your deep love,'},
	{startFrame: 2490, endFrame: 2610, text: 'Hun hor koi sawaal nahi,', translation: 'I have no remaining doubts or questions,'},
	{startFrame: 2610, endFrame: 2730, text: 'Main tere pichhe rul jaawaan,', translation: 'Even if I wander and lose myself for you,'},
	{startFrame: 2730, endFrame: 2850, text: 'Te mainu koi malaal nahi.', translation: 'I hold no regret in my soul.'},
	// Stanza 7: Hook / Chorus 3 (Climax)
	{startFrame: 2850, endFrame: 2985, text: 'Ke Mahi tere naal nahi,', translation: 'Beloved, without you by my side,'},
	{startFrame: 2985, endFrame: 3120, text: 'Ke Mahi tere baad nahi,', translation: 'Beloved, there is no one after you,'},
	{startFrame: 3120, endFrame: 3255, text: 'Koi zindagi ’ch aa jaave,', translation: 'That anyone else could enter my life,'},
	{startFrame: 3255, endFrame: 3420, text: 'Ae kise di majaal nahi.', translation: 'No one has the audacity or power.'},
	// Outro
	{startFrame: 3420, endFrame: 3823, text: '♪ Majaal • Tehseen • Outro Fades ♪'},
];

// =========================================================================
// SPOTIFY 3D AMBIENT ATMOSPHERE
// =========================================================================
const AmbientBackdrop: React.FC = () => {
	const f = useCurrentFrame();
	const pulse = 0.5 + 0.5 * Math.sin(f / 25);
	const rot1 = f * 0.25;
	const rot2 = -f * 0.2;

	return (
		<AbsoluteFill style={{backgroundColor: '#07070B', overflow: 'hidden'}}>
			{/* Drifting 3D Lyric Word Wall in deep background */}
			<WordWall3D words={keywords} color="rgba(255, 255, 255, 0.04)" tiltAngle={-24} fontSize={72} />

			{/* Large Ambient Spotify Green Glowing Orbs */}
			<div
				style={{
					position: 'absolute',
					top: -150,
					left: '50%',
					marginLeft: -450,
					width: 900,
					height: 900,
					borderRadius: '50%',
					background: `radial-gradient(circle, rgba(30, 215, 96, 0.22) 0%, rgba(163, 230, 53, 0.08) 45%, transparent 72%)`,
					transform: `rotate(${rot1}deg) scale(${1 + pulse * 0.08})`,
					filter: 'blur(50px)',
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: -200,
					right: -100,
					width: 850,
					height: 850,
					borderRadius: '50%',
					background: `radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, transparent 68%)`,
					transform: `rotate(${rot2}deg)`,
					filter: 'blur(60px)',
					pointerEvents: 'none',
				}}
			/>

			{/* Floating Ambient Starlight Particles */}
			{new Array(36).fill(0).map((_, i) => {
				const speed = 0.2 + random(`ps${i}`) * 0.5;
				const y = ((f * speed * 22 + i * 80) % 1150) - 50;
				const x = (random(`px${i}`) * 1920 + Math.sin(f / 30 + i) * 20) % 1920;
				const sz = 2.5 + random(`pz${i}`) * 3.5;
				const color = i % 3 === 0 ? '#1ED760' : i % 3 === 1 ? '#A3E635' : '#FFFFFF';
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x,
							top: y,
							width: sz,
							height: sz,
							borderRadius: '50%',
							backgroundColor: color,
							boxShadow: `0 0 ${sz * 3}px ${color}`,
							opacity: 0.35 + 0.45 * Math.sin(f / 14 + i),
							pointerEvents: 'none',
						}}
					/>
				);
			})}

			{/* Subtle Vignette overlay */}
			<AbsoluteFill
				style={{
					background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(0,0,0,0.7) 100%)',
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};

// =========================================================================
// MAIN VIDEO COMPOSITION (16:9 Spotify 3D Particle Lyric Video)
// =========================================================================
export const MajaalSpotifyLyrics: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: C.bg,
				fontFamily: FONT,
				color: C.text,
				overflow: 'hidden',
			}}
		>
			{/* 1. Original User Song Track */}
			<Audio src={staticFile('Majaal.mp3')} volume={1} />

			{/* 2. Ambient 3D Backdrop & Floating WordWall */}
			<AmbientBackdrop />

			{/* 3. Top Retention Progress Bar */}
			<EditorProgressBar position="top" height={5} color="#1ED760" />

			{/* 4. Center Spotify 3D Tilted Particle Card */}
			<AbsoluteFill
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 10,
				}}
			>
				<SpotifyLyricCard
					lines={lyrics}
					trackTitle="Majaal"
					artistName="Tehseen"
					coverImage="photo.jpg"
					accentColor="#1ED760"
					cardTiltX={7}
					cardTiltY={-10}
					width={880}
					height={920}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

export default MajaalSpotifyLyrics;
