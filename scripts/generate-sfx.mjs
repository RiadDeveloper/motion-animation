import {writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sfxDir = join(root, 'public', 'sfx');
if (!existsSync(sfxDir)) mkdirSync(sfxDir, {recursive: true});

const SR = 44100;

function writeWav(samples, sampleRate = SR) {
	const buffer = Buffer.alloc(44 + samples.length * 2);
	buffer.write('RIFF', 0);
	buffer.writeUInt32LE(36 + samples.length * 2, 4);
	buffer.write('WAVE', 8);
	buffer.write('fmt ', 12);
	buffer.writeUInt32LE(16, 16);
	buffer.writeUInt16LE(1, 20); // PCM
	buffer.writeUInt16LE(1, 22); // Mono
	buffer.writeUInt32LE(sampleRate, 24);
	buffer.writeUInt32LE(sampleRate * 2, 28);
	buffer.writeUInt16LE(2, 32);
	buffer.writeUInt16LE(16, 34);
	buffer.write('data', 36);
	buffer.writeUInt32LE(samples.length * 2, 40);

	for (let i = 0; i < samples.length; i++) {
		const s = Math.max(-1, Math.min(1, samples[i]));
		buffer.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
	}
	return buffer;
}

// =========================================================================
// 1. TRANSITION & WHOOSH GENERATORS
// =========================================================================

export function makeWhooshFast() {
	const duration = 0.32;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const p = t / duration;
		const env = Math.sin(Math.PI * p);
		const freq = 200 + 750 * Math.sin(Math.PI * p);
		phase += (2 * Math.PI * freq) / SR;
		const noise = (Math.random() * 2 - 1) * 0.5;
		samples[i] = (Math.sin(phase) * 0.5 + noise) * env * 0.9;
	}
	return samples;
}

export function makeWhooshCinematic() {
	const duration = 0.75;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const p = t / duration;
		const env = Math.sin(Math.PI * p);
		const freq = 120 + 480 * Math.sin(Math.PI * p);
		phase += (2 * Math.PI * freq) / SR;
		const noise = (Math.random() * 2 - 1) * 0.4;
		samples[i] = (Math.sin(phase) * 0.6 + noise) * env * 0.85;
	}
	return samples;
}

export function makeLaserSwoosh() {
	const duration = 0.45;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const p = t / duration;
		const env = Math.sin(Math.PI * p);
		const freq = 1400 * Math.exp(-6 * p) + 120;
		phase += (2 * Math.PI * freq) / SR;
		samples[i] = Math.sin(phase) * env * 0.9;
	}
	return samples;
}

// =========================================================================
// 2. IMPACTS & BASS DROPS
// =========================================================================

export function makeImpactHeavy() {
	const duration = 1.4;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const env = Math.exp(-3.2 * t);
		const freq = 34 + 160 * Math.exp(-19 * t);
		phase += (2 * Math.PI * freq) / SR;
		const raw = Math.sin(phase);
		samples[i] = Math.tanh(raw * 2.5) * env * 0.95;
	}
	return samples;
}

export function makeImpactPunch() {
	const duration = 0.45;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const env = Math.exp(-9 * t);
		const freq = 60 + 220 * Math.exp(-25 * t);
		phase += (2 * Math.PI * freq) / SR;
		samples[i] = Math.sin(phase) * env * 0.9;
	}
	return samples;
}

export function makeBassDrop() {
	const duration = 1.9;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const env = Math.exp(-1.8 * t);
		const freq = Math.max(28, 140 - (t / duration) * 110);
		phase += (2 * Math.PI * freq) / SR;
		samples[i] = Math.sin(phase) * env * 0.95;
	}
	return samples;
}

// =========================================================================
// 3. POPS, CLICKS & KEYBOARD
// =========================================================================

export function makePopClean() {
	const duration = 0.14;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const env = Math.exp(-28 * t);
		const freq = 140 + 750 * Math.exp(-36 * t);
		phase += (2 * Math.PI * freq) / SR;
		samples[i] = Math.sin(phase) * env * 0.95;
	}
	return samples;
}

export function makePopWarm() {
	const duration = 0.22;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const env = Math.exp(-18 * t);
		const freq = 100 + 450 * Math.exp(-22 * t);
		phase += (2 * Math.PI * freq) / SR;
		samples[i] = Math.sin(phase) * env * 0.9;
	}
	return samples;
}

export function makeClickDigital() {
	const duration = 0.035;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const env = Math.exp(-110 * t);
		phase += (2 * Math.PI * 2600) / SR;
		samples[i] = Math.sin(phase) * env * 0.85;
	}
	return samples;
}

export function makeTypewriter() {
	const duration = 0.055;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const env = Math.exp(-90 * t);
		const noise = (Math.random() * 2 - 1) * 0.6;
		const clickTone = Math.sin(2 * Math.PI * 1800 * t) * 0.4;
		samples[i] = (noise + clickTone) * env * 0.9;
	}
	return samples;
}

