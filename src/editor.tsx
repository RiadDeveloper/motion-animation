import React from 'react';
import {
	AbsoluteFill,
	Audio,
	Img,
	interpolate,
	OffthreadVideo,
	Sequence,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { C, clamp, gradientText, POP, Rise, SMOOTH, spr } from './ui';

// =========================================================================
// 1. VIDEO CLIP WRAPPER (With trimming, volume curve, filters)
// =========================================================================
export interface VideoClipProps {
	src: string; // staticFile path or URL
	startFrom?: number; // frame in source video to start playing from
	endAt?: number; // frame in source video to stop playing
	volume?: number | ((f: number) => number);
	playbackRate?: number;
	muted?: boolean;
	style?: React.CSSProperties;
	filter?: {
		brightness?: number; // e.g. 1.05
		contrast?: number; // e.g. 1.1
		saturation?: number; // e.g. 1.15
		blur?: number; // e.g. 0
		grayscale?: number; // 0 to 1
	};
}

export const VideoClip: React.FC<VideoClipProps> = ({
	src,
	startFrom = 0,
	endAt,
	volume = 1,
	playbackRate = 1,
	muted = false,
	style,
	filter,
}) => {
	const filterString = filter
		? `brightness(${filter.brightness ?? 1}) contrast(${filter.contrast ?? 1}) saturate(${filter.saturation ?? 1}) blur(${filter.blur ?? 0}px) grayscale(${filter.grayscale ?? 0})`
		: undefined;

	return (
		<OffthreadVideo
			src={src.startsWith('http') ? src : staticFile(src)}
			startFrom={startFrom}
			endAt={endAt}
			volume={volume}
			playbackRate={playbackRate}
			muted={muted}
			style={{
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				filter: filterString,
				...style,
			}}
		/>
	);
};

// =========================================================================
// 2. SMART VERTICAL RE-FRAMER (16:9 Landscape to 9:16 Shorts/Reels)
// =========================================================================
export const ReframeVertical: React.FC<{
	src: string;
	startFrom?: number;
	endAt?: number;
	volume?: number | ((f: number) => number);
	scale?: number;
	borderRadius?: number;
	blurAmount?: number;
	brightness?: number;
}> = ({
	src,
	startFrom = 0,
	endAt,
	volume = 1,
	scale = 1,
	borderRadius = 28,
	blurAmount = 24,
	brightness = 0.45,
}) => {
		return (
			<AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
				{/* Blurred ambient background filling entire 9:16 canvas */}
				<AbsoluteFill style={{ filter: `blur(${blurAmount}px) brightness(${brightness})`, transform: 'scale(1.2)' }}>
					<VideoClip src={src} startFrom={startFrom} endAt={endAt} muted={true} />
				</AbsoluteFill>

				{/* Foreground sharp main video */}
				<AbsoluteFill
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '0 24px',
					}}
				>
					<div
						style={{
							width: '100%',
							borderRadius,
							overflow: 'hidden',
							transform: `scale(${scale})`,
							boxShadow: '0 25px 80px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.12)',
						}}
					>
						<VideoClip src={src} startFrom={startFrom} endAt={endAt} volume={volume} />
					</div>
				</AbsoluteFill>
			</AbsoluteFill>
		);
	};

// =========================================================================
// 3. PUNCH ZOOM / CAMERA EMPHASIS
// =========================================================================
export const PunchZoom: React.FC<{
	children: React.ReactNode;
	fromZoom?: number; // e.g. 1.0
	toZoom?: number; // e.g. 1.25
	originX?: string; // e.g. "50%"
	originY?: string; // e.g. "40%"
	durationFrames?: number;
	delay?: number;
}> = ({
	children,
	fromZoom = 1.0,
	toZoom = 1.25,
	originX = '50%',
	originY = '50%',
	durationFrames = 12,
	delay = 0,
}) => {
		const f = useCurrentFrame();
		const z = interpolate(f, [delay, delay + durationFrames], [fromZoom, toZoom], clamp);

		return (
			<AbsoluteFill
				style={{
					transformOrigin: `${originX} ${originY}`,
					transform: `scale(${z})`,
				}}
			>
				{children}
			</AbsoluteFill>
		);
	};

