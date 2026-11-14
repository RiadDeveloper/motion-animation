import {readdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const videosDir = join(root, 'src', 'videos');

if (!existsSync(videosDir)) {
	console.error('Videos directory not found:', videosDir);
	process.exit(1);
}

const entries = readdirSync(videosDir, {withFileTypes: true});
const videoFiles = [];

for (const entry of entries) {
	if (entry.isFile() && entry.name.endsWith('.tsx')) {
		if (entry.name !== 'index.tsx' && entry.name !== 'EmptyPlaceholder.tsx' && !entry.name.startsWith('test-')) {
			videoFiles.push(entry.name.replace(/\.tsx$/, ''));
		}
	}
}

console.log(`[CineFlow Discovery] Found ${videoFiles.length} video composition(s) in src/videos/:`, videoFiles);
console.log(`[CineFlow Discovery] src/videos/index.tsx auto-registers all videos dynamically via Webpack. Zero file modification needed.`);