// =========================================================================
// 4. ACCENTS & METRIC SOUNDS (Coin Ding, Camera Shutter, Bell Chime)
// =========================================================================

export function makeCoinDing() {
	// Resonant metallic cash/coin ring for financial milestones & top-ups
	const duration = 0.85;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	const freqs = [1975.5, 2349.3, 3135.9]; // B6, D7, G7
	const phases = [0, 0, 0];
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const env = Math.exp(-5.5 * t);
		let sum = 0;
		for (let h = 0; h < freqs.length; h++) {
			phases[h] += (2 * Math.PI * freqs[h]) / SR;
			sum += Math.sin(phases[h]) * (0.4 - h * 0.1);
		}
		samples[i] = sum * env * 0.9;
	}
	return samples;
}

export function makeCameraShutter() {
	// Dual-click camera aperture snapshot for profile photos / avatar reveals
	const duration = 0.22;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		// Click 1 at 0ms, Click 2 at 70ms
		const env1 = t < 0.07 ? Math.exp(-120 * t) : 0;
		const env2 = t >= 0.07 ? Math.exp(-100 * (t - 0.07)) : 0;
		const noise = (Math.random() * 2 - 1);
		const tone = Math.sin(2 * Math.PI * 2200 * t);
		samples[i] = (noise * 0.7 + tone * 0.3) * (env1 + env2 * 0.8) * 0.85;
	}
	return samples;
}

export function makeChimeSparkle() {
	const duration = 1.1;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
	const phases = [0, 0, 0, 0];
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const env = Math.exp(-3.6 * t);
		let sum = 0;
		for (let h = 0; h < freqs.length; h++) {
			phases[h] += (2 * Math.PI * freqs[h]) / SR;
			sum += Math.sin(phases[h]) * (0.35 - h * 0.06);
		}
		const shimmer = 0.8 + 0.2 * Math.sin(2 * Math.PI * 8 * t);
		samples[i] = sum * env * shimmer * 0.85;
	}
	return samples;
}

export function makeRiserTension() {
	const duration = 1.8;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	let phase = 0;
	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const p = t / duration;
		const env = Math.pow(p, 1.8);
		const freq = 100 + 720 * Math.pow(p, 2.2);
		phase += (2 * Math.PI * freq) / SR;
		const pulse = 0.7 + 0.3 * Math.sin(2 * Math.PI * 12 * t);
		const noise = (Math.random() * 2 - 1) * 0.15;
		samples[i] = (Math.sin(phase) + noise) * pulse * env * 0.8;
	}
	return samples;
}

// =========================================================================
// 5. MASTER SOUNDTRACKS (Upbeat 120BPM Electronic, Chill Lo-Fi, Cinematic)
// =========================================================================

export function makeElectronicBeat() {
	const duration = 60.0;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	const bpm = 120;
	const beatSec = 60 / bpm;
	const sixteenthSec = beatSec / 4;
	const rootFreqs = [110, 87.31, 130.81, 97.99]; // Am, F, C, G
	let bassPhase = 0;
	let arpPhase = 0;

	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const bar = Math.floor(t / (beatSec * 4));
		const chordIdx = bar % rootFreqs.length;
		const rootFreq = rootFreqs[chordIdx];
		const beatTime = t % beatSec;
		const sixteenthTime = t % sixteenthSec;

		let kick = 0;
		if (beatTime < 0.22) {
			const kEnv = Math.exp(-22 * beatTime);
			const kFreq = 45 + 130 * Math.exp(-35 * beatTime);
			kick = Math.sin(2 * Math.PI * kFreq * beatTime) * kEnv * 0.7;
		}

		let snare = 0;
		const beatInBar = (t % (beatSec * 4)) / beatSec;
		const isSnareBeat = (beatInBar >= 1 && beatInBar < 1.3) || (beatInBar >= 3 && beatInBar < 3.3);
		if (isSnareBeat && beatTime < 0.2) {
			const sEnv = Math.exp(-20 * beatTime);
			const sNoise = (Math.random() * 2 - 1) * 0.6;
			const sBody = Math.sin(2 * Math.PI * 180 * beatTime) * 0.4;
			snare = (sNoise + sBody) * sEnv * 0.55;
		}

		let hat = 0;
		if (sixteenthTime < 0.05) {
			const hEnv = Math.exp(-95 * sixteenthTime);
			hat = (Math.random() * 2 - 1) * hEnv * 0.22;
		}

		let bass = 0;
		const bassTime = beatTime % (beatSec / 2);
		const bassEnv = Math.exp(-12 * bassTime);
		bassPhase += (2 * Math.PI * rootFreq) / SR;
		const bassRaw = Math.sin(bassPhase) + 0.4 * Math.sin(bassPhase * 2) + 0.2 * Math.sin(bassPhase * 3);
		bass = Math.tanh(bassRaw * 1.5) * bassEnv * 0.38;

		let arp = 0;
		const step = Math.floor((t % beatSec) / sixteenthSec);
		const intervals = [1, 1.25, 1.5, 1.875];
		const arpFreq = rootFreq * 4 * intervals[step % intervals.length];
		arpPhase += (2 * Math.PI * arpFreq) / SR;
		arp = Math.sin(arpPhase) * Math.exp(-16 * sixteenthTime) * 0.18;

		let masterFade = 1;
		if (t < 2.0) masterFade = t / 2.0;
		if (t > duration - 2.5) masterFade = Math.max(0, (duration - t) / 2.5);

		samples[i] = (kick + snare + hat + bass + arp) * masterFade * 0.85;
	}
	return samples;
}

