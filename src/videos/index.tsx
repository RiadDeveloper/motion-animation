import React from 'react';
import {Composition, Folder} from 'remotion';
import {EmptyPlaceholder} from './EmptyPlaceholder';
import {DemoCompositions} from './samples';

export const VideoCompositions: React.FC = () => {
	return (
		<>
			<Folder name="Videos">
				<Composition
					id="Welcome"
					component={EmptyPlaceholder}
					durationInFrames={150}
					fps={30}
					width={1920}
					height={1080}
				/>
			</Folder>

			<DemoCompositions />
		</>
	);
};
