import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { loadFont as loadOutfit } from '@remotion/google-fonts/Outfit';
import { loadFont as loadPlusJakartaSans } from '@remotion/google-fonts/PlusJakartaSans';
import { C, clamp, gradientText, POP, spr } from './ui';

export const { fontFamily: FONT_OUTFIT } = loadOutfit('normal', {
	weights: ['400', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export const { fontFamily: FONT_PLUS_JAKARTA } = loadPlusJakartaSans('normal', {
	weights: ['400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

// =========================================================================
// 1. SPOTIFY 3D TILTED LYRICS CARD
// =========================================================================
export interface LyricWord {
	text: string;
	startFrame: number;
	endFrame: number;
}

export interface LyricLine {
	startFrame: number;
	endFrame: number;
	text: string;
	translation?: string; // Optional meaning/translation
	words?: LyricWord[]; // Frame-accurate word-level timestamps
}

export const SpotifyLyricCard: React.FC<{
	lines: LyricLine[];
	trackTitle: string;
	artistName: string;
	channelName?: string;
	verified?: boolean;
	coverImage?: string;
	accentColor?: string;
	cardTiltX?: number;
	cardTiltY?: number;
	width?: number;
	height?: number;
}> = ({
	lines,
	trackTitle,
	artistName,
	channelName = 'Musical Riad',
	verified = true,
	coverImage,
	accentColor = '#1ED760', // Spotify green
	cardTiltX = 7,
	cardTiltY = -10,
	width = 860,
	height = 940,
}) => {
	const f = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Find active line index: the latest line whose startFrame <= f
	let activeIndex = 0;
	for (let i = 0; i < lines.length; i++) {
		if (f >= lines[i].startFrame) {
			activeIndex = i;
		} else {
			break;
		}
	}
	const activeLine = lines[activeIndex] || lines[0];

	// Smooth scroll transition: in the 12 frames leading up to the NEXT line, smoothly advance position
	let smoothActiveIndex = activeIndex;
	if (activeIndex < lines.length - 1) {
		const nextStart = lines[activeIndex + 1].startFrame;
		if (f >= nextStart - 12) {
			const progress = interpolate(f, [nextStart - 12, nextStart], [0, 1], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
			});
			smoothActiveIndex = activeIndex + progress;
		}
	}

	// Gentle ambient float
	const floatX = Math.sin(f / 35) * 8;
	const floatY = Math.cos(f / 40) * 10;
	const rotX = cardTiltX + Math.sin(f / 45) * 2.5;
	const rotY = cardTiltY + Math.cos(f / 50) * 2.5;

	const formatTime = (secs: number) => {
		const m = Math.floor(secs / 60);
		const s = Math.floor(secs % 60);
		return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
	};

	const currentSec = Math.floor(f / fps);
	const totalSec = Math.floor(durationInFrames / fps);
	const progressPercent = Math.min(100, Math.max(0, (f / durationInFrames) * 100));

	return (
		<div
			style={{
				perspective: 1400,
				transformStyle: 'preserve-3d',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					width,
					height,
					borderRadius: 40,
					background: 'linear-gradient(160deg, rgba(26, 28, 38, 0.88) 0%, rgba(12, 13, 20, 0.95) 100%)',
					border: '1.5px solid rgba(255, 255, 255, 0.16)',
					boxShadow: `0 45px 120px rgba(0,0,0,0.90), 0 0 70px ${accentColor}26, inset 0 1px 1px rgba(255,255,255,0.25)`,
					backdropFilter: 'blur(36px) saturate(180%)',
					WebkitBackdropFilter: 'blur(36px) saturate(180%)',
					transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${floatX}px, ${floatY}px, 0px)`,
					display: 'flex',
					flexDirection: 'column',
					padding: '38px 46px',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Top Track Header */}
				<div style={{display: 'flex', alignItems: 'center', gap: 22, marginBottom: 20}}>
					{coverImage ? (
						<div
							style={{
								width: 96,
								height: 96,
								borderRadius: 20,
								overflow: 'hidden',
								boxShadow: `0 12px 30px rgba(0,0,0,0.65), 0 0 25px ${accentColor}33`,
								border: '1.5px solid rgba(255,255,255,0.22)',
								flexShrink: 0,
								position: 'relative',
							}}
						>
							<Img
								src={coverImage.startsWith('http') ? coverImage : staticFile(coverImage)}
								style={{width: '100%', height: '100%', objectFit: 'cover'}}
							/>
							{/* Gloss sheen overlay */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									height: '45%',
									background: 'linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)',
									pointerEvents: 'none',
								}}
							/>
						</div>
					) : (
						<div
							style={{
								width: 96,
								height: 96,
								borderRadius: 20,
								background: `linear-gradient(135deg, ${accentColor}, #7C3AED)`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 40,
								fontWeight: 900,
								color: '#000',
								flexShrink: 0,
								boxShadow: `0 12px 30px rgba(0,0,0,0.65), 0 0 25px ${accentColor}33`,
							}}
						>
							♫
						</div>
					)}
					<div style={{display: 'flex', flexDirection: 'column', gap: 5, flex: 1}}>
						{/* Channel Badge Pill */}
						<div style={{display: 'flex', alignItems: 'center', gap: 8}}>
							<span
								style={{
									fontFamily: FONT_OUTFIT,
									fontSize: 12,
									fontWeight: 800,
									letterSpacing: 1.5,
									textTransform: 'uppercase',
									color: '#EF4444',
									background: 'rgba(239, 68, 68, 0.14)',
									border: '1px solid rgba(239, 68, 68, 0.35)',
									padding: '2px 10px',
									borderRadius: 999,
									display: 'inline-flex',
									alignItems: 'center',
									gap: 6,
								}}
							>
								<span style={{fontSize: 9}}>▶</span>
								{channelName}
							</span>
							{verified && (
								<span
									style={{
										fontFamily: FONT_PLUS_JAKARTA,
										fontSize: 11,
										fontWeight: 700,
										color: accentColor,
										background: `${accentColor}18`,
										border: `1px solid ${accentColor}40`,
										padding: '2px 8px',
										borderRadius: 999,
										letterSpacing: 0.5,
									}}
								>
									✓ VERIFIED
								</span>
							)}
						</div>
						<div
							style={{
								fontFamily: FONT_OUTFIT,
								fontSize: 34,
								fontWeight: 900,
								color: '#FFFFFF',
								letterSpacing: -0.5,
								lineHeight: 1.15,
							}}
						>
							{trackTitle}
						</div>
						<div
							style={{
								fontFamily: FONT_PLUS_JAKARTA,
								fontSize: 18,
								fontWeight: 600,
								color: '#A1A1AA',
								display: 'flex',
								alignItems: 'center',
								gap: 8,
							}}
						>
							<span>{artistName}</span>
							<span style={{fontSize: 14, opacity: 0.5}}>•</span>
							<span style={{color: '#E4E4E7'}}>{channelName}</span>
						</div>
					</div>
					{/* Top Right Mini Equalizer Visualizer & Lyrics Pill */}
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8}}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								padding: '7px 16px',
								borderRadius: 999,
								background: 'rgba(255,255,255,0.07)',
								border: '1px solid rgba(255,255,255,0.12)',
								fontFamily: FONT_PLUS_JAKARTA,
								fontSize: 14,
								fontWeight: 700,
								color: accentColor,
								boxShadow: `0 0 20px ${accentColor}1a`,
							}}
						>
							{/* Mini jumping equalizer bars */}
							<div style={{display: 'flex', alignItems: 'flex-end', gap: 3, height: 14}}>
								{[0.9, 1.5, 0.7, 1.2].map((speed, bIdx) => {
									const barH = 4 + Math.abs(Math.sin((f * speed) / 4 + bIdx)) * 10;
									return (
										<div
											key={bIdx}
											style={{
												width: 3,
												height: barH,
												borderRadius: 2,
												backgroundColor: accentColor,
											}}
										/>
									);
								})}
							</div>
							<span>Lyrics</span>
						</div>
					</div>
				</div>

				{/* Scrolling Lyrics Stream - Relative Centered Window (NEVER drifts or clips) */}
				<div
					style={{
						flex: 1,
						position: 'relative',
						overflow: 'hidden',
						maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
						WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
					}}
				>
					{lines.map((line, idx) => {
						const rel = idx - smoothActiveIndex;
						// Only render lines in visible range (-3 to +4)
						if (Math.abs(rel) > 4) return null;

						const isCurrent = idx === activeIndex;
						const isPast = idx < activeIndex;

						// Dynamic spring scale for active line entrance
						const lineProgress = isCurrent ? spr(f, fps, line.startFrame, POP) : 1;
						// Centered around 210px inside the container
						const topPos = 210 + rel * 105;

						return (
							<div
								key={idx}
								style={{
									position: 'absolute',
									top: topPos,
									left: 0,
									right: 0,
									display: 'flex',
									flexDirection: 'column',
									gap: 6,
									opacity: isCurrent ? 1 : isPast ? 0.38 : 0.18,
									transform: isCurrent
										? `scale(${0.96 + lineProgress * 0.08}) translateX(12px)`
										: 'scale(1) translateX(0px)',
									fontFamily: FONT_PLUS_JAKARTA,
								}}
							>
								<div
									style={{
										fontSize: isCurrent ? 42 : 32,
										fontWeight: isCurrent ? 800 : 700,
										letterSpacing: -0.5,
										display: 'flex',
										flexWrap: 'wrap',
										gap: 12,
										alignItems: 'baseline',
										lineHeight: 1.25,
									}}
								>
									{(() => {
										// 1. If explicit frame-accurate words are provided:
										if (line.words && line.words.length > 0) {
											return line.words.map((w, wIdx) => {
												const isVocalized = f >= w.startFrame;
												const isCurrentWord = isCurrent && f >= w.startFrame && f < w.endFrame;

												return (
													<span
														key={wIdx}
														style={{
															color: isCurrentWord
																? accentColor
																: isVocalized
																? '#FFFFFF'
																: isCurrent
																? 'rgba(255, 255, 255, 0.38)'
																: isPast
																? '#E4E4E7'
																: '#71717A',
															textShadow: isCurrentWord
																? `0 0 25px ${accentColor}, 0 0 50px ${accentColor}cc`
																: isVocalized && isCurrent
																? '0 0 15px rgba(255, 255, 255, 0.35)'
																: undefined,
															transform: isCurrentWord ? 'scale(1.10)' : 'scale(1)',
															display: 'inline-block',
															transition: 'transform 0.1s ease, color 0.1s ease',
														}}
													>
														{w.text}
													</span>
												);
											});
										}

										// 2. Fallback to natural ratio division
										const words = line.text.split(' ');
										if (!isCurrent) {
											return (
												<span style={{color: isPast ? '#E4E4E7' : '#71717A'}}>
													{line.text}
												</span>
											);
										}
										const duration = Math.max(1, line.endFrame - line.startFrame);
										const progress = Math.min(1, Math.max(0, (f - line.startFrame) / duration));
										const activeWordIdx = Math.min(
											words.length - 1,
											Math.floor(progress * words.length)
										);

										return words.map((w, wIdx) => {
											const isVocalized = wIdx <= activeWordIdx;
											const isCurrentWord = wIdx === activeWordIdx;

											return (
												<span
													key={wIdx}
													style={{
														color: isCurrentWord
															? accentColor
															: isVocalized
															? '#FFFFFF'
															: 'rgba(255, 255, 255, 0.4)',
														textShadow: isCurrentWord
															? `0 0 25px ${accentColor}, 0 0 50px ${accentColor}cc`
															: isVocalized
															? '0 0 15px rgba(255, 255, 255, 0.35)'
															: undefined,
														transform: isCurrentWord ? 'scale(1.08)' : 'scale(1)',
														display: 'inline-block',
														transition: 'transform 0.12s ease, color 0.12s ease',
													}}
												>
													{w}
												</span>
											);
										});
									})()}
								</div>
								{line.translation && isCurrent && (
									<div
										style={{
											fontSize: 21,
											fontWeight: 500,
											color: '#A3E635',
											fontStyle: 'italic',
											letterSpacing: 0.2,
											opacity: 0.95,
										}}
									>
										{line.translation}
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Bottom Media Player Scrubber & Controls HUD */}
				<div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12}}>
					{/* Progress Scrubber */}
					<div style={{display: 'flex', alignItems: 'center', gap: 14}}>
						<span
							style={{
								fontFamily: FONT_PLUS_JAKARTA,
								fontSize: 13,
								fontWeight: 600,
								color: '#A1A1AA',
								minWidth: 42,
							}}
						>
							{formatTime(currentSec)}
						</span>
						<div
							style={{
								flex: 1,
								height: 5,
								borderRadius: 3,
								backgroundColor: 'rgba(255, 255, 255, 0.12)',
								position: 'relative',
							}}
						>
							<div
								style={{
									width: `${progressPercent}%`,
									height: '100%',
									borderRadius: 3,
									background: `linear-gradient(90deg, #10B981, ${accentColor})`,
									boxShadow: `0 0 12px ${accentColor}`,
									position: 'relative',
								}}
							>
								{/* Scrubber Knob */}
								<div
									style={{
										position: 'absolute',
										right: -5,
										top: -4.5,
										width: 14,
										height: 14,
										borderRadius: '50%',
										backgroundColor: '#FFFFFF',
										boxShadow: `0 0 12px ${accentColor}, 0 2px 4px rgba(0,0,0,0.5)`,
									}}
								/>
							</div>
						</div>
						<span
							style={{
								fontFamily: FONT_PLUS_JAKARTA,
								fontSize: 13,
								fontWeight: 600,
								color: '#A1A1AA',
								minWidth: 42,
								textAlign: 'right',
							}}
						>
							{formatTime(totalSec)}
						</span>
					</div>

					{/* Media Buttons Row */}
					<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px'}}>
						{/* Like & Shuffle */}
						<div style={{display: 'flex', alignItems: 'center', gap: 18}}>
							<span
								style={{
									display: 'flex',
									alignItems: 'center',
									filter: `drop-shadow(0 0 8px ${accentColor}88)`,
									cursor: 'default',
								}}
							>
								<svg width="22" height="22" viewBox="0 0 24 24" fill={accentColor}>
									<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
								</svg>
							</span>
							<span style={{display: 'flex', alignItems: 'center'}}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="16 3 21 3 21 8"/>
									<line x1="4" y1="20" x2="21" y2="3"/>
									<polyline points="21 16 21 21 16 21"/>
									<line x1="15" y1="15" x2="21" y2="21"/>
									<line x1="4" y1="4" x2="9" y2="9"/>
								</svg>
							</span>
						</div>

						{/* Center Controls: Prev, Play/Pause, Next */}
						<div style={{display: 'flex', alignItems: 'center', gap: 22}}>
							<span style={{display: 'flex', alignItems: 'center'}}>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,0.88)">
									<polygon points="19 20 9 12 19 4 19 20"/>
									<line x1="5" y1="19" x2="5" y2="5" stroke="rgba(255,255,255,0.88)" strokeWidth="2.5" strokeLinecap="round"/>
								</svg>
							</span>
							<div
								style={{
									width: 48,
									height: 48,
									borderRadius: '50%',
									backgroundColor: accentColor,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: `0 0 24px ${accentColor}88`,
									transform: `scale(${1 + Math.sin(f / 12) * 0.04})`,
								}}
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
									<rect x="6" y="4" width="4" height="16" rx="1.5"/>
									<rect x="14" y="4" width="4" height="16" rx="1.5"/>
								</svg>
							</div>
							<span style={{display: 'flex', alignItems: 'center'}}>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,0.88)">
									<polygon points="5 4 15 12 5 20 5 4"/>
									<line x1="19" y1="5" x2="19" y2="19" stroke="rgba(255,255,255,0.88)" strokeWidth="2.5" strokeLinecap="round"/>
								</svg>
							</span>
						</div>

						{/* Repeat & Live Sync */}
						<div style={{display: 'flex', alignItems: 'center', gap: 14}}>
							<span style={{display: 'flex', alignItems: 'center'}}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="17 1 21 5 17 9"/>
									<path d="M3 11V9a4 4 0 0 1 4-4h14"/>
									<polyline points="7 23 3 19 7 15"/>
									<path d="M21 13v2a4 4 0 0 1-4 4H3"/>
								</svg>
							</span>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 7,
									padding: '5px 12px',
									borderRadius: 999,
									background: 'rgba(30, 215, 96, 0.1)',
									border: '1px solid rgba(30, 215, 96, 0.25)',
								}}
							>
								<div
									style={{
										width: 8,
										height: 8,
										borderRadius: '50%',
										backgroundColor: accentColor,
										boxShadow: `0 0 10px ${accentColor}`,
										opacity: 0.6 + 0.4 * Math.sin(f / 6),
									}}
								/>
								<span
									style={{
										fontFamily: FONT_PLUS_JAKARTA,
										fontSize: 13,
										fontWeight: 700,
										color: accentColor,
									}}
								>
									Live Sync
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// =========================================================================
// 2. 3D BACKGROUND LYRIC WORD WALL (Drifting rap/drill lyrics wall)
// =========================================================================
export const WordWall3D: React.FC<{
	words: string[];
	activeWords?: string[];
	color?: string;
	accentColor?: string;
	tiltAngle?: number;
	fontSize?: number;
}> = ({
	words,
	activeWords = [],
	color = 'rgba(255, 255, 255, 0.12)',
	accentColor = '#1ED760',
	tiltAngle = -22,
	fontSize = 68,
}) => {
	const f = useCurrentFrame();
	const driftY = (f * 0.7) % 360;
	const repeatedWords = React.useMemo(() => [...words, ...words, ...words, ...words], [words]);
	const cleanActive = React.useMemo(
		() => activeWords.map((w) => w.toUpperCase().replace(/[^A-Z0-9]/g, '')).filter((w) => w.length > 1),
		[activeWords]
	);

	return (
		<AbsoluteFill
			style={{
				perspective: 1000,
				overflow: 'hidden',
				pointerEvents: 'none',
				zIndex: 0,
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: -300,
					transform: `rotateX(15deg) rotateY(${tiltAngle}deg) translateY(${-driftY}px)`,
					transformStyle: 'preserve-3d',
					display: 'flex',
					flexWrap: 'wrap',
					gap: 36,
					alignContent: 'flex-start',
					opacity: 0.9,
				}}
			>
				{repeatedWords.map((w, i) => {
					const clean = w.toUpperCase().replace(/[^A-Z0-9]/g, '');
					const isHighlighted = cleanActive.some(
						(act) => (act.length > 2 && clean.includes(act)) || clean === act
					);
					return (
						<span
							key={i}
							style={{
								fontFamily: FONT_OUTFIT,
								fontSize,
								fontWeight: 900,
								letterSpacing: -1,
								color: isHighlighted ? accentColor : color,
								textShadow: isHighlighted
									? `0 0 25px ${accentColor}, 0 0 50px ${accentColor}88`
									: undefined,
								transform: isHighlighted ? 'scale(1.12)' : 'scale(1)',
								textTransform: 'uppercase',
								transition: 'color 0.2s ease, transform 0.2s ease',
								display: 'inline-block',
							}}
						>
							{w}
						</span>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

// =========================================================================
// 3. BEAT-DRIVEN CAMERA KICK & SHAKE (Hard bass drop & rap accents)
// =========================================================================
export const BeatCameraShake: React.FC<{
	beatFrames: number[];
	shakeIntensity?: number;
	children: React.ReactNode;
}> = ({beatFrames, shakeIntensity = 18, children}) => {
	const f = useCurrentFrame();

	let currentShake = 0;
	for (const bf of beatFrames) {
		const diff = f - bf;
		if (diff >= 0 && diff <= 12) {
			const decay = 1 - diff / 12;
			currentShake = Math.sin(diff * 2.2) * shakeIntensity * decay;
			break;
		}
	}

	return (
		<AbsoluteFill
			style={{
				transform: `translate3d(${currentShake}px, ${-Math.abs(currentShake) * 0.5}px, 0px)`,
			}}
		>
			{children}
		</AbsoluteFill>
	);
};

// =========================================================================
// 4. GLASSMORPHIC MUSIC PLAYER HUD
// =========================================================================
export const MusicPlayerHUD: React.FC<{
	trackTitle: string;
	artistName: string;
	currentTime: string;
	totalTime: string;
	accentColor?: string;
}> = ({
	trackTitle,
	artistName,
	currentTime,
	totalTime,
	accentColor = C.lime,
}) => {
	const f = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const progress = (f / durationInFrames) * 100;

	return (
		<div
			style={{
				position: 'absolute',
				bottom: 48,
				left: 64,
				right: 64,
				padding: '20px 36px',
				borderRadius: 24,
				background: 'rgba(15, 15, 22, 0.82)',
				border: '1px solid rgba(255, 255, 255, 0.12)',
				backdropFilter: 'blur(20px)',
				boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
				display: 'flex',
				flexDirection: 'column',
				gap: 14,
			}}
		>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<div style={{display: 'flex', alignItems: 'center', gap: 18}}>
					<div
						style={{
							width: 44,
							height: 44,
							borderRadius: '50%',
							background: accentColor,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 18,
							color: '#000',
							boxShadow: `0 0 20px ${accentColor}88`,
						}}
					>
						▶
					</div>
					<div>
						<div style={{fontSize: 24, fontWeight: 800, color: '#FFF'}}>{trackTitle}</div>
						<div style={{fontSize: 18, color: C.dim}}>{artistName}</div>
					</div>
				</div>
				<div style={{fontFamily: 'monospace', fontSize: 18, color: C.dim}}>
					{currentTime} / {totalTime}
				</div>
			</div>

			{/* Progress Scrubber */}
			<div
				style={{
					height: 6,
					borderRadius: 3,
					backgroundColor: 'rgba(255,255,255,0.12)',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						width: `${progress}%`,
						height: '100%',
						background: `linear-gradient(90deg, ${accentColor}, #7C3AED)`,
						boxShadow: `0 0 12px ${accentColor}`,
					}}
				/>
			</div>
		</div>
	);
};


// =========================================================================
// 5. LO-FI VINYL RECORD PLAYER (Aesthetic Chill / Acoustic / Indie)
// =========================================================================
export const VinylRecordPlayer: React.FC<{
	trackTitle: string;
	artistName: string;
	coverImage?: string;
	currentLyric?: string;
	accentColor?: string;
	size?: number;
}> = ({
	trackTitle,
	artistName,
	coverImage,
	currentLyric,
	accentColor = '#F59E0B',
	size = 460,
}) => {
	const f = useCurrentFrame();
	const rotation = f * 1.2;

	return (
		<div style={{display: 'flex', alignItems: 'center', gap: 64}}>
			{/* Spinning Vinyl Record */}
			<div
				style={{
					width: size,
					height: size,
					borderRadius: '50%',
					background: 'radial-gradient(circle, #18181B 0%, #09090B 70%, #000 100%)',
					border: '6px solid #27272A',
					boxShadow: '0 25px 70px rgba(0,0,0,0.85), 0 0 40px rgba(245, 158, 11, 0.15)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					transform: `rotate(${rotation}deg)`,
				}}
			>
				{/* Concentric Vinyl Grooves */}
				{[0.88, 0.76, 0.64, 0.52].map((k, i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							width: size * k,
							height: size * k,
							borderRadius: '50%',
							border: '1px solid rgba(255, 255, 255, 0.05)',
						}}
					/>
				))}

				{/* Center Label */}
				<div
					style={{
						width: size * 0.36,
						height: size * 0.36,
						borderRadius: '50%',
						background: `linear-gradient(135deg, ${accentColor}, #B45309)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 0 20px rgba(0,0,0,0.8)',
						border: '4px solid #18181B',
						overflow: 'hidden',
					}}
				>
					{coverImage ? (
						<Img
							src={coverImage.startsWith('http') ? coverImage : staticFile(coverImage)}
							style={{width: '100%', height: '100%', objectFit: 'cover'}}
						/>
					) : (
						<div style={{fontSize: 28, fontWeight: 900, color: '#000'}}>♫</div>
					)}
				</div>

				{/* Spindle hole */}
				<div
					style={{
						position: 'absolute',
						width: 14,
						height: 14,
						borderRadius: '50%',
						backgroundColor: '#000',
					}}
				/>
			</div>

			{/* Song & Floating Lyric Text */}
			<div style={{display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 650}}>
				<div
					style={{
						padding: '8px 20px',
						borderRadius: 999,
						backgroundColor: 'rgba(245, 158, 11, 0.12)',
						border: '1px solid rgba(245, 158, 11, 0.35)',
						color: accentColor,
						fontSize: 18,
						fontWeight: 700,
						width: 'fit-content',
						letterSpacing: 2,
						textTransform: 'uppercase',
					}}
				>
					Vinyl Stream • 33 RPM
				</div>

				<div style={{fontSize: 54, fontWeight: 900, color: '#FFFFFF', letterSpacing: -1, lineHeight: 1.1}}>
					{trackTitle}
				</div>
				<div style={{fontSize: 28, fontWeight: 500, color: C.dim}}>{artistName}</div>

				{currentLyric && (
					<div
						style={{
							marginTop: 18,
							padding: '24px 32px',
							borderRadius: 24,
							background: 'rgba(255, 255, 255, 0.04)',
							border: '1px solid rgba(255, 255, 255, 0.1)',
							fontSize: 34,
							fontWeight: 600,
							color: '#F4F4F5',
							fontStyle: 'italic',
							lineHeight: 1.35,
						}}
					>
						"{currentLyric}"
					</div>
				)}
			</div>
		</div>
	);
};

// =========================================================================
// 6. SYNTHWAVE / EDM NEON HORIZON GRID
// =========================================================================
export const NeonSynthHorizon: React.FC<{
	trackTitle: string;
	artistName: string;
	activeLyric?: string;
	primaryColor?: string;
	secondaryColor?: string;
}> = ({
	trackTitle,
	artistName,
	activeLyric,
	primaryColor = '#06B6D4', // Cyan
	secondaryColor = '#EC4899', // Pink
}) => {
	const f = useCurrentFrame();
	const gridScroll = (f * 4) % 60;

	return (
		<AbsoluteFill style={{backgroundColor: '#05050A', overflow: 'hidden'}}>
			{/* Retro Sun / Glow Orb */}
			<div
				style={{
					position: 'absolute',
					top: 140,
					left: '50%',
					marginLeft: -220,
					width: 440,
					height: 440,
					borderRadius: '50%',
					background: `linear-gradient(180deg, ${secondaryColor} 0%, #8B5CF6 60%, transparent 100%)`,
					boxShadow: `0 0 120px ${secondaryColor}88`,
					opacity: 0.85,
				}}
			/>

			{/* 3D Perspective Grid Horizon */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: -500,
					right: -500,
					height: 480,
					perspective: 400,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						transform: 'rotateX(75deg)',
						transformOrigin: '50% 100%',
						backgroundImage: `
							linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.4) 25%, rgba(6, 182, 212, 0.4) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.4) 75%, rgba(6, 182, 212, 0.4) 76%, transparent 77%),
							linear-gradient(90deg, transparent 24%, rgba(236, 72, 153, 0.4) 25%, rgba(236, 72, 153, 0.4) 26%, transparent 27%, transparent 74%, rgba(236, 72, 153, 0.4) 75%, rgba(236, 72, 153, 0.4) 76%, transparent 77%)
						`,
						backgroundSize: `60px 60px`,
						backgroundPosition: `0px ${gridScroll}px`,
					}}
				/>
			</div>

			{/* Hero Synthwave Lyrics & Title */}
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 10,
					padding: '0 80px',
					textAlign: 'center',
					gap: 18,
				}}
			>
				<div style={{fontSize: 24, fontWeight: 800, color: primaryColor, letterSpacing: 4, textTransform: 'uppercase'}}>
					{artistName}
				</div>
				<div
					style={{
						fontSize: 88,
						fontWeight: 900,
						letterSpacing: -2,
						color: '#FFFFFF',
						textShadow: `0 0 30px ${secondaryColor}, 0 0 60px ${primaryColor}`,
					}}
				>
					{trackTitle}
				</div>
				{activeLyric && (
					<div
						style={{
							marginTop: 32,
							fontSize: 48,
							fontWeight: 800,
							letterSpacing: -0.5,
							color: '#FFFFFF',
							background: 'rgba(5, 5, 10, 0.75)',
							padding: '16px 44px',
							borderRadius: 24,
							border: `1px solid ${primaryColor}66`,
							boxShadow: `0 0 40px ${primaryColor}44`,
						}}
					>
						{activeLyric}
					</div>
				)}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// =========================================================================
// 7. RAP & DRILL KINETIC IMPACT LYRIC
// =========================================================================
export const RapWordImpact: React.FC<{
	lines: {text: string; isPunch?: boolean}[];
	accentColor?: string;
}> = ({lines, accentColor = '#DC2626'}) => {
	const f = useCurrentFrame();

	return (
		<div style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
			{lines.map((l, i) => (
				<div
					key={i}
					style={{
						fontSize: l.isPunch ? 92 : 68,
						fontWeight: 900,
						fontStyle: 'italic',
						letterSpacing: -3,
						textTransform: 'uppercase',
						color: l.isPunch ? accentColor : '#FFFFFF',
						textShadow: l.isPunch ? `0 0 40px ${accentColor}` : '0 10px 30px rgba(0,0,0,0.9)',
						transform: l.isPunch ? 'scale(1.05) skewX(-6deg)' : 'skewX(-6deg)',
					}}
				>
					{l.text}
				</div>
			))}
		</div>
	);
};
