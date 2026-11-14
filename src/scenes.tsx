import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {
	siDart,
	siFlutter,
	siGithub,
	siGo,
	siInstagram,
	siJavascript,
	siNodedotjs,
	siOpenjdk,
	siPython,
	siTypescript,
} from 'simple-icons';
import {
	Brand,
	C,
	clamp,
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
} from './ui';

const col: React.CSSProperties = {display: 'flex', flexDirection: 'column', alignItems: 'center'};
const row: React.CSSProperties = {display: 'flex', flexDirection: 'row', alignItems: 'center'};

/* ───────────── SCENE 1 — THE REVEAL ───────────── */
export const Scene1: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const bar = spr(f, fps, 70);
	return (
		<Scene fadeIn={false}>
			<AbsoluteFill style={{opacity: interpolate(f, [0, 12], [0, 1], clamp)}}>
				<div style={{...col, justifyContent: 'center', height: '100%'}}>
					<Photo size={340} delay={4} />
					<Kinetic
						text="RIAD DEVELOPER"
						delay={34}
						stagger={2}
						style={{
							fontSize: 132,
							fontWeight: 900,
							letterSpacing: 4,
							lineHeight: 1,
							marginTop: -20,
						}}
						letterStyle={(i) =>
							i > 4
								? {color: C.lime, textShadow: '0 0 40px rgba(163,230,53,0.55)'}
								: {color: C.text}
						}
					/>
					<div
						style={{
							width: 520 * bar,
							height: 4,
							borderRadius: 2,
							marginTop: 28,
							background: `linear-gradient(90deg, ${C.lime}, ${C.violet})`,
							boxShadow: '0 0 20px rgba(163,230,53,0.6)',
						}}
					/>
					<Rise delay={82} dist={30} style={{marginTop: 28}}>
						<div style={{fontSize: 36, fontWeight: 500, color: C.dim, letterSpacing: 1}}>
							Full Stack Developer • MIT App Inventor Extension Developer
						</div>
					</Rise>
				</div>
			</AbsoluteFill>
		</Scene>
	);
};

/* ───────────── SCENE 2 — WHO I AM ───────────── */
export const Scene2: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const lines = [
		{icon: icons.globe, text: 'Professional Web Developer', at: 22},
		{icon: icons.layers, text: 'Full Stack Developer', at: 80},
		{
			icon: icons.blocks,
			text: 'MIT App Inventor Extension Developer & Community Contributor',
			at: 138,
		},
	];
	const rail = spr(f, fps, 14);
	return (
		<Scene>
			<div style={{...row, alignItems: 'stretch', gap: 56}}>
				<div
					style={{
						width: 5,
						borderRadius: 3,
						background: `linear-gradient(180deg, ${C.lime}, ${C.violet})`,
						boxShadow: '0 0 24px rgba(163,230,53,0.5)',
						transform: `scaleY(${rail})`,
						transformOrigin: 'top',
					}}
				/>
				<div style={{display: 'flex', flexDirection: 'column', gap: 64, padding: '20px 0'}}>
					{lines.map((l, i) => (
						<Rise key={i} delay={l.at} from="left" dist={140}>
							<div style={{...row, gap: 40}}>
								<Tile
									size={112}
									glow={i === 1 ? 'rgba(124,58,237,0.4)' : 'rgba(163,230,53,0.25)'}
								>
									<Line size={58} color={i === 1 ? C.violetSoft : C.lime}>
										{l.icon}
									</Line>
								</Tile>
								<div style={{fontSize: 50, fontWeight: 800, letterSpacing: -0.5}}>{l.text}</div>
							</div>
						</Rise>
					))}
				</div>
			</div>
		</Scene>
	);
};

/* ───────────── SCENE 3 — GITHUB ───────────── */
const Stat: React.FC<{value: number; suffix: string; label: string; delay: number}> = ({
	value,
	suffix,
	label,
	delay,
}) => {
	const f = useCurrentFrame();
	const n = Math.round(
		interpolate(f, [delay + 6, delay + 62], [0, value], {
			...clamp,
			easing: Easing.out(Easing.cubic),
		}),
	);
	return (
		<Rise delay={delay}>
			<div
				style={{
					...col,
					width: 520,
					padding: '34px 0 30px',
					borderRadius: 32,
					background: C.card,
					border: `1px solid ${C.line}`,
				}}
			>
				<div
					style={{
						fontSize: 120,
						fontWeight: 900,
						lineHeight: 1,
						fontVariantNumeric: 'tabular-nums',
						...gradientText(),
					}}
				>
					{n}
					{suffix}
				</div>
				<div style={{fontSize: 34, fontWeight: 500, color: C.dim, marginTop: 12}}>{label}</div>
			</div>
		</Rise>
	);
};