export function makeLofiBeat() {
	const duration = 60.0;
	const count = Math.floor(duration * SR);
	const samples = new Float32Array(count);
	const bpm = 85;
	const beatSec = 60 / bpm; // ~0.705s
	const chordFreqs = [174.61, 220, 261.63]; // Fmaj7 feel
	let chordPhase = [0, 0, 0];

	for (let i = 0; i < count; i++) {
		const t = i / SR;
		const beatTime = t % beatSec;

		// Soft dusty kick on 1 and 3
		let kick = 0;
		const beatInBar = (t % (beatSec * 4)) / beatSec;
		if ((beatInBar < 0.3 || (beatInBar >= 2 && beatInBar < 2.3)) && beatTime < 0.25) {
			kick = Math.sin(2 * Math.PI * 55 * beatTime) * Math.exp(-14 * beatTime) * 0.65;
		}

		// Snare on 2 and 4
		let snare = 0;
		if (((beatInBar >= 1 && beatInBar < 1.3) || (beatInBar >= 3 && beatInBar < 3.3)) && beatTime < 0.22) {
			snare = (Math.random() * 2 - 1) * Math.exp(-18 * beatTime) * 0.35;
		}

		// Vinyl crackle noise bed
		const crackle = Math.random() < 0.003 ? (Math.random() * 2 - 1) * 0.15 : 0;

		// Soft Rhodes chord
		let chord = 0;
		for (let c = 0; c < chordFreqs.length; c++) {
			chordPhase[c] += (2 * Math.PI * chordFreqs[c]) / SR;
			chord += Math.sin(chordPhase[c]) * 0.08;
		}

		let masterFade = 1;
		if (t < 2.0) masterFade = t / 2.0;
		if (t > duration - 2.5) masterFade = Math.max(0, (duration - t) / 2.5);

		samples[i] = (kick + snare + chord + crackle) * masterFade * 0.85;
	}
	return samples;
}

// =========================================================================
// REGISTRY & CLI DISPATCH
// =========================================================================

const soundRegistry = {
	// Transitions
	'whoosh-fast.wav': makeWhooshFast,
	'whoosh-cinematic.wav': makeWhooshCinematic,
	'whoosh.wav': makeWhooshCinematic,
	'laser-swoosh.wav': makeLaserSwoosh,

	// Impacts
	'impact-heavy.wav': makeImpactHeavy,
	'impact-punch.wav': makeImpactPunch,
	'impact.wav': makeImpactHeavy,
	'bass-drop.wav': makeBassDrop,

	// Pops & Clicks
	'pop-clean.wav': makePopClean,
	'pop-warm.wav': makePopWarm,
	'pop.wav': makePopClean,
	'click-digital.wav': makeClickDigital,
	'click.wav': makeClickDigital,
	'typewriter.wav': makeTypewriter,

	// Accents & Milestones
	'coin-ding.wav': makeCoinDing,
	'shutter.wav': makeCameraShutter,
	'chime-sparkle.wav': makeChimeSparkle,
	'chime.wav': makeChimeSparkle,
	'riser.wav': makeRiserTension,
	'riser-tension.wav': makeRiserTension,

	// Soundtracks
	'beat.wav': makeElectronicBeat,
	'beat-electronic.wav': makeElectronicBeat,
	'beat-lofi.wav': makeLofiBeat,
};

// If run with custom argument: node scripts/generate-sfx.mjs custom <filename.wav> <type>
const args = process.argv.slice(2);
if (args[0] === 'custom' && args[1]) {
	const filename = args[1].endsWith('.wav') ? args[1] : `${args[1]}.wav`;
	const type = args[2] || 'pop';
	console.log(`Generating custom audio: ${filename} (type: ${type})...`);
	let gen = soundRegistry[`${type}.wav`] || makePopClean;
	const samples = gen();
	const wav = writeWav(samples);
	writeFileSync(join(sfxDir, filename), wav);
	console.log(`✓ Custom audio created: public/sfx/${filename} (${(wav.length / 1024).toFixed(1)} KB)`);
	process.exit(0);
}

// Default run: generate complete studio sound palette
console.log('Generating complete CineFlow studio sound library...');
for (const [name, fn] of Object.entries(soundRegistry)) {
	const samples = fn();
	const wav = writeWav(samples);
	writeFileSync(join(sfxDir, name), wav);
	console.log(`✓ Generated public/sfx/${name} (${(wav.length / 1024).toFixed(1)} KB)`);
}
console.log('All studio sounds synthesized and ready!');
