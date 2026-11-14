import React from 'react';
import {
	AbsoluteFill,
	Audio,
	interpolate,
	random,
	Sequence,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {
	siDart,
	siFlutter,
	siGithub,
	siGo,
	siJavascript,
	siNodedotjs,
	siOpenjdk,
	siPython,
	siTypescript,
} from 'simple-icons';
import {EditorProgressBar} from '../editor';
import {
	Brand,
	C,
	clamp,
	FONT,
	gradientText,
	icons,
	Kinetic,
	Line,
	Photo,
	POP,
	Rise,
	Scene,
	spr,
	Tile,
} from '../ui';

// =========================================================================
// COMPOSITION CONFIGURATION (60 Seconds | 1800 Frames | 1080p @ 30 FPS)
// =========================================================================
export const config = {
	id: 'RiadDeveloperIntro',
	fps: 30,
	durationInFrames: 1800,
	width: 1920,
	height: 1080,
};

// =========================================================================
// DYNAMIC SCENE BACKGROUNDS (Each scene has a distinct atmospheric design)
// =========================================================================

/** Scene 1 Background: Cosmic Obsidian Void with Rotating Dual-Nebula Vortex */
const BgScene1: React.FC = () => {
	const f = useCurrentFrame();
	const rot1 = f * 0.4;
	const rot2 = -f * 0.3;
	const pulse = 0.5 + 0.5 * Math.sin(f / 16);

	return (
		<AbsoluteFill style={{backgroundColor: '#07070B', overflow: 'hidden'}}>
			{/* Rotating Violet Nebula */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					width: 1100,
					height: 1100,
					marginLeft: -550,
					marginTop: -550,
					borderRadius: '50%',
					background: `radial-gradient(circle, rgba(124, 58, 237, 0.38) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 72%)`,
					transform: `rotate(${rot1}deg) scale(${1 + pulse * 0.08})`,
					filter: 'blur(40px)',
				}}
			/>
			{/* Rotating Lime Burst Nebula */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					width: 900,
					height: 900,
					marginLeft: -450,
					marginTop: -450,
					borderRadius: '50%',
					background: `radial-gradient(circle, rgba(163, 230, 53, 0.24) 0%, rgba(163, 230, 53, 0.05) 45%, transparent 70%)`,
					transform: `rotate(${rot2}deg) scale(${1 - pulse * 0.05})`,
					filter: 'blur(35px)',
				}}
			/>
			{/* Central Orbiting Particle Vortex */}
			{new Array(50).fill(0).map((_, i) => {
				const angle = random(`a${i}`) * Math.PI * 2 + f * (0.012 + random(`s${i}`) * 0.008);
				const dist = 120 + random(`d${i}`) * 520;
				const sz = 2.5 + random(`sz${i}`) * 4;
				const x = 960 + Math.cos(angle) * dist;
				const y = 540 + Math.sin(angle) * dist * 0.6;
				const col = i % 2 === 0 ? C.lime : C.violetSoft;
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
							backgroundColor: col,
							boxShadow: `0 0 ${sz * 3}px ${col}`,
							opacity: 0.4 + 0.5 * Math.sin(f / 12 + i),
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

/** Scene 2 Background: Dark Cyber Matrix Grid with Floating Data Columns */
const BgScene2: React.FC = () => {
	const f = useCurrentFrame();
	const gridScrollY = (f * 1.2) % 60;

	return (
		<AbsoluteFill style={{backgroundColor: '#090B12', overflow: 'hidden'}}>
			{/* Perspective Cyber Grid */}
			<AbsoluteFill
				style={{
					backgroundImage: `
						linear-gradient(rgba(163, 230, 53, 0.05) 1px, transparent 1px),
						linear-gradient(90deg, rgba(124, 58, 237, 0.05) 1px, transparent 1px)
					`,
					backgroundSize: '60px 60px',
					backgroundPosition: `0px ${gridScrollY}px`,
					opacity: 0.85,
				}}
			/>
			{/* Drifting Cyber Light Bars */}
			{new Array(8).fill(0).map((_, i) => {
				const x = 120 + i * 220;
				const y = ((f * (1.5 + i * 0.4) + i * 150) % 1200) - 100;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x,
							top: y,
							width: 2,
							height: 140,
							background: `linear-gradient(180deg, transparent, ${i % 2 === 0 ? C.lime : C.violetSoft}, transparent)`,
							opacity: 0.35,
						}}
					/>
				);
			})}
			<AbsoluteFill
				style={{
					background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(9, 11, 18, 0.85) 100%)',
				}}
			/>
		</AbsoluteFill>
	);
};