export const Scene3: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const logo = spr(f, fps, 16, POP);
	const badges = ['Pull Shark', 'Quickdraw', 'YOLO'];
	const glow = 0.5 + 0.5 * Math.sin((f - 176) / 9);
	return (
		<Scene>
			<div style={{...col, gap: 40}}>
				<div style={{...row, gap: 44}}>
					<div
						style={{
							transform: `scale(${logo}) rotate(${(1 - logo) * -90}deg)`,
							filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.35))',
							display: 'flex',
						}}
					>
						<Brand icon={siGithub} size={150} color="#FFFFFF" />
					</div>
					<Kinetic
						text="@RiadDeveloper"
						delay={28}
						stagger={1.5}
						style={{fontSize: 124, fontWeight: 900, letterSpacing: -2, lineHeight: 1.1}}
						letterStyle={(i) => (i === 0 ? {color: C.lime} : {})}
					/>
				</div>

				<div style={{...row, gap: 40}}>
					<Stat value={41} suffix="+" label="Repositories" delay={56} />
					<Stat value={10} suffix="" label="Programming Languages" delay={68} />
				</div>

				<div style={{...row, gap: 22, height: 76}}>
					{badges.map((b, i) => (
						<React.Fragment key={b}>
							{i > 0 ? (
								<Rise delay={128 + i * 14} from="scale">
									<div style={{fontSize: 36, color: C.dim}}>•</div>
								</Rise>
							) : null}
							<Rise delay={130 + i * 14} from="scale">
								<div
									style={{
										...row,
										gap: 14,
										padding: '16px 34px',
										borderRadius: 999,
										fontSize: 34,
										fontWeight: 700,
										background: 'rgba(124,58,237,0.16)',
										border: '1px solid rgba(167,139,250,0.5)',
									}}
								>
									<div
										style={{
											width: 14,
											height: 14,
											borderRadius: '50%',
											background: C.lime,
											boxShadow: `0 0 14px ${C.lime}`,
										}}
									/>
									{b}
								</div>
							</Rise>
						</React.Fragment>
					))}
				</div>

				<Rise delay={182} from="scale">
					<div
						style={{
							...row,
							gap: 18,
							padding: '20px 44px',
							borderRadius: 999,
							fontSize: 38,
							fontWeight: 800,
							color: C.bg,
							background: C.lime,
							boxShadow: `0 0 ${40 + glow * 50}px rgba(163,230,53,${0.5 + glow * 0.35})`,
						}}
					>
						<Brand icon={siGithub} size={40} color={C.bg} />
						GitHub Developer Program Member
					</div>
				</Rise>
			</div>
		</Scene>
	);
};

/* ───────────── SCENE 4 — MY PROJECTS ───────────── */
const projects = [
	{
		name: 'PyRunner',
		desc: 'Run & edit any Python project on your Android phone',
		tag: 'Flutter • Python 3.13',
		icon: <Brand icon={siPython} size={62} color="#FFD43B" />,
	},
	{
		name: 'FollowBoost',
		desc: 'My own Instagram growth & rewards app',
		icon: <Brand icon={siInstagram} size={60} />,
	},
	{
		name: 'Valid-Email-Checker',
		desc: 'Fast email validation tool',
		icon: (
			<Line size={64} color={C.lime}>
				{icons.mail}
			</Line>
		),
	},
	{
		name: 'Aixfy',
		desc: 'Go CLI toolchain for building App Inventor extensions',
		icon: <Brand icon={siGo} size={70} />,
	},
];

