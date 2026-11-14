import React from 'react';
import {
	AbsoluteFill,
	Composition,
	Folder,
	CanvasImage,
	staticFile,
} from 'remotion';
import {
	CaptionOverlay,
	Card3D,
	EditorProgressBar,
	LowerThird,
	ScreenshotMockup,
	TerminalTypist,
} from '../../editor';
import {MusicPlayerHUD, SpotifyLyricCard, WordWall3D} from '../../lyrics';
import {Background, C, FONT, gradientText, Kinetic, Rise, Tile} from '../../ui';

// =========================================================================
// 1. DEMO: SPOTIFY 3D LYRICS
// =========================================================================
export const DemoSpotifyLyrics: React.FC = () => {
	const sampleLines = [
		{startFrame: 0, endFrame: 60, text: 'I said, ooh, I\'m blinded by the lights'},
		{startFrame: 60, endFrame: 150, text: 'No, I can\'t sleep until I feel your touch'},
		{startFrame: 150, endFrame: 240, text: 'I said, ooh, I\'m drowning in the night'},
	];

	return (
		<AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT, alignItems: 'center', justifyContent: 'center'}}>
			<Background />
			<WordWall3D words={['BLINDED', 'LIGHTS', 'MIDNIGHT', 'SHINE', 'SYNTH', 'NEON', 'ECHO']} color="rgba(30, 215, 96, 0.08)" />
			<SpotifyLyricCard
				trackTitle="Blinding Lights"
				artistName="The Weeknd • After Hours"
				accentColor="#1ED760"
				lines={sampleLines}
			/>
		</AbsoluteFill>
	);
};

// =========================================================================
// 2. DEMO: VIDEO EDITING & LOWER THIRDS
// =========================================================================
export const DemoVideoEditor: React.FC = () => {
	const captions = [
		{startFrame: 0, endFrame: 150, text: 'Ship Production Motion Graphics Directly In Code'},
	];

	return (
		<>
			<AbsoluteFill style={{backgroundColor: '#090A0F', fontFamily: FONT, alignItems: 'center', justifyContent: 'center'}}>
				<Background />
				{/* Mockup presentation of the edited footage */}
				<div style={{transform: 'scale(0.92)'}}>
					<ScreenshotMockup
						src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80"
						title="CineFlow Studio - Frame Inspector"
						width={1240}
						delay={0}
						zoomOnHover={false}
					/>
				</div>
			
				<LowerThird
					title="Alex Rivera"
					subtitle="Senior Motion Director • CineFlow"
					accentColor="#A3E635"
					delay={0}
					positionBottom={64}
				/>
			
				<CaptionOverlay
					segments={captions}
					activeColor="#A3E635"
					fontSize={52}
					positionBottom={150}
				/>
			</AbsoluteFill>
			<CanvasImage
				src={staticFile('photo-1550745165-9bc0b252726f.jpg')}
				style={{
					position: 'absolute',
					translate: '189.7px -136.1px',
					width: 1200,
					height: 800
				}}
			/>
		</>
	);
};

// =========================================================================
// 3. DEMO: TECH EXPLAINER (Terminal + 3D Card)
// =========================================================================
export const DemoTechExplainer: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT, padding: 80, justifyContent: 'center'}}>
			<Background />
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 60, width: '100%'}}>
				{/* Left: Terminal */}
				<div style={{flex: 1}}>
					<TerminalTypist
						lines={[
							{prompt: '➜ ~', command: 'docker compose up -d', output: '✔ Network cineflow-net Created\n✔ Container redis Started (healthy)\n✔ Container api Started (listening on :8080)', delay: 0},
						]}
						title="zsh - 80x24"
						width={880}
						fontSize={22}
						accentColor={C.lime}
					/>
				</div>

				{/* Right: 3D Explanation Card */}
				<div style={{flex: 1}}>
					<Card3D delay={0} style={{width: 760, padding: 48}}>
						<div style={{fontSize: 28, fontWeight: 700, color: C.lime, textTransform: 'uppercase', letterSpacing: 2}}>
							Core Mental Model
						</div>
						<div style={{fontSize: 54, fontWeight: 900, color: '#FFFFFF', marginTop: 12, lineHeight: 1.15}}>
							Containerized Microservices
						</div>
						<div style={{fontSize: 26, color: C.dim, marginTop: 20, lineHeight: 1.5}}>
							Each service runs in complete isolation with its own network namespace, dependencies, and memory ceiling. Zero host bleed.
						</div>
					</Card3D>
				</div>
			</div>
		</AbsoluteFill>
	);
};