// =========================================================================
// 4. PICTURE-IN-PICTURE (Webcam / B-Roll Overlay)
// =========================================================================
export const PictureInPicture: React.FC<{
	src: string;
	startFrom?: number;
	position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	width?: number;
	height?: number;
	borderRadius?: number | string;
	glowColor?: string;
	delay?: number;
}> = ({
	src,
	startFrom = 0,
	position = 'bottom-right',
	width = 340,
	height = 240,
	borderRadius = 24,
	glowColor = C.lime,
	delay = 10,
}) => {
		const f = useCurrentFrame();
		const { fps } = useVideoConfig();
		const p = spr(f, fps, delay, POP);

		const posStyle: React.CSSProperties = {
			position: 'absolute',
			width,
			height,
			borderRadius,
			overflow: 'hidden',
			border: `2px solid ${glowColor}`,
			boxShadow: `0 0 35px ${glowColor}66, 0 15px 40px rgba(0,0,0,0.6)`,
			transform: `scale(${p})`,
			opacity: Math.min(1, p * 1.5),
			...(position === 'bottom-right' && { right: 48, bottom: 48 }),
			...(position === 'bottom-left' && { left: 48, bottom: 48 }),
			...(position === 'top-right' && { right: 48, top: 48 }),
			...(position === 'top-left' && { left: 48, top: 48 }),
		};

		return (
			<div style={posStyle}>
				<VideoClip src={src} startFrom={startFrom} muted={true} />
			</div>
		);
	};

// =========================================================================
// 5. BROADCAST LOWER-THIRD (Speaker Name, Title, Chapter)
// =========================================================================
export const LowerThird: React.FC<{
	title: string;
	subtitle?: string;
	icon?: React.ReactNode;
	accentColor?: string;
	delay?: number;
	positionBottom?: number;
}> = ({
	title,
	subtitle,
	icon,
	accentColor = C.lime,
	delay = 15,
	positionBottom = 80,
}) => {
		const f = useCurrentFrame();
		const { fps } = useVideoConfig();
		const p = spr(f, fps, delay, POP);

		return (
			<div
				style={{
					position: 'absolute',
					left: 80,
					bottom: positionBottom,
					display: 'flex',
					alignItems: 'center',
					gap: 20,
					padding: '16px 36px 16px 24px',
					borderRadius: 20,
					background: 'rgba(11, 11, 15, 0.88)',
					backdropFilter: 'blur(16px)',
					border: '1px solid rgba(255, 255, 255, 0.12)',
					borderLeft: `6px solid ${accentColor}`,
					boxShadow: `0 15px 40px rgba(0,0,0,0.5), 0 0 25px ${accentColor}33`,
					transform: `translateX(${(1 - p) * -80}px)`,
					opacity: Math.min(1, p * 1.4),
				}}
			>
				{icon ? <div style={{ display: 'flex' }}>{icon}</div> : null}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
					<div style={{ fontSize: 34, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.5 }}>
						{title}
					</div>
					{subtitle ? (
						<div style={{ fontSize: 22, fontWeight: 500, color: C.dim }}>{subtitle}</div>
					) : null}
				</div>
			</div>
		);
	};

// =========================================================================
// 6. DYNAMIC SUBTITLE / CAPTIONS OVERLAY (Hormozi / Punchy Social Style)
// =========================================================================
export interface CaptionSegment {
	startFrame: number;
	endFrame: number;
	text: string;
	highlight?: boolean;
}

export const CaptionOverlay: React.FC<{
	segments: CaptionSegment[];
	activeColor?: string;
	fontSize?: number;
	positionBottom?: number;
}> = ({
	segments,
	activeColor = C.lime,
	fontSize = 58,
	positionBottom = 160,
}) => {
		const f = useCurrentFrame();
		const current = segments.find((s) => f >= s.startFrame && f < s.endFrame);

		if (!current) return null;

		const words = current.text.split(' ');
		const rel = f - current.startFrame;
		const activeIndex = Math.min(words.length - 1, Math.floor((rel / (current.endFrame - current.startFrame)) * words.length));

		return (
			<div
				style={{
					position: 'absolute',
					left: 40,
					right: 40,
					bottom: positionBottom,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: 16,
					textAlign: 'center',
				}}
			>
				{words.map((w, idx) => {
					const isCurrent = idx === activeIndex;
					return (
						<span
							key={idx}
							style={{
								fontSize,
								fontWeight: 900,
								letterSpacing: -1,
								color: isCurrent ? activeColor : '#FFFFFF',
								textShadow: isCurrent
									? `0 0 20px ${activeColor}, 0 4px 10px rgba(0,0,0,0.9)`
									: '0 4px 10px rgba(0,0,0,0.9)',
								transform: isCurrent ? 'scale(1.18)' : 'scale(1)',
								display: 'inline-block',
								transition: 'transform 0.1s ease',
							}}
						>
							{w}
						</span>
					);
				})}
			</div>
		);
	};