export const Scene4: React.FC = () => {
	const f = useCurrentFrame();
	return (
		<Scene>
			<div style={{...col, gap: 44}}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '840px 840px',
						gap: 36,
					}}
				>
					{projects.map((p, i) => {
						const at = 24 + i * 62;
						// A light sweep crosses each card as it lands.
						const sweep = interpolate(f, [at + 10, at + 50], [-40, 140], clamp);
						return (
							<Rise key={p.name} delay={at} from={i % 2 === 0 ? 'left' : 'right'} dist={220}>
								<div
									style={{
										...row,
										gap: 34,
										height: 250,
										padding: '0 40px',
										borderRadius: 34,
										position: 'relative',
										overflow: 'hidden',
										background: `linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.02))`,
										border: `1px solid ${C.line}`,
										boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 0,
											background: `linear-gradient(105deg, transparent ${sweep - 18}%, rgba(163,230,53,0.14) ${sweep}%, transparent ${sweep + 18}%)`,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 0,
											top: 40,
											bottom: 40,
											width: 5,
											borderRadius: 3,
											background: i % 2 === 0 ? C.lime : C.violet,
											boxShadow: `0 0 20px ${i % 2 === 0 ? C.lime : C.violet}`,
										}}
									/>
									<Tile
										size={124}
										glow={i % 2 === 0 ? 'rgba(163,230,53,0.22)' : 'rgba(124,58,237,0.4)'}
									>
										{p.icon}
									</Tile>
									<div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
										<div style={{fontSize: 52, fontWeight: 900, letterSpacing: -1}}>{p.name}</div>
										<div
											style={{fontSize: 30, fontWeight: 500, color: '#D4D4D8', lineHeight: 1.3}}
										>
											{p.desc}
										</div>
										{p.tag ? (
											<div
												style={{
													alignSelf: 'flex-start',
													marginTop: 4,
													padding: '6px 18px',
													borderRadius: 999,
													fontSize: 24,
													fontWeight: 700,
													color: C.lime,
													background: 'rgba(163,230,53,0.1)',
													border: '1px solid rgba(163,230,53,0.4)',
												}}
											>
												{p.tag}
											</div>
										) : null}
									</div>
								</div>
							</Rise>
						);
					})}
				</div>

				<Rise delay={300} dist={30}>
					<div
						style={{
							...row,
							gap: 22,
							padding: '22px 46px',
							borderRadius: 999,
							background: 'rgba(124,58,237,0.14)',
							border: '1px solid rgba(167,139,250,0.45)',
							boxShadow: '0 0 60px rgba(124,58,237,0.3)',
						}}
					>
						<Line size={48} color={C.lime}>
							{icons.diamond}
						</Line>
						<div style={{fontSize: 38, fontWeight: 500, color: '#E4E4E7'}}>
							<span style={{fontWeight: 900, color: C.lime}}>dreamtopup.com</span> — My own Free
							Fire diamond top-up platform
						</div>
					</div>
				</Rise>
			</div>
		</Scene>
	);
};

/* ───────────── SCENE 5 — TECH STACK ───────────── */
const stack = [
	{name: 'Flutter', icon: siFlutter, color: '#54C5F8'},
	{name: 'Dart', icon: siDart, color: '#2CB7F6'},
	{name: 'Python', icon: siPython, color: '#FFD43B'},
	{name: 'TypeScript', icon: siTypescript, color: '#3178C6'},
	{name: 'JavaScript', icon: siJavascript, color: '#F7DF1E'},
	{name: 'Java', icon: siOpenjdk, color: '#F89820'},
	{name: 'Go', icon: siGo, color: '#00ADD8'},
	{name: 'Node.js', icon: siNodedotjs, color: '#6CC24A'},
];

export const Scene5: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	return (
		<Scene>
			<AbsoluteFill>
				{/* orbit path */}
				<div
					style={{
						position: 'absolute',
						left: 960 - 700,
						top: 520 - 350,
						width: 1400,
						height: 700,
						borderRadius: '50%',
						border: '1px dashed rgba(255,255,255,0.09)',
						opacity: spr(f, fps, 14),
					}}
				/>
				{stack.map((s, i) => {
					const p = spr(f, fps, 18 + i * 6, POP);
					const a = (i / stack.length) * Math.PI * 2 - Math.PI / 2 + f * 0.0065;
					const spread = 1 + (1 - p) * 0.5;
					const x = 960 + Math.cos(a) * 700 * spread;
					const y = 520 + Math.sin(a) * 350 * spread + Math.sin(f / 22 + i * 1.7) * 12;
					return (
						<div
							key={s.name}
							style={{
								...col,
								position: 'absolute',
								left: x - 100,
								top: y - 85,
								width: 200,
								gap: 12,
								opacity: Math.min(1, p * 1.5),
								transform: `scale(${0.4 + p * 0.6})`,
							}}
						>
							<Tile size={128} glow={`${s.color}44`}>
								<Brand icon={s.icon} size={70} color={s.color} />
							</Tile>
							<div style={{fontSize: 26, fontWeight: 700, color: '#D4D4D8'}}>{s.name}</div>
						</div>
					);
				})}
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', top: -20}}>
					<Rise delay={74} from="scale">
						<div
							style={{
								fontSize: 72,
								fontWeight: 900,
								textAlign: 'center',
								lineHeight: 1.15,
								letterSpacing: -1.5,
								width: 760,
							}}
						>
							Fluent across
							<br />
							<span style={gradientText()}>mobile, web & backend</span>
						</div>
					</Rise>
				</AbsoluteFill>
			</AbsoluteFill>
		</Scene>
	);
};