// =========================================================================
// 4. DEMO: 9:16 VERTICAL SHORT / REEL
// =========================================================================
export const DemoVerticalShort: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT, alignItems: 'center', justifyContent: 'center', padding: '0 40px'}}>
			<Background />
			<EditorProgressBar position="top" height={10} color="#A3E635" />

			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 36, marginTop: -80}}>
				<div
					style={{
						padding: '12px 28px',
						borderRadius: 999,
						backgroundColor: 'rgba(163, 230, 53, 0.12)',
						border: '1px solid rgba(163, 230, 53, 0.4)',
						color: C.lime,
						fontSize: 26,
						fontWeight: 800,
						letterSpacing: 2,
						textTransform: 'uppercase',
					}}
				>
					⚡ Quick Dev Tip #1
				</div>

				<div
					style={{
						fontSize: 78,
						fontWeight: 900,
						color: '#FFFFFF',
						lineHeight: 1.1,
						letterSpacing: -2,
						...gradientText(C.lime, C.violetSoft),
					}}
				>
					HOW TO SHIP VIDEOS WITH AI
				</div>

				<div
					style={{
						width: 860,
						padding: 44,
						borderRadius: 32,
						background: 'rgba(255, 255, 255, 0.05)',
						border: '1px solid rgba(255, 255, 255, 0.12)',
						backdropFilter: 'blur(20px)',
						boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
						textAlign: 'left',
						display: 'flex',
						flexDirection: 'column',
						gap: 16,
					}}
				>
					<div style={{fontSize: 34, fontWeight: 800, color: '#FFF'}}>
						Step 1: Write Remotion Code
					</div>
					<div style={{fontSize: 26, color: C.dim, lineHeight: 1.4}}>
						Don't drag clips on a timeline. Define sequences, spring physics, and kinetic text using standard React & TypeScript.
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

// =========================================================================
// 5. DEMO: SAAS MOTION PROMO
// =========================================================================
export const DemoSaaSPromo: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT, alignItems: 'center', justifyContent: 'center'}}>
			<Background />
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28}}>
				<div
					style={{
						fontSize: 108,
						fontWeight: 900,
						letterSpacing: -2,
						textAlign: 'center',
						lineHeight: 1.05,
						...gradientText(C.lime, C.violetSoft),
					}}
				>
					PROGRAMMATIC VIDEO
					<br />
					AT SCALE
				</div>

				<div style={{fontSize: 36, color: C.dim, fontWeight: 500, letterSpacing: 0.5}}>
					Turn Natural Language Prompts Into Studio-Grade Motion Graphics
				</div>

				<div style={{display: 'flex', gap: 32, marginTop: 24}}>
					{['100% Code-Driven', 'Spring Physics', 'Headless Chrome Rendering', 'Ultra Fast Export'].map((tag) => (
						<div
							key={tag}
							style={{
								padding: '16px 34px',
								borderRadius: 999,
								background: 'rgba(255,255,255,0.06)',
								border: '1px solid rgba(255,255,255,0.12)',
								fontSize: 24,
								fontWeight: 700,
								color: '#FFFFFF',
							}}
						>
							{tag}
						</div>
					))}
				</div>
			</div>
		</AbsoluteFill>
	);
};

// =========================================================================
// REGISTER DEMO COMPOSITIONS
// =========================================================================
export const DemoCompositions: React.FC = () => {
	return (
		<Folder name="Demos">
			<Composition
				id="DemoSpotifyLyrics"
				component={DemoSpotifyLyrics}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="DemoVideoEditor"
				component={DemoVideoEditor}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="DemoTechExplainer"
				component={DemoTechExplainer}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="DemoVerticalShort"
				component={DemoVerticalShort}
				durationInFrames={300}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="DemoSaaSPromo"
				component={DemoSaaSPromo}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
			/>
		</Folder>
	);
};
