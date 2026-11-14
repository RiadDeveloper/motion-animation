import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {C, clamp, gradientText, POP, spr} from './ui';

// =========================================================================
// 1. SPOTIFY 3D TILTED LYRICS CARD
// =========================================================================
export interface LyricLine {
	startFrame: number;
	endFrame: number;
	text: string;
	translation?: string; // Optional meaning/translation
}

export const SpotifyLyricCard: React.FC<{
	lines: LyricLine[];
	trackTitle: string;
	artistName: string;
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
	coverImage,
	accentColor = '#1ED760', // Spotify green
	cardTiltX = 8,
	cardTiltY = -12,
	width = 820,
	height = 920,
}) => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Find active line index
	const activeIndex = lines.findIndex((l) => f >= l.startFrame && f < l.endFrame);
	const activeLine = activeIndex !== -1 ? lines[activeIndex] : null;

	// Gentle ambient float
	const floatX = Math.sin(f / 35) * 8;
	const floatY = Math.cos(f / 40) * 10;
	const rotX = cardTiltX + Math.sin(f / 45) * 3;
	const rotY = cardTiltY + Math.cos(f / 50) * 3;

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
					borderRadius: 36,
					background: 'linear-gradient(165deg, rgba(30,30,40,0.85) 0%, rgba(12,12,18,0.92) 100%)',
					border: '1px solid rgba(255, 255, 255, 0.14)',
					boxShadow: `0 35px 100px rgba(0,0,0,0.8), 0 0 60px ${accentColor}26`,
					backdropFilter: 'blur(24px)',
					transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${floatX}px, ${floatY}px, 0px)`,
					display: 'flex',
					flexDirection: 'column',
					padding: 48,
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Top Track Header */}
				<div style={{display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36}}>
					{coverImage ? (
						<div
							style={{
								width: 90,
								height: 90,
								borderRadius: 18,
								overflow: 'hidden',
								boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
								flexShrink: 0,
							}}
						>
							<Img
								src={coverImage.startsWith('http') ? coverImage : staticFile(coverImage)}
								style={{width: '100%', height: '100%', objectFit: 'cover'}}
							/>
						</div>
					) : (
						<div
							style={{
								width: 90,
								height: 90,
								borderRadius: 18,
								background: `linear-gradient(135deg, ${accentColor}, #7C3AED)`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 36,
								fontWeight: 900,
								color: '#000',
							}}
						>
							♫
						</div>
					)}
					<div style={{display: 'flex', flexDirection: 'column', gap: 4, flex: 1}}>
						<div style={{fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5}}>
							{trackTitle}
						</div>
						<div style={{fontSize: 22, fontWeight: 500, color: C.dim}}>{artistName}</div>
					</div>
					{/* Spotify Logo Pill */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							padding: '8px 18px',
							borderRadius: 999,
							background: 'rgba(255,255,255,0.06)',
							border: '1px solid rgba(255,255,255,0.1)',
							fontSize: 16,
							fontWeight: 700,
							color: accentColor,
						}}
					>
						<span style={{fontSize: 20}}>●</span> Lyrics
					</div>
				</div>

				{/* Scrolling Lyrics Stream */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						gap: 32,
						overflow: 'hidden',
					}}
				>
					{lines.map((line, idx) => {
						const isCurrent = idx === activeIndex;
						const isPast = activeIndex !== -1 && idx < activeIndex;
						const isFuture = activeIndex !== -1 && idx > activeIndex;

						// Dynamic spring transition on line change
						const lineProgress = isCurrent ? spr(f, fps, line.startFrame, POP) : 1;

						return (
							<div
								key={idx}
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 6,
									opacity: isCurrent ? 1 : isPast ? 0.4 : 0.2,
									transform: isCurrent
										? `scale(${0.96 + lineProgress * 0.08}) translateX(12px)`
										: 'scale(1) translateX(0px)',
									transition: 'opacity 0.25s ease, transform 0.25s ease',
								}}
							>
								<div
									style={{
										fontSize: isCurrent ? 42 : 32,
										fontWeight: isCurrent ? 900 : 700,
										letterSpacing: -0.5,
										color: isCurrent ? '#FFFFFF' : '#A1A1AA',
										textShadow: isCurrent ? `0 0 25px ${accentColor}99` : undefined,
									}}
								>
									{line.text}
								</div>
								{line.translation && isCurrent && (
									<div style={{fontSize: 22, fontWeight: 500, color: accentColor}}>
										{line.translation}
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Animated Glowing Sparks on Active Line */}
				{activeLine && (
					<div
						style={{
							position: 'absolute',
							right: 36,
							bottom: 36,
							display: 'flex',
							alignItems: 'center',
							gap: 12,
						}}
					>
						<div
							style={{
								width: 14,
								height: 14,
								borderRadius: '50%',
								backgroundColor: accentColor,
								boxShadow: `0 0 20px ${accentColor}`,
								opacity: 0.5 + 0.5 * Math.sin(f / 6),
							}}
						/>
						<span style={{fontSize: 16, fontWeight: 600, color: C.dim}}>Live Sync</span>
					</div>
				)}
			</div>
		</div>
	);
};

// =========================================================================
// 2. 3D BACKGROUND LYRIC WORD WALL (Drifting rap/drill lyrics wall)
// =========================================================================
export const WordWall3D: React.FC<{
	words: string[];
	color?: string;
	tiltAngle?: number;
	fontSize?: number;
}> = ({words, color = 'rgba(255, 255, 255, 0.06)', tiltAngle = -22, fontSize = 68}) => {
	const f = useCurrentFrame();
	const driftY = (f * 0.8) % 300;

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
					opacity: 0.8,
				}}
			>
				{words.map((w, i) => (
					<span
						key={i}
						style={{
							fontSize,
							fontWeight: 900,
							letterSpacing: -1,
							color,
							textTransform: 'uppercase',
						}}
					>
						{w}
					</span>
				))}
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
