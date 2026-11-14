import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	random,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

export const { fontFamily: FONT } = loadFont('normal', {
	weights: ['400', '500', '700', '800', '900'],
	subsets: ['latin'],
});

export const C = {
	bg: '#0B0B0F',
	lime: '#A3E635',
	violet: '#7C3AED',
	violetSoft: '#A78BFA',
	text: '#F5F5F7',
	dim: '#A1A1AA',
	card: 'rgba(255,255,255,0.045)',
	line: 'rgba(255,255,255,0.10)',
};

/** Transition length in frames between scenes. */
export const T = 18;

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const SMOOTH = { damping: 200 };
export const POP = { damping: 14, mass: 0.7, stiffness: 120 };

/** Spring that starts at `delay`. */
export const spr = (frame: number, fps: number, delay = 0, config: object = SMOOTH) =>
	spring({ frame: frame - delay, fps, config });

export const gradientText = (from = C.lime, to = C.violetSoft): React.CSSProperties => ({
	backgroundImage: `linear-gradient(100deg, ${from}, ${to})`,
	WebkitBackgroundClip: 'text',
	backgroundClip: 'text',
	color: 'transparent',
});

/** Scene wrapper: outgoing scene clears in the first half of the overlap, incoming arrives in the second. */
export const Scene: React.FC<{
	children: React.ReactNode;
	fadeIn?: boolean;
	fadeOut?: boolean;
}> = ({ children, fadeIn = true, fadeOut = true }) => {
	const f = useCurrentFrame();
	const { durationInFrames: d } = useVideoConfig();
	const i = fadeIn ? interpolate(f, [T / 2, T + 4], [0, 1], clamp) : 1;
	const o = fadeOut ? interpolate(f, [d - T, d - T / 2], [1, 0], clamp) : 1;
	const scale = 1 - (1 - i) * 0.05 + (1 - o) * 0.07;
	const blur = (1 - i) * 10 + (1 - o) * 12;
	return (
		<AbsoluteFill
			style={{
				opacity: i * o,
				transform: `scale(${scale})`,
				filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{children}
		</AbsoluteFill>
	);
};

/** Fade + slide + de-blur entrance. */
export const Rise: React.FC<{
	delay?: number;
	from?: 'up' | 'left' | 'right' | 'scale';
	dist?: number;
	style?: React.CSSProperties;
	children: React.ReactNode;
}> = ({ delay = 0, from = 'up', dist = 50, style, children }) => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	const p = spr(f, fps, delay);
	const r = 1 - p;
	const transform =
		from === 'up'
			? `translateY(${r * dist}px)`
			: from === 'left'
				? `translateX(${-r * dist}px)`
				: from === 'right'
					? `translateX(${r * dist}px)`
					: `scale(${0.8 + p * 0.2})`;
	return (
		<div
			style={{
				opacity: Math.min(1, p * 1.4),
				transform,
				filter: r > 0.01 ? `blur(${r * 10}px)` : undefined,
				...style,
			}}
		>
			{children}
		</div>
	);
};

/** Letter-by-letter kinetic text. */
export const Kinetic: React.FC<{
	text: string;
	delay?: number;
	stagger?: number;
	style?: React.CSSProperties;
	letterStyle?: (i: number) => React.CSSProperties;
}> = ({ text, delay = 0, stagger = 2, style, letterStyle }) => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	return (
		<div style={{ display: 'flex', whiteSpace: 'pre', ...style }}>
			{text.split('').map((ch, i) => {
				const p = spr(f, fps, delay + i * stagger, POP);
				return (
					<span
						key={i}
						style={{
							display: 'inline-block',
							opacity: Math.min(1, p * 1.5),
							transform: `translateY(${(1 - p) * 90}px) scale(${0.6 + p * 0.4})`,
							...letterStyle?.(i),
						}}
					>
						{ch}
					</span>
				);
			})}
		</div>
	);
};

