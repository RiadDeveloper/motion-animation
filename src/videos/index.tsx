import React from 'react';
import {Composition, Folder} from 'remotion';
import {EmptyPlaceholder} from './EmptyPlaceholder';

// Video imports will be registered here as new videos are created.
// Example:
// import {MyVideo, MY_VIDEO_CONFIG} from './my-video';

export const VideoCompositions: React.FC = () => {
	return (
		<Folder name="Videos">
			<Composition
				id="Welcome"
				component={EmptyPlaceholder}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>

			{/* When a new video is generated in src/videos/<video-name>, add its Composition here */}
		</Folder>
	);
};