/** Scene 3 Background: Hexagonal Indigo Mesh with Animated Commit Branches */
const BgScene3: React.FC = () => {
	const f = useCurrentFrame();

	return (
		<AbsoluteFill style={{backgroundColor: '#060B18', overflow: 'hidden'}}>
			{/* Giant GitHub Watermark Silhouette in Background */}
			<div
				style={{
					position: 'absolute',
					right: -80,
					bottom: -100,
					opacity: 0.035,
					transform: 'rotate(-12deg) scale(1.4)',
					pointerEvents: 'none',
				}}
			>
				<Brand icon={siGithub} size={700} color="#FFFFFF" />
			</div>
			{/* Interconnected Commit Graph Nodes */}
			{new Array(14).fill(0).map((_, i) => {
				const x = 150 + (i * 125) % 1650;
				const y = 200 + ((i * 180) % 700);
				const pulse = 0.5 + 0.5 * Math.sin(f / 15 + i);
				return (
					<React.Fragment key={i}>
						<div
							style={{
								position: 'absolute',
								left: x,
								top: y,
								width: 8,
								height: 8,
								borderRadius: '50%',
								backgroundColor: i % 3 === 0 ? C.lime : '#38BDF8',
								boxShadow: `0 0 16px ${i % 3 === 0 ? C.lime : '#38BDF8'}`,
								opacity: 0.4 + pulse * 0.5,
							}}
						/>
						{i > 0 && (
							<div
								style={{
									position: 'absolute',
									left: Math.min(x, 150 + ((i - 1) * 125) % 1650),
									top: Math.min(y, 200 + (((i - 1) * 180) % 700)),
									width: Math.abs(x - (150 + ((i - 1) * 125) % 1650)),
									height: 1,
									background: 'rgba(56, 189, 248, 0.12)',
								}}
							/>
						)}
					</React.Fragment>
				);
			})}
			<AbsoluteFill
				style={{
					background: 'radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.14) 0%, transparent 65%)',
				}}
			/>
		</AbsoluteFill>
	);
};