/* ───────────── SCENE 6 — THE NUMBERS ───────────── */
export const Scene6: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const LAND = 84;
	const v = interpolate(f, [20, LAND], [0, 3], {...clamp, easing: Easing.out(Easing.cubic)});
	const shown = f >= LAND ? '3' : v.toFixed(1);
	const punch = spr(f, fps, LAND, {damping: 9, mass: 0.6, stiffness: 160});
	const ringP = interpolate(f, [LAND, LAND + 34], [0, 1], clamp);
	return (
		<Scene>
			<div style={{...col}}>
				<div style={{position: 'relative', ...col}}>
					{/* shockwave when the counter lands */}
					<div
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							width: 300,
							height: 300,
							marginLeft: -150,
							marginTop: -150,
							borderRadius: '50%',
							border: `3px solid ${C.lime}`,
							transform: `scale(${0.4 + ringP * 4})`,
							opacity: f < LAND ? 0 : (1 - ringP) * 0.7,
						}}
					/>
					<Rise delay={16} from="scale">
						<div
							style={{
								fontSize: 250,
								fontWeight: 900,
								lineHeight: 1,
								letterSpacing: -6,
								fontVariantNumeric: 'tabular-nums',
								transform: `scale(${1 + (f >= LAND ? (1 - punch) * 0.12 : 0)})`,
								filter: 'drop-shadow(0 0 50px rgba(163,230,53,0.45))',
							}}
						>
							<span style={gradientText(C.lime, '#D9F99D')}>{shown} Crore+</span>
						</div>
					</Rise>
				</div>
				<Rise delay={42} dist={30} style={{marginTop: 22}}>
					<div style={{fontSize: 68, fontWeight: 800, letterSpacing: -1}}>
						BDT Net Worth — <span style={{color: C.violetSoft}}>Self-Made</span>
					</div>
				</Rise>
				<Rise delay={104} dist={30} style={{marginTop: 46}}>
					<div style={{fontSize: 42, fontWeight: 500, color: C.dim, letterSpacing: 0.5}}>
						Built from scratch. No shortcuts.
					</div>
				</Rise>
			</div>
		</Scene>
	);
};

/* ───────────── SCENE 7 — CLOSING / CONTACT ───────────── */
export const Scene7: React.FC = () => {
	const f = useCurrentFrame();
	const contacts = [
		{
			text: 'github.com/RiadDeveloper',
			icon: <Brand icon={siGithub} size={38} color="#FFFFFF" />,
		},
		{
			text: 'riaddeveloper.is-a-good.dev',
			icon: (
				<Line size={38} color={C.lime}>
					{icons.globe}
				</Line>
			),
		},
		{
			text: 'riaddeveloperr@gmail.com',
			icon: (
				<Line size={38} color={C.violetSoft}>
					{icons.mail}
				</Line>
			),
		},
	];
	const OUT = 176;
	const main = interpolate(f, [OUT, OUT + 14], [1, 0], clamp);
	const outro = interpolate(f, [OUT + 12, OUT + 36], [0, 1], {
		...clamp,
		easing: Easing.out(Easing.cubic),
	});
	const glow = 0.5 + 0.5 * Math.sin((f - OUT) / 10);
	return (
		<Scene fadeOut={false}>
			<AbsoluteFill
				style={{
					...col,
					justifyContent: 'center',
					opacity: main,
					transform: `scale(${1 + (1 - main) * 0.06})`,
					filter: main < 0.99 ? `blur(${(1 - main) * 12}px)` : undefined,
				}}
			>
				<Photo size={230} delay={12} />
				<Rise delay={28} dist={30} style={{marginTop: -22}}>
					<div style={{fontSize: 88, fontWeight: 900, letterSpacing: -2, lineHeight: 1.1}}>
						Riad Developer
					</div>
				</Rise>
				<div style={{...col, gap: 16, marginTop: 28}}>
					{contacts.map((c, i) => (
						<Rise key={c.text} delay={52 + i * 20} dist={30}>
							<div
								style={{
									...row,
									gap: 18,
									width: 700,
									padding: '13px 32px',
									borderRadius: 999,
									background: C.card,
									border: `1px solid ${C.line}`,
									fontSize: 36,
									fontWeight: 500,
								}}
							>
								{c.icon}
								{c.text}
							</div>
						</Rise>
					))}
				</div>
				<Rise delay={122} from="scale" style={{marginTop: 36}}>
					<div style={{fontSize: 54, fontWeight: 900, letterSpacing: -1, ...gradientText()}}>
						I build. I ship. I keep building.
					</div>
				</Rise>
			</AbsoluteFill>

			{/* clean outro: the name alone with a lime glow */}
			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					opacity: outro,
					transform: `scale(${0.92 + outro * 0.08})`,
				}}
			>
				<div
					style={{
						fontSize: 170,
						fontWeight: 900,
						letterSpacing: -4,
						color: C.text,
						textShadow: `0 0 ${30 + glow * 30}px rgba(163,230,53,0.9), 0 0 ${90 + glow * 60}px rgba(163,230,53,0.55)`,
					}}
				>
					Riad Developer
				</div>
				<div
					style={{
						width: 420 * outro,
						height: 5,
						borderRadius: 3,
						marginTop: 10,
						background: C.lime,
						boxShadow: `0 0 30px ${C.lime}`,
					}}
				/>
			</AbsoluteFill>
		</Scene>
	);
};
