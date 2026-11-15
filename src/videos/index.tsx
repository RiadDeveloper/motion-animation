import React from 'react';
import {Composition, Folder} from 'remotion';
import {EmptyPlaceholder} from './EmptyPlaceholder';

declare const require: {
	context: (
		directory: string,
		useSubdirectories: boolean,
		regExp: RegExp
	) => {
		keys: () => string[];
		(id: string): any;
	};
};

// Webpack require.context automatically discovers all .tsx files in this folder
// NO manual imports or file changes needed in index.tsx ever!
// @ts-ignore
const videoReq = require.context('./', true, /\.tsx$/);

const discoveredVideos = videoReq
	.keys()
	.filter((k: string) => k !== './index.tsx' && !k.endsWith('EmptyPlaceholder.tsx'))
	.map((key: string) => {
		const mod = videoReq(key);
		const fileName = key.replace(/^\.\//, '').replace(/\/index\.tsx$/, '').replace(/\.tsx$/, '');
		const conf =
			mod.config ||
			mod.CONFIG ||
			Object.values(mod).find(
				(x: any) => x && typeof x === 'object' && 'durationInFrames' in x && 'fps' in x
			) || {};
		const Comp =
			mod.default ||
			Object.values(mod).find((x: any) => typeof x === 'function' && x !== mod.default) ||
			EmptyPlaceholder;

		return {
			id: (conf as any).id || fileName,
			component: Comp as React.FC,
			durationInFrames: (conf as any).durationInFrames || 300,
			fps: (conf as any).fps || 30,
			width: (conf as any).width || 1920,
			height: (conf as any).height || 1080,
		};
	});

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
			{discoveredVideos.map((vid) => (
				<Composition
					key={vid.id}
					id={vid.id}
					component={vid.component}
					durationInFrames={vid.durationInFrames}
					fps={vid.fps}
					width={vid.width}
					height={vid.height}
				/>
			))}
		</Folder>
	);
};