// =========================================================================
// 7. SLEEK TOP / BOTTOM PROGRESS BAR
// =========================================================================
export const EditorProgressBar: React.FC<{
	position?: 'top' | 'bottom';
	height?: number;
	color?: string;
}> = ({ position = 'top', height = 6, color = C.lime }) => {
	const f = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();
	const progress = (f / durationInFrames) * 100;

	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				...(position === 'top' ? { top: 0 } : { bottom: 0 }),
				height,
				backgroundColor: 'rgba(255, 255, 255, 0.1)',
			}}
		>
			<div
				style={{
					width: `${progress}%`,
					height: '100%',
					backgroundColor: color,
					boxShadow: `0 0 14px ${color}`,
				}}
			/>
		</div>
	);
};

// =========================================================================
// 8. SCREENSHOT & MEDIA MOCKUP (Mac Window / Device Frame)
// =========================================================================
export const ScreenshotMockup: React.FC<{
	src: string;
	title?: string;
	width?: number;
	delay?: number;
	zoomOnHover?: boolean;
}> = ({ src, title = 'Application Preview', width = 1200, delay = 10, zoomOnHover = true }) => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	const p = spr(f, fps, delay, POP);
	const gentleZoom = zoomOnHover ? 1 + interpolate(f, [delay + 10, delay + 120], [0, 0.05], clamp) : 1;

	return (
		<div
			style={{
				width,
				borderRadius: 24,
				overflow: 'hidden',
				background: '#18181B',
				border: '1px solid rgba(255, 255, 255, 0.12)',
				boxShadow: '0 30px 100px rgba(0, 0, 0, 0.8), 0 0 50px rgba(124, 58, 237, 0.25)',
				transform: `scale(${p * gentleZoom})`,
				opacity: Math.min(1, p * 1.5),
			}}
		>
			{/* Mac Window Title Bar */}
			<div
				style={{
					height: 48,
					background: '#1F1F23',
					borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
					display: 'flex',
					alignItems: 'center',
					padding: '0 20px',
					position: 'relative',
				}}
			>
				<div style={{ display: 'flex', gap: 8 }}>
					<div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EF4444' }} />
					<div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
					<div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981' }} />
				</div>
				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						textAlign: 'center',
						fontSize: 16,
						fontWeight: 600,
						color: '#A1A1AA',
					}}
				>
					{title}
				</div>
			</div>
			{/* Screenshot Content */}
			<div style={{ width: '100%', height: 'auto', maxHeight: 720, overflow: 'hidden' }}>
				<Img
					src={src.startsWith('http') ? src : staticFile(src)}
					style={{ width: '100%', height: 'auto', display: 'block' }}
				/>
			</div>
		</div>
	);
};

// =========================================================================
// 9. PUNCHY KEYWORD CALLOUT (Text Pop for spoken emphasis)
// =========================================================================
export const KeywordCallout: React.FC<{
	text: string;
	delay?: number;
	durationFrames?: number;
	color?: string;
	fontSize?: number;
}> = ({ text, delay = 0, durationFrames = 45, color = C.lime, fontSize = 92 }) => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();

	if (f < delay || f >= delay + durationFrames) return null;

	const p = spr(f, fps, delay, POP);
	const fadeOut = interpolate(f, [delay + durationFrames - 8, delay + durationFrames], [1, 0], clamp);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'none',
				opacity: fadeOut,
			}}
		>
			<div
				style={{
					fontSize,
					fontWeight: 900,
					letterSpacing: -2,
					color: '#FFFFFF',
					background: 'rgba(11, 11, 15, 0.75)',
					padding: '16px 44px',
					borderRadius: 24,
					border: `2px solid ${color}`,
					boxShadow: `0 0 50px ${color}88, 0 20px 60px rgba(0,0,0,0.8)`,
					transform: `scale(${p})`,
				}}
			>
				{text}
			</div>
		</div>
	);
};

