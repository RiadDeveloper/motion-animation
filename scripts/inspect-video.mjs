import {execSync} from 'node:child_process';
import {existsSync} from 'node:fs';

const filePath = process.argv[2];

if (!filePath) {
	console.error('Usage: node scripts/inspect-video.mjs <video-file-path>');
	process.exit(1);
}

if (!existsSync(filePath)) {
	console.error(`File not found: ${filePath}`);
	process.exit(1);
}

try {
	const raw = execSync(
		`npx remotion ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`,
		{encoding: 'utf-8'}
	);
	const data = JSON.parse(raw);
	const videoStream = data.streams?.find((s) => s.codec_type === 'video');
	const audioStream = data.streams?.find((s) => s.codec_type === 'audio');

	let fps = 30;
	if (videoStream?.r_frame_rate) {
		const [num, den] = videoStream.r_frame_rate.split('/').map(Number);
		if (den && num) fps = Math.round(num / den);
	}

	const durationSec = Number(data.format?.duration || videoStream?.duration || 0);
	const durationFrames30 = Math.round(durationSec * 30);
	const durationFramesNative = Math.round(durationSec * fps);

	const info = {
		path: filePath,
		width: videoStream?.width ?? 1920,
		height: videoStream?.height ?? 1080,
		aspectRatio: (videoStream?.width ?? 1920) / (videoStream?.height ?? 1080) > 1 ? '16:9 Landscape' : '9:16 Vertical',
		fps,
		durationSeconds: durationSec,
		durationFramesAt30Fps: durationFrames30,
		durationFramesAtNativeFps: durationFramesNative,
		hasAudio: !!audioStream,
		videoCodec: videoStream?.codec_name,
		audioCodec: audioStream?.codec_name,
	};

	console.log(JSON.stringify(info, null, 2));
} catch (err) {
	console.error('Failed to inspect video:', err.message);
	process.exit(1);
}
