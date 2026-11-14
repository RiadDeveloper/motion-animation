import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background, C, FONT, gradientText, Kinetic, Rise} from '../ui';

export const EmptyPlaceholder: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT, color: C.text}}>
			<Background />
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 24,
				}}
			>
				<Kinetic
					text="MOTION STUDIO READY"
					delay={10}
					stagger={2}
					style={{
						fontSize: 84,
						fontWeight: 900,
						letterSpacing: 2,
						...gradientText(C.lime, C.violetSoft),
					}}
				/>
				<Rise delay={30} dist={30}>
					<div
						style={{
							fontSize: 32,
							color: C.dim,
							fontWeight: 500,
							letterSpacing: 1,
						}}
					>
						Tell Antigravity which video you would like to create.
					</div>
				</Rise>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