/** Always-on backdrop: drifting glows, faint grid, floating particles, vignette. */
export const Background: React.FC = () => {
	const f = useCurrentFrame();
	const { width, height } = useVideoConfig();
	const gx = Math.sin(f / 140) * 160;
	const gy = Math.cos(f / 170) * 90;
	return (
		<AbsoluteFill style={{ backgroundColor: C.bg, overflow: 'hidden' }}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(700px 700px at ${420 + gx}px ${260 + gy}px, rgba(124,58,237,0.26), transparent 70%),
						radial-gradient(760px 760px at ${1500 - gx}px ${840 - gy}px, rgba(163,230,53,0.14), transparent 70%),
						radial-gradient(500px 500px at ${980 + gy}px ${520 + gx / 2}px, rgba(124,58,237,0.10), transparent 70%)`,
				}}
			/>
			<AbsoluteFill
				style={{
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
					backgroundSize: '80px 80px',
					backgroundPosition: `0px ${(f * 0.25) % 80}px`,
					maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 78%)',
					WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 78%)',
				}}
			/>
			{new Array(70).fill(0).map((_, i) => {
				const size = 2 + random(`s${i}`) * 4;
				const speed = 0.25 + random(`v${i}`) * 0.7;
				const span = height + 80;
				const y = span - ((random(`y${i}`) * span + f * speed) % span) - 40;
				const x = random(`x${i}`) * width + Math.sin(f / 50 + i) * 22;
				const tw = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(f / 18 + i * 2.1));
				const color = i % 3 === 0 ? C.violetSoft : C.lime;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x,
							top: y,
							width: size,
							height: size,
							borderRadius: '50%',
							backgroundColor: color,
							opacity: tw * 0.7,
							boxShadow: `0 0 ${size * 3}px ${color}`,
						}}
					/>
				);
			})}
			<AbsoluteFill
				style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)' }}
			/>
		</AbsoluteFill>
	);
};

export interface PhotoProps {
	size: number;
	delay?: number;
	src?: string;
	initials?: string;
}

/** Photo in a glowing ring with orbiting particles. Displays image if `src` is provided, otherwise falls back to initials. */
export const Photo: React.FC<PhotoProps> = ({
	size,
	delay = 0,
	src,
	initials = 'CF',
}) => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	const p = spr(f, fps, delay, POP);
	const pulse = 0.5 + 0.5 * Math.sin(f / 14);
	const ring = 8;
	const box = size * 1.5;
	return (
		<div
			style={{
				width: box,
				height: box,
				position: 'relative',
				transform: `scale(${p})`,
				opacity: Math.min(1, p * 1.6),
			}}
		>
			{/* soft halo */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					borderRadius: '50%',
					background: `radial-gradient(circle, rgba(163,230,53,${0.2 + pulse * 0.1}) 30%, rgba(124,58,237,0.16) 50%, transparent 68%)`,
				}}
			/>
			{/* thin orbit tracks */}
			{[1.2, 1.4].map((k, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: (box - size * k) / 2,
						top: (box - size * k) / 2,
						width: size * k,
						height: size * k,
						borderRadius: '50%',
						border: `1px solid rgba(255,255,255,${i === 0 ? 0.12 : 0.06})`,
					}}
				/>
			))}
			{/* orbiting particles */}
			{new Array(16).fill(0).map((_, i) => {
				const outer = i % 2 === 1;
				const radius = (size * (outer ? 1.4 : 1.2)) / 2;
				const speed = (outer ? -1 : 1) * (0.018 + random(`o${i}`) * 0.012);
				const a = random(`a${i}`) * Math.PI * 2 + f * speed;
				const s = 5 + random(`p${i}`) * 9;
				const color = i % 3 === 0 ? C.violetSoft : C.lime;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: box / 2 + Math.cos(a) * radius - s / 2,
							top: box / 2 + Math.sin(a) * radius - s / 2,
							width: s,
							height: s,
							borderRadius: '50%',
							backgroundColor: color,
							boxShadow: `0 0 ${s * 2.2}px ${color}`,
							opacity: 0.55 + 0.45 * Math.sin(f / 10 + i),
						}}
					/>
				);
			})}
			{/* rotating gradient ring */}
			<div
				style={{
					position: 'absolute',
					left: (box - size) / 2,
					top: (box - size) / 2,
					width: size,
					height: size,
					borderRadius: '50%',
					background: `conic-gradient(from ${f * 3}deg, ${C.lime}, ${C.violet}, ${C.lime})`,
					boxShadow: `0 0 ${50 + pulse * 30}px rgba(163,230,53,0.45), 0 0 120px rgba(124,58,237,0.35)`,
				}}
			/>
			{/* the photo itself */}
			<div
				style={{
					position: 'absolute',
					left: (box - size) / 2 + ring,
					top: (box - size) / 2 + ring,
					width: size - ring * 2,
					height: size - ring * 2,
					borderRadius: '50%',
					overflow: 'hidden',
					backgroundColor: '#15151c',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{src ? (
					<Img
						src={src.startsWith('http') || src.startsWith('/') ? src : staticFile(src)}
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
				) : (
					<div style={{ fontSize: size * 0.34, fontWeight: 900, ...gradientText() }}>{initials}</div>
				)}
			</div>
		</div>
	);
};

/** Brand logo from a simple-icons entry. */
export const Brand: React.FC<{ icon: { path: string; hex: string }; size: number; color?: string }> = ({
	icon,
	size,
	color,
}) => (
	<svg viewBox="0 0 24 24" width={size} height={size}>
		<path d={icon.path} fill={color ?? `#${icon.hex}`} />
	</svg>
);

/** Simple line icon. */
export const Line: React.FC<{ size: number; color?: string; children: React.ReactNode }> = ({
	size,
	color = C.lime,
	children,
}) => (
	<svg
		viewBox="0 0 24 24"
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeWidth={1.7}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		{children}
	</svg>
);

export const icons = {
	globe: (
		<>
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
		</>
	),
	layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5" />,
	blocks: (
		<>
			<path d="M4 4h7v7H4zM4 13h7v7H4zM13 13h7v7h-7z" />
			<path d="M16.5 4v7M13 7.5h7" />
		</>
	),
	mail: (
		<>
			<path d="M3 6h18v12H3z" />
			<path d="M3 7l9 6.5L21 7" />
			<path d="M14.5 15.5l1.7 1.7 3-3.2" />
		</>
	),
	diamond: (
		<>
			<path d="M6 4h12l4 5-10 11L2 9z" />
			<path d="M2 9h20M9 4L7 9l5 11 5-11-2-5" />
		</>
	),
};

/** Rounded icon tile. */
export const Tile: React.FC<{ size: number; glow?: string; children: React.ReactNode }> = ({
	size,
	glow = 'rgba(163,230,53,0.25)',
	children,
}) => (
	<div
		style={{
			width: size,
			height: size,
			flexShrink: 0,
			borderRadius: size * 0.26,
			background: 'linear-gradient(145deg, rgba(255,255,255,0.09), rgba(255,255,255,0.025))',
			border: `1px solid ${C.line}`,
			boxShadow: `0 0 40px ${glow}, inset 0 1px 0 rgba(255,255,255,0.12)`,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		{children}
	</div>
);