// =========================================================================
// 10. BACKGROUND AUDIO WITH AUTOMATED DUCKING
// =========================================================================
export const DuckedMusic: React.FC<{
	src: string;
	duckingRanges: { startFrame: number; endFrame: number }[];
	normalVolume?: number;
	duckedVolume?: number;
}> = ({ src, duckingRanges, normalVolume = 0.6, duckedVolume = 0.12 }) => {
	const f = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	const isDucked = duckingRanges.some((r) => f >= r.startFrame && f <= r.endFrame);

	// General fade in / fade out
	const masterFade = interpolate(f, [0, 30, durationInFrames - 60, durationInFrames], [0, 1, 1, 0], clamp);

	const targetVol = isDucked ? duckedVolume : normalVolume;

	return (
		<Audio
			src={src.startsWith('http') ? src : staticFile(src)}
			volume={targetVol * masterFade}
		/>
	);
};


// =========================================================================
// 11. TERMINAL TYPIST (Animated Developer Shell / Code Walkthrough)
// =========================================================================
export const TerminalTypist: React.FC<{
	lines: {prompt?: string; command: string; output?: string; delay: number}[];
	title?: string;
	width?: number;
	fontSize?: number;
	accentColor?: string;
}> = ({
	lines,
	title = 'bash - 80x24',
	width = 1100,
	fontSize = 24,
	accentColor = C.lime,
}) => {
	const f = useCurrentFrame();

	return (
		<div
			style={{
				width,
				borderRadius: 20,
				overflow: 'hidden',
				background: '#0D0E15',
				border: '1px solid rgba(255, 255, 255, 0.12)',
				boxShadow: '0 30px 100px rgba(0,0,0,0.85), 0 0 50px rgba(163,230,53,0.18)',
				fontFamily: 'monospace',
			}}
		>
			{/* Terminal Header */}
			<div
				style={{
					height: 44,
					background: '#161822',
					borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
					display: 'flex',
					alignItems: 'center',
					padding: '0 18px',
					position: 'relative',
				}}
			>
				<div style={{display: 'flex', gap: 8}}>
					<div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EF4444'}} />
					<div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F59E0B'}} />
					<div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981'}} />
				</div>
				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						textAlign: 'center',
						fontSize: 14,
						color: '#71717A',
						fontWeight: 600,
					}}
				>
					{title}
				</div>
			</div>

			{/* Terminal Content */}
			<div
				style={{
					padding: '24px 30px',
					display: 'flex',
					flexDirection: 'column',
					gap: 16,
					fontSize,
					lineHeight: 1.5,
				}}
			>
				{lines.map((l, i) => {
					if (f < l.delay) return null;
					const typedLen = Math.floor(Math.max(0, f - l.delay) * 1.5);
					const displayedCmd = l.command.slice(0, typedLen);
					const isDoneTyping = typedLen >= l.command.length;
					const showOutput = isDoneTyping && l.output && f >= l.delay + Math.ceil(l.command.length / 1.5) + 6;

					return (
						<div key={i} style={{display: 'flex', flexDirection: 'column', gap: 6}}>
							<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
								<span style={{color: accentColor, fontWeight: 700}}>
									{l.prompt ?? '➜ ~'}
								</span>
								<span style={{color: '#F4F4F5'}}>{displayedCmd}</span>
								{!isDoneTyping && (
									<span
										style={{
											display: 'inline-block',
											width: 10,
											height: fontSize + 2,
											backgroundColor: accentColor,
											opacity: Math.sin(f / 4) > 0 ? 1 : 0,
										}}
									/>
								)}
							</div>
							{showOutput && (
								<div style={{color: '#A1A1AA', paddingLeft: 24, whiteSpace: 'pre-wrap'}}>
									{l.output}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

// =========================================================================
// 12. ONETAKE CONTINUOUS 3D CAMERA (Inspired by onetake / pro-motion-editor)
// =========================================================================
export interface CameraWaypoint {
	frame: number;
	x: number;
	y: number;
	z: number;
	rotateX?: number;
	rotateY?: number;
	scale?: number;
}

export const OneTakeCamera: React.FC<{
	waypoints: CameraWaypoint[];
	children: React.ReactNode;
}> = ({waypoints, children}) => {
	const f = useCurrentFrame();

	const sorted = [...waypoints].sort((a, b) => a.frame - b.frame);
	let prev = sorted[0];
	let next = sorted[sorted.length - 1];

	for (let i = 0; i < sorted.length - 1; i++) {
		if (f >= sorted[i].frame && f <= sorted[i + 1].frame) {
			prev = sorted[i];
			next = sorted[i + 1];
			break;
		}
	}

	const span = Math.max(1, next.frame - prev.frame);
	const progress = interpolate(f, [prev.frame, next.frame], [0, 1], clamp);

	const curX = interpolate(progress, [0, 1], [prev.x, next.x]);
	const curY = interpolate(progress, [0, 1], [prev.y, next.y]);
	const curZ = interpolate(progress, [0, 1], [prev.z, next.z]);
	const curRotX = interpolate(progress, [0, 1], [prev.rotateX ?? 0, next.rotateX ?? 0]);
	const curRotY = interpolate(progress, [0, 1], [prev.rotateY ?? 0, next.rotateY ?? 0]);
	const curScale = interpolate(progress, [0, 1], [prev.scale ?? 1, next.scale ?? 1]);

	return (
		<AbsoluteFill
			style={{
				perspective: 1200,
				overflow: 'hidden',
			}}
		>
			<AbsoluteFill
				style={{
					transformStyle: 'preserve-3d',
					transform: `translate3d(${-curX}px, ${-curY}px, ${curZ}px) rotateX(${curRotX}deg) rotateY(${curRotY}deg) scale(${curScale})`,
					transformOrigin: '50% 50%',
				}}
			>
				{children}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// =========================================================================
// 13. AUDIO WAVEFORM VISUALIZER (Bars pulsing with music)
// =========================================================================
export const AudioWaveform: React.FC<{
	barsCount?: number;
	height?: number;
	color?: string;
	secondaryColor?: string;
}> = ({barsCount = 28, height = 70, color = C.lime, secondaryColor = C.violetSoft}) => {
	const f = useCurrentFrame();

	return (
		<div style={{display: 'flex', alignItems: 'center', gap: 6, height}}>
			{new Array(barsCount).fill(0).map((_, i) => {
				const wave1 = Math.sin(f / 5 + i * 0.45);
				const wave2 = Math.cos(f / 8 + i * 0.28);
				const norm = Math.abs((wave1 + wave2) / 2);
				const barH = Math.max(8, norm * height);
				const barColor = i % 2 === 0 ? color : secondaryColor;

				return (
					<div
						key={i}
						style={{
							width: 6,
							height: barH,
							borderRadius: 3,
							backgroundColor: barColor,
							boxShadow: `0 0 10px ${barColor}88`,
							transition: 'height 0.05s ease',
						}}
					/>
				);
			})}
		</div>
	);
};

// =========================================================================
// 14. 3D TILT CARD (Perspective container with dynamic sheen)
// =========================================================================
export const Card3D: React.FC<{
	children: React.ReactNode;
	delay?: number;
	tiltX?: number;
	tiltY?: number;
	style?: React.CSSProperties;
}> = ({children, delay = 0, tiltX = 12, tiltY = -15, style}) => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = spr(f, fps, delay, POP);

	const rx = (1 - p) * tiltX + Math.sin(f / 25) * 3;
	const ry = (1 - p) * tiltY + Math.cos(f / 30) * 4;

	return (
		<div
			style={{
				perspective: 1200,
				transformStyle: 'preserve-3d',
			}}
		>
			<div
				style={{
					transform: `scale(${p}) rotateX(${rx}deg) rotateY(${ry}deg)`,
					transformStyle: 'preserve-3d',
					boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.2)',
					borderRadius: 28,
					border: '1px solid rgba(255,255,255,0.12)',
					background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
					backdropFilter: 'blur(16px)',
					padding: 36,
					...style,
				}}
			>
				{children}
			</div>
		</div>
	);
};
