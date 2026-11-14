// Detects the optional photo and music files in /public and records them in
// src/assets.json so the video can use them (or fall back gracefully).
import {existsSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
if (!existsSync(pub)) mkdirSync(pub);

const files = readdirSync(pub);
const find = (name, exts) =>
	files.find((f) => new RegExp(`^${name}\\.(${exts})$`, 'i').test(f)) ?? null;

const assets = {
	photo: find('photo', 'jpg|jpeg|png|webp'),
	music: find('music', 'mp3|wav|m4a|aac'),
};

writeFileSync(join(root, 'src', 'assets.json'), JSON.stringify(assets, null, 2) + '\n');
console.log(
	`photo: ${assets.photo ?? 'NOT FOUND (using initials placeholder)'} | music: ${assets.music ?? 'none (silent)'}`,
);