/** Scene 4 Background: Deep Glassmorphic Showcase with Shifting Prisms & Bokeh */
const BgScene4: React.FC = () => {
	const f = useCurrentFrame();

	return (
		<AbsoluteFill style={{backgroundColor: '#0E0818', overflow: 'hidden'}}>
			{/* Ambient Glowing Corner Lights */}
			<div
				style={{
					position: 'absolute',
					top: -200,
					left: -200,
					width: 800,
					height: 800,
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
					filter: 'blur(60px)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: -200,
					right: -200,
					width: 800,
					height: 800,
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, transparent 70%)',
					filter: 'blur(60px)',
				}}
			/>
			{/* Drifting Bokeh Balls */}
			{new Array(16).fill(0).map((_, i) => {
				const speed = 0.3 + random(`bs${i}`) * 0.5;
				const sz = 60 + random(`bz${i}`) * 120;
				const x = (random(`bx${i}`) * 1920 + f * speed * 20) % 2100 - 100;
				const y = (random(`by${i}`) * 1080 + Math.sin(f / 40 + i) * 60) % 1180 - 50;
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
							background: `radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)`,
							border: '1px solid rgba(255, 255, 255, 0.05)',
							filter: 'blur(8px)',
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

/** Scene 5 Background: 3D Cyber Particle Accelerator & Tech Radial Rings */
const BgScene5: React.FC = () => {
	const f = useCurrentFrame();

	return (
		<AbsoluteFill style={{backgroundColor: '#050814', overflow: 'hidden'}}>
			{/* Concentric Energy Rings */}
			{[300, 520, 740, 960].map((radius, idx) => {
				const rot = (f * (0.2 + idx * 0.1) * (idx % 2 === 0 ? 1 : -1)) % 360;
				return (
					<div
						key={idx}
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							width: radius * 2,
							height: radius * 1.1,
							marginLeft: -radius,
							marginTop: -radius * 0.55,
							borderRadius: '50%',
							border: `1px dashed rgba(56, 189, 248, ${0.18 - idx * 0.03})`,
							transform: `rotate(${rot}deg)`,
						}}
					/>
				);
			})}
			{/* Warp Streaks */}
			{new Array(24).fill(0).map((_, i) => {
				const a = (i / 24) * Math.PI * 2;
				const len = 40 + random(`l${i}`) * 90;
				const r = 200 + ((f * 5 + i * 40) % 600);
				const x = 960 + Math.cos(a) * r;
				const y = 540 + Math.sin(a) * r * 0.6;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x,
							top: y,
							width: len,
							height: 2,
							background: 'linear-gradient(90deg, rgba(163,230,53,0.6), transparent)',
							transform: `rotate(${a}rad)`,
							transformOrigin: '0% 0%',
							opacity: 0.45,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

/** Scene 6 Background: Radiant Gold & Amber Luxury Halo */
const BgScene6: React.FC = () => {
	const f = useCurrentFrame();
	const pulse = 0.5 + 0.5 * Math.sin(f / 10);

	return (
		<AbsoluteFill style={{backgroundColor: '#140E02', overflow: 'hidden'}}>
			{/* Radiant Golden Center Sun */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					width: 800,
					height: 800,
					marginLeft: -400,
					marginTop: -400,
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(245, 158, 11, 0.32) 0%, rgba(234, 179, 8, 0.10) 45%, transparent 70%)',
					transform: `scale(${1 + pulse * 0.12})`,
					filter: 'blur(50px)',
				}}
			/>
			{/* Floating Golden Currency Dust / Sparks */}
			{new Array(40).fill(0).map((_, i) => {
				const speed = 0.8 + random(`gs${i}`) * 1.4;
				const y = 1100 - ((f * speed * 25 + i * 60) % 1200);
				const x = (random(`gx${i}`) * 1920 + Math.sin(f / 20 + i) * 35) % 1920;
				const sz = 3 + random(`gz${i}`) * 5;
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
							backgroundColor: '#FDE047',
							boxShadow: `0 0 14px #FACC15`,
							opacity: 0.5 + 0.5 * Math.sin(f / 8 + i),
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

/** Scene 7 Background: Studio Overhead Spotlight & Lime Aurora Horizon */
const BgScene7: React.FC = () => {
	const f = useCurrentFrame();
	const sweep = Math.sin(f / 35) * 80;

	return (
		<AbsoluteFill style={{backgroundColor: '#08080C', overflow: 'hidden'}}>
			{/* Overhead Conical Spotlight on Presenter */}
			<div
				style={{
					position: 'absolute',
					top: -100,
					left: '50%',
					marginLeft: -350 + sweep,
					width: 700,
					height: 1100,
					background: 'radial-gradient(ellipse at 50% 0%, rgba(163, 230, 53, 0.22) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 75%)',
					filter: 'blur(30px)',
				}}
			/>
			{/* Bottom Neon Laser Horizon Line */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 3,
					background: `linear-gradient(90deg, transparent 5%, ${C.lime} 50%, transparent 95%)`,
					boxShadow: `0 -5px 25px ${C.lime}`,
				}}
			/>
		</AbsoluteFill>
	);
};

// =========================================================================
// MAIN VIDEO COMPOSITION (7 Scenes, Dynamic Backgrounds & Full Sound Design)
// =========================================================================
export const RiadDeveloperIntro: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Repo and language counters for Scene 3
	const repoCount = Math.floor(interpolate(f, [420 + 20, 420 + 80], [0, 41], clamp));
	const langCount = Math.floor(interpolate(f, [420 + 25, 420 + 85], [0, 10], clamp));

	return (
		<AbsoluteFill
			style={{
				backgroundColor: C.bg,
				fontFamily: FONT,
				color: C.text,
				overflow: 'hidden',
			}}
		>
			{/* ================================================================= */}
			{/* 1. MASTER SOUNDTRACK (Upbeat 120 BPM Electronic Beat) */}
			{/* ================================================================= */}
			<Audio src={staticFile('sfx/beat.wav')} volume={0.36} />

			{/* ================================================================= */}
			{/* 2. TOP TIMELINE PROGRESS BAR */}
			{/* ================================================================= */}
			<EditorProgressBar position="top" height={6} color={C.lime} />

			{/* ================================================================= */}
			{/* SCENE 1 — THE REVEAL (0–6s | frames 0 to 180) */}
			{/* ================================================================= */}
			<Sequence from={0} durationInFrames={180}>
				<BgScene1 />
				{/* Scene 1 Tailored SFX */}
				<Audio src={staticFile('sfx/riser-tension.wav')} volume={0.45} />
				<Sequence from={14}>
					{/* Camera shutter snapshot + fast whoosh on photo reveal */}
					<Audio src={staticFile('sfx/shutter.wav')} volume={0.8} />
					<Audio src={staticFile('sfx/whoosh-fast.wav')} volume={0.5} />
				</Sequence>
				<Sequence from={32}>
					{/* Heavy cinematic 808 sub impact when name slams */}
					<Audio src={staticFile('sfx/impact-heavy.wav')} volume={0.85} />
				</Sequence>

				<Scene fadeIn={false}>
					<AbsoluteFill
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 22,
						}}
					>
						<div
							style={{
								transform: `scale(${spr(f, fps, 8, POP)})`,
								opacity: Math.min(1, spr(f, fps, 8, POP) * 1.5),
								padding: '8px 24px',
								borderRadius: 999,
								background: 'rgba(163, 230, 53, 0.12)',
								border: '1px solid rgba(163, 230, 53, 0.35)',
								color: C.lime,
								fontSize: 16,
								fontWeight: 800,
								letterSpacing: 3,
								textTransform: 'uppercase',
								boxShadow: '0 0 20px rgba(163, 230, 53, 0.25)',
							}}
						>
							Developer Spotlight
						</div>

						<Photo size={240} delay={14} src="photo.jpg" initials="RD" />

						<Kinetic
							text="RIAD DEVELOPER"
							delay={32}
							stagger={2}
							style={{
								fontSize: 86,
								fontWeight: 900,
								letterSpacing: 2,
								...gradientText(C.lime, C.violetSoft),
							}}
						/>

						<Rise delay={54} dist={35}>
							<div
								style={{
									fontSize: 28,
									fontWeight: 600,
									color: C.dim,
									letterSpacing: 0.5,
									textAlign: 'center',
									padding: '0 40px',
								}}
							>
								Full Stack Developer <span style={{color: C.lime}}>•</span> MIT App Inventor Extension Developer
							</div>
						</Rise>
					</AbsoluteFill>
				</Scene>
			</Sequence>

			{/* ================================================================= */}
			{/* SCENE 2 — WHO I AM (6–14s | frames 180 to 420) */}
			{/* ================================================================= */}
			<Sequence from={180} durationInFrames={240}>
				<BgScene2 />
				{/* Scene 2 Tailored SFX */}
				<Sequence from={20}>
					<Audio src={staticFile('sfx/pop-clean.wav')} volume={0.65} />
					<Audio src={staticFile('sfx/click-digital.wav')} volume={0.4} />
				</Sequence>
				<Sequence from={46}>
					<Audio src={staticFile('sfx/pop-clean.wav')} volume={0.65} />
					<Audio src={staticFile('sfx/click-digital.wav')} volume={0.4} />
				</Sequence>
				<Sequence from={72}>
					<Audio src={staticFile('sfx/pop-warm.wav')} volume={0.7} />
					<Audio src={staticFile('sfx/click-digital.wav')} volume={0.4} />
				</Sequence>

				<Scene>
					<AbsoluteFill
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '0 140px',
							gap: 36,
						}}
					>
						<div style={{display: 'flex', alignItems: 'center', gap: 24}}>
							<Photo size={74} delay={5} src="photo.jpg" initials="RD" />
							<div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
								<div
									style={{
										fontSize: 16,
										fontWeight: 800,
										color: C.lime,
										letterSpacing: 3,
										textTransform: 'uppercase',
									}}
								>
									Core Competencies
								</div>
								<div style={{fontSize: 48, fontWeight: 900, color: '#FFFFFF', letterSpacing: -0.5}}>
									Who I Am & What I Build
								</div>
							</div>
						</div>

						<div style={{display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 1200}}>
							{[
								{
									title: 'Professional Web Developer',
									desc: 'Crafting ultra-fast, responsive web applications with modern architecture',
									icon: <Line size={32} color={C.lime}>{icons.globe}</Line>,
									tag: 'Full Web Lifecycle',
								},
								{
									title: 'Full Stack Developer',
									desc: 'Bridging high-scale backend engines, APIs, and fluid front-end interfaces',
									icon: <Line size={32} color={C.violetSoft}>{icons.layers}</Line>,
									tag: 'System Architecture',
								},
								{
									title: 'MIT App Inventor Extension Developer & Community Contributor',
									desc: 'Building native Android extensions empowering thousands of creators worldwide',
									icon: <Line size={32} color={C.lime}>{icons.blocks}</Line>,
									tag: 'Mobile & Tooling',
								},
							].map((item, idx) => {
								const relF = f - 180;
								const delay = 20 + idx * 26;
								const p = spr(relF, fps, delay, POP);
								return (
									<div
										key={idx}
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											padding: '24px 36px',
											borderRadius: 24,
											background: 'rgba(255, 255, 255, 0.04)',
											border: '1px solid rgba(255, 255, 255, 0.10)',
											backdropFilter: 'blur(16px)',
											boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
											transform: `translateX(${(1 - p) * 120}px) scale(${0.9 + p * 0.1})`,
											opacity: Math.min(1, p * 1.5),
										}}
									>
										<div style={{display: 'flex', alignItems: 'center', gap: 28}}>
											<Tile size={64} glow={idx % 2 === 0 ? 'rgba(163,230,53,0.3)' : 'rgba(167,139,250,0.3)'}>
												{item.icon}
											</Tile>
											<div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
												<div style={{fontSize: 28, fontWeight: 800, color: '#FFFFFF'}}>
													{item.title}
												</div>
												<div style={{fontSize: 18, color: C.dim, fontWeight: 500}}>
													{item.desc}
												</div>
											</div>
										</div>
										<div
											style={{
												padding: '6px 18px',
												borderRadius: 999,
												background: 'rgba(255,255,255,0.06)',
												border: '1px solid rgba(255,255,255,0.12)',
												fontSize: 14,
												fontWeight: 700,
												color: idx % 2 === 0 ? C.lime : C.violetSoft,
												letterSpacing: 1,
											}}
										>
											{item.tag}
										</div>
									</div>
								);
							})}
						</div>
					</AbsoluteFill>
				</Scene>
			</Sequence>

			{/* ================================================================= */}
			{/* SCENE 3 — GITHUB (14–22s | frames 420 to 660) */}
			{/* ================================================================= */}
			<Sequence from={420} durationInFrames={240}>
				<BgScene3 />
				{/* Scene 3 Tailored SFX */}
				<Sequence from={10}>
					<Audio src={staticFile('sfx/whoosh-fast.wav')} volume={0.6} />
				</Sequence>
				<Sequence from={35}>
					<Audio src={staticFile('sfx/click-digital.wav')} volume={0.5} />
				</Sequence>
				<Sequence from={60}>
					<Audio src={staticFile('sfx/pop-clean.wav')} volume={0.6} />
				</Sequence>
				<Sequence from={100}>
					<Audio src={staticFile('sfx/chime-sparkle.wav')} volume={0.85} />
				</Sequence>

				<Scene>
					<AbsoluteFill
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 36,
							padding: '0 100px',
						}}
					>
						<div style={{display: 'flex', alignItems: 'center', gap: 24}}>
							<Tile size={84} glow="rgba(255,255,255,0.3)">
								<Brand icon={siGithub} size={50} color="#FFFFFF" />
							</Tile>
							<div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
								<div style={{fontSize: 62, fontWeight: 900, color: '#FFFFFF', letterSpacing: -1}}>
									@RiadDeveloper
								</div>
								<div style={{fontSize: 22, color: C.dim, fontWeight: 500}}>
									Open Source Contributions & Development Velocity
								</div>
							</div>
						</div>

						<div style={{display: 'flex', gap: 32, width: '100%', maxWidth: 1000}}>
							<div
								style={{
									flex: 1,
									padding: '36px 40px',
									borderRadius: 28,
									background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
									border: '1px solid rgba(163, 230, 53, 0.25)',
									boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(163,230,53,0.15)',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 10,
								}}
							>
								<div style={{fontSize: 88, fontWeight: 900, ...gradientText(C.lime, '#84CC16')}}>
									{repoCount}+
								</div>
								<div style={{fontSize: 24, fontWeight: 700, color: '#FFFFFF'}}>
									Repositories Built
								</div>
								<div style={{fontSize: 16, color: C.dim}}>Public & private open-source tools</div>
							</div>

							<div
								style={{
									flex: 1,
									padding: '36px 40px',
									borderRadius: 28,
									background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
									border: '1px solid rgba(167, 139, 250, 0.25)',
									boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.18)',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 10,
								}}
							>
								<div style={{fontSize: 88, fontWeight: 900, ...gradientText(C.violetSoft, C.violet)}}>
									{langCount}
								</div>
								<div style={{fontSize: 24, fontWeight: 700, color: '#FFFFFF'}}>
									Programming Languages
								</div>
								<div style={{fontSize: 16, color: C.dim}}>Multi-paradigm polyglot stack</div>
							</div>
						</div>

						<div style={{display: 'flex', alignItems: 'center', gap: 20}}>
							{[
								{name: 'Pull Shark', icon: '🦈', glow: C.lime},
								{name: 'Quickdraw', icon: '⚡', glow: '#F59E0B'},
								{name: 'YOLO', icon: '🚀', glow: '#EC4899'},
							].map((b, i) => {
								const relF = f - 420;
								const bp = spr(relF, fps, 55 + i * 14, POP);
								return (
									<div
										key={i}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 10,
											padding: '12px 24px',
											borderRadius: 999,
											background: 'rgba(255,255,255,0.05)',
											border: `1px solid ${b.glow}66`,
											boxShadow: `0 0 20px ${b.glow}33`,
											transform: `scale(${bp})`,
											opacity: Math.min(1, bp * 1.5),
										}}
									>
										<span style={{fontSize: 22}}>{b.icon}</span>
										<span style={{fontSize: 18, fontWeight: 800, color: '#FFFFFF'}}>{b.name}</span>
									</div>
								);
							})}

							{(() => {
								const relF = f - 420;
								const gp = spr(relF, fps, 100, POP);
								return (
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 12,
											padding: '14px 28px',
											borderRadius: 999,
											background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1))',
											border: '1.5px solid rgba(245, 158, 11, 0.6)',
											boxShadow: '0 0 35px rgba(245, 158, 11, 0.35)',
											transform: `scale(${gp})`,
											opacity: Math.min(1, gp * 1.5),
										}}
									>
										<span style={{fontSize: 22, color: '#F59E0B'}}>★</span>
										<span style={{fontSize: 18, fontWeight: 800, color: '#FCD34D', letterSpacing: 0.5}}>
											GitHub Developer Program Member
										</span>
									</div>
								);
							})()}
						</div>
					</AbsoluteFill>
				</Scene>
			</Sequence>

			{/* ================================================================= */}
			{/* SCENE 4 — MY PROJECTS (22–38s | frames 660 to 1140) */}
			{/* ================================================================= */}
			<Sequence from={660} durationInFrames={480}>
				<BgScene4 />
				{/* Scene 4 Tailored SFX */}
				<Sequence from={15}>
					<Audio src={staticFile('sfx/pop-clean.wav')} volume={0.6} />
				</Sequence>
				<Sequence from={43}>
					<Audio src={staticFile('sfx/pop-clean.wav')} volume={0.6} />
				</Sequence>
				<Sequence from={71}>
					<Audio src={staticFile('sfx/pop-clean.wav')} volume={0.6} />
				</Sequence>
				<Sequence from={99}>
					<Audio src={staticFile('sfx/pop-clean.wav')} volume={0.6} />
				</Sequence>
				<Sequence from={140}>
					{/* Gaming diamond platform reveal: coin ding + whoosh */}
					<Audio src={staticFile('sfx/coin-ding.wav')} volume={0.8} />
					<Audio src={staticFile('sfx/whoosh-fast.wav')} volume={0.5} />
				</Sequence>

				<Scene>
					<AbsoluteFill
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '0 100px',
							gap: 30,
						}}
					>
						<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
							<div
								style={{
									fontSize: 16,
									fontWeight: 800,
									color: C.lime,
									letterSpacing: 3,
									textTransform: 'uppercase',
								}}
							>
								Portfolio Highlights
							</div>
							<div style={{fontSize: 54, fontWeight: 900, color: '#FFFFFF', letterSpacing: -1}}>
								Featured Projects & Products
							</div>
						</div>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(2, 1fr)',
								gap: 24,
								width: '100%',
								maxWidth: 1240,
							}}
						>
							{[
								{
									title: 'PyRunner',
									desc: 'Run & edit any Python project on your Android phone',
									stack: 'Flutter • Python 3.13',
									icon: <Brand icon={siPython} size={36} color="#38BDF8" />,
									glow: '#38BDF8',
								},
								{
									title: 'FollowBoost',
									desc: 'My own Instagram growth & rewards app ecosystem',
									stack: 'Mobile Growth Engine',
									icon: <Line size={36} color="#EC4899">{icons.diamond}</Line>,
									glow: '#EC4899',
								},
								{
									title: 'Valid-Email-Checker',
									desc: 'Fast email validation & verification tool with MX checking',
									stack: 'High Speed CLI / API',
									icon: <Line size={36} color={C.lime}>{icons.mail}</Line>,
									glow: C.lime,
								},
								{
									title: 'Aixfy',
									desc: 'Go CLI toolchain for building App Inventor extensions',
									stack: 'Go Toolchain • Compiler',
									icon: <Brand icon={siGo} size={36} color="#22D3EE" />,
									glow: '#22D3EE',
								},
							].map((p, i) => {
								const relF = f - 660;
								const delay = 15 + i * 28;
								const s = spr(relF, fps, delay, POP);
								return (
									<div
										key={i}
										style={{
											padding: '24px 30px',
											borderRadius: 24,
											background: 'rgba(255, 255, 255, 0.04)',
											border: `1px solid rgba(255, 255, 255, 0.12)`,
											backdropFilter: 'blur(16px)',
											boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${p.glow}18`,
											display: 'flex',
											alignItems: 'center',
											gap: 22,
											transform: `scale(${s})`,
											opacity: Math.min(1, s * 1.5),
										}}
									>
										<Tile size={64} glow={`${p.glow}33`}>
											{p.icon}
										</Tile>
										<div style={{display: 'flex', flexDirection: 'column', gap: 6, flex: 1}}>
											<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
												<div style={{fontSize: 28, fontWeight: 800, color: '#FFFFFF'}}>
													{p.title}
												</div>
												<span
													style={{
														fontSize: 13,
														fontWeight: 700,
														color: p.glow,
														padding: '4px 12px',
														borderRadius: 999,
														background: `${p.glow}18`,
														border: `1px solid ${p.glow}44`,
													}}
												>
													{p.stack}
												</span>
											</div>
											<div style={{fontSize: 18, color: C.dim, fontWeight: 500, lineHeight: 1.3}}>
												{p.desc}
											</div>
										</div>
									</div>
								);
							})}
						</div>

						{(() => {
							const relF = f - 660;
							const dreamTopupSpring = spr(relF, fps, 140, POP);
							return (
								<div
									style={{
										width: '100%',
										maxWidth: 1240,
										padding: '20px 36px',
										borderRadius: 22,
										background: 'linear-gradient(90deg, rgba(163,230,53,0.15) 0%, rgba(124,58,237,0.15) 100%)',
										border: '1.5px solid rgba(163, 230, 53, 0.4)',
										boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(163,230,53,0.2)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										transform: `translateY(${(1 - dreamTopupSpring) * 60}px)`,
										opacity: Math.min(1, dreamTopupSpring * 1.5),
									}}
								>
									<div style={{display: 'flex', alignItems: 'center', gap: 20}}>
										<span style={{fontSize: 34}}>💎</span>
										<div style={{display: 'flex', flexDirection: 'column', gap: 3}}>
											<div style={{fontSize: 26, fontWeight: 900, color: '#FFFFFF'}}>
												dreamtopup.com
											</div>
											<div style={{fontSize: 17, color: C.dim}}>
												My own Free Fire diamond top-up platform serving gamers at scale
											</div>
										</div>
									</div>
									<div
										style={{
											padding: '8px 22px',
											borderRadius: 999,
											backgroundColor: C.lime,
											color: '#000000',
											fontWeight: 900,
											fontSize: 16,
											letterSpacing: 1,
										}}
									>
										LIVE PLATFORM
									</div>
								</div>
							);
						})()}
					</AbsoluteFill>
				</Scene>
			</Sequence>

			{/* ================================================================= */}
			{/* SCENE 5 — TECH STACK (38–46s | frames 1140 to 1380) */}
			{/* ================================================================= */}
			<Sequence from={1140} durationInFrames={240}>
				<BgScene5 />
				{/* Scene 5 Tailored SFX */}
				<Audio src={staticFile('sfx/laser-swoosh.wav')} volume={0.65} />
				<Sequence from={35}>
					<Audio src={staticFile('sfx/whoosh-fast.wav')} volume={0.4} />
				</Sequence>

				<Scene>
					<AbsoluteFill
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								zIndex: 10,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								textAlign: 'center',
								gap: 14,
								maxWidth: 850,
							}}
						>
							<div
								style={{
									fontSize: 16,
									fontWeight: 800,
									color: C.lime,
									letterSpacing: 3,
									textTransform: 'uppercase',
								}}
							>
								Full Stack Fluency
							</div>
							<div
								style={{
									fontSize: 64,
									fontWeight: 900,
									letterSpacing: -1,
									color: '#FFFFFF',
									lineHeight: 1.15,
								}}
							>
								Fluent across <span style={{...gradientText(C.lime, C.violetSoft)}}>mobile, web & backend</span>
							</div>
							<div style={{fontSize: 22, color: C.dim, fontWeight: 500}}>
								End-to-End Product Engineering from Core to Cloud
							</div>
						</div>

						{[
							{name: 'Flutter', icon: siFlutter, color: '#54C5F8'},
							{name: 'Dart', icon: siDart, color: '#0175C2'},
							{name: 'Python', icon: siPython, color: '#38BDF8'},
							{name: 'TypeScript', icon: siTypescript, color: '#3178C6'},
							{name: 'JavaScript', icon: siJavascript, color: '#F7DF1E'},
							{name: 'Java', icon: siOpenjdk, color: '#ED8B00'},
							{name: 'Go', icon: siGo, color: '#00ADD8'},
							{name: 'Node.js', icon: siNodedotjs, color: '#68A063'},
						].map((tech, i) => {
							const relF = f - 1140;
							const angle = (i / 8) * Math.PI * 2 + relF * 0.018;
							const x = Math.cos(angle) * 420 * 1.5;
							const y = Math.sin(angle) * 420 * 0.72;
							const pulse = 0.5 + 0.5 * Math.sin(relF / 15 + i);

							return (
								<div
									key={i}
									style={{
										position: 'absolute',
										left: '50%',
										top: '50%',
										transform: `translate3d(${x - 48}px, ${y - 48}px, 0px)`,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 8,
									}}
								>
									<div
										style={{
											width: 96,
											height: 96,
											borderRadius: 24,
											background: 'rgba(255, 255, 255, 0.05)',
											border: `1.5px solid ${tech.color}66`,
											boxShadow: `0 15px 40px rgba(0,0,0,0.6), 0 0 ${20 + pulse * 15}px ${tech.color}44`,
											backdropFilter: 'blur(16px)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<Brand icon={tech.icon} size={48} color={tech.color} />
									</div>
									<span
										style={{
											fontSize: 16,
											fontWeight: 700,
											color: '#FFFFFF',
											background: 'rgba(11, 11, 15, 0.85)',
											padding: '3px 12px',
											borderRadius: 999,
											border: '1px solid rgba(255,255,255,0.1)',
										}}
									>
										{tech.name}
									</span>
								</div>
							);
						})}
					</AbsoluteFill>
				</Scene>
			</Sequence>

			{/* ================================================================= */}
			{/* SCENE 6 — THE NUMBERS (46–52s | frames 1380 to 1560) */}
			{/* ================================================================= */}
			<Sequence from={1380} durationInFrames={180}>
				<BgScene6 />
				{/* Scene 6 Tailored SFX: Financial milestone with coin ding & 808 sub bass drop */}
				<Sequence from={10}>
					<Audio src={staticFile('sfx/coin-ding.wav')} volume={0.8} />
					<Audio src={staticFile('sfx/impact-heavy.wav')} volume={0.95} />
					<Audio src={staticFile('sfx/bass-drop.wav')} volume={0.6} />
				</Sequence>
				<Sequence from={35}>
					<Audio src={staticFile('sfx/chime-sparkle.wav')} volume={0.7} />
				</Sequence>

				<Scene>
					<AbsoluteFill
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 28,
							textAlign: 'center',
						}}
					>
						<Rise delay={5} dist={25}>
							<div
								style={{
									padding: '8px 24px',
									borderRadius: 999,
									background: 'rgba(245, 158, 11, 0.15)',
									border: '1px solid rgba(245, 158, 11, 0.45)',
									color: '#F59E0B',
									fontSize: 16,
									fontWeight: 800,
									letterSpacing: 3,
									textTransform: 'uppercase',
								}}
							>
								Financial Milestone
							</div>
						</Rise>

						{(() => {
							const relF = f - 1380;
							const countSpring = spr(relF, fps, 10, POP);
							return (
								<div
									style={{
										transform: `scale(${countSpring})`,
										opacity: Math.min(1, countSpring * 1.5),
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 12,
									}}
								>
									<div
										style={{
											fontSize: 110,
											fontWeight: 900,
											letterSpacing: -2,
											...gradientText(C.lime, '#FACC15'),
											textShadow: '0 0 60px rgba(163, 230, 53, 0.45)',
										}}
									>
										3 Crore+ BDT
									</div>
									<div style={{fontSize: 42, fontWeight: 800, color: '#FFFFFF', letterSpacing: 0.5}}>
										Net Worth — Self-Made
									</div>
								</div>
							);
						})()}

						<Rise delay={35} dist={30}>
							<div
								style={{
									padding: '16px 44px',
									borderRadius: 999,
									background: 'rgba(255, 255, 255, 0.05)',
									border: '1px solid rgba(255, 255, 255, 0.14)',
									backdropFilter: 'blur(16px)',
									fontSize: 26,
									fontWeight: 600,
									color: C.dim,
									letterSpacing: 1,
								}}
							>
								Built from scratch. No shortcuts.
							</div>
						</Rise>
					</AbsoluteFill>
				</Scene>
			</Sequence>

			{/* ================================================================= */}
			{/* SCENE 7 — CLOSING / CONTACT (52–60s | frames 1560 to 1800) */}
			{/* ================================================================= */}
			<Sequence from={1560} durationInFrames={240}>
				<BgScene7 />
				{/* Scene 7 Tailored SFX */}
				<Audio src={staticFile('sfx/whoosh-fast.wav')} volume={0.6} />
				<Audio src={staticFile('sfx/shutter.wav')} volume={0.65} />
				<Sequence from={20}>
					<Audio src={staticFile('sfx/click-digital.wav')} volume={0.5} />
				</Sequence>
				<Sequence from={36}>
					<Audio src={staticFile('sfx/click-digital.wav')} volume={0.5} />
				</Sequence>
				<Sequence from={52}>
					<Audio src={staticFile('sfx/click-digital.wav')} volume={0.5} />
				</Sequence>
				<Sequence from={70}>
					<Audio src={staticFile('sfx/impact-punch.wav')} volume={0.7} />
				</Sequence>
				<Sequence from={120}>
					<Audio src={staticFile('sfx/impact-heavy.wav')} volume={0.85} />
				</Sequence>

				<Scene fadeOut={false}>
					<AbsoluteFill
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 24,
						}}
					>
						{(() => {
							const relF = f - 1560;
							const isOutro = relF >= 120;
							const outroProgress = spr(relF, fps, 120, POP);

							if (isOutro) {
								return (
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											gap: 20,
											transform: `scale(${outroProgress})`,
											opacity: Math.min(1, outroProgress * 1.5),
										}}
									>
										<Photo size={200} delay={120} src="photo.jpg" initials="RD" />
										<div
											style={{
												fontSize: 78,
												fontWeight: 900,
												letterSpacing: 2,
												...gradientText(C.lime, C.violetSoft),
												textShadow: '0 0 60px rgba(163, 230, 53, 0.5)',
											}}
										>
											RIAD DEVELOPER
										</div>
										<div
											style={{
												fontSize: 24,
												fontWeight: 700,
												color: C.dim,
												letterSpacing: 3,
												textTransform: 'uppercase',
											}}
										>
											riaddeveloper.is-a-good.dev
										</div>
									</div>
								);
							}

							return (
								<>
									<Photo size={160} delay={6} src="photo.jpg" initials="RD" />

									<div style={{fontSize: 54, fontWeight: 900, color: '#FFFFFF', letterSpacing: -0.5}}>
										Riad Developer
									</div>

									<div style={{display: 'flex', gap: 24, marginTop: 10}}>
										{[
											{label: 'github.com/RiadDeveloper', icon: <Brand icon={siGithub} size={28} color="#FFFFFF" />},
											{label: 'riaddeveloper.is-a-good.dev', icon: <Line size={28} color={C.lime}>{icons.globe}</Line>},
											{label: 'riaddeveloperr@gmail.com', icon: <Line size={28} color={C.violetSoft}>{icons.mail}</Line>},
										].map((c, i) => {
											const cp = spr(relF, fps, 20 + i * 16, POP);
											return (
												<div
													key={i}
													style={{
														display: 'flex',
														alignItems: 'center',
														gap: 14,
														padding: '14px 26px',
														borderRadius: 999,
														background: 'rgba(255, 255, 255, 0.05)',
														border: '1px solid rgba(255, 255, 255, 0.12)',
														transform: `translateY(${(1 - cp) * 40}px)`,
														opacity: Math.min(1, cp * 1.5),
													}}
												>
													{c.icon}
													<span style={{fontSize: 20, fontWeight: 700, color: '#FFFFFF'}}>
														{c.label}
													</span>
												</div>
											);
										})}
									</div>

									<Rise delay={70} dist={25}>
										<div
											style={{
												fontSize: 34,
												fontWeight: 900,
												letterSpacing: 2,
												...gradientText(C.lime, C.violetSoft),
												marginTop: 18,
											}}
										>
											"I build. I ship. I keep building."
										</div>
									</Rise>
								</>
							);
						})()}
					</AbsoluteFill>
				</Scene>
			</Sequence>
		</AbsoluteFill>
	);
};

export default RiadDeveloperIntro;
