import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'static', 'logo.webp');

const icons = [
	{ file: 'icon-32.png', size: 32 },
	{ file: 'icon-192.png', size: 192 },
	{ file: 'icon-512.png', size: 512 },
	{ file: 'apple-touch-icon.png', size: 180 }
];

for (const { file, size } of icons) {
	await sharp(source)
		.resize(size, size, { fit: 'cover' })
		.png()
		.toFile(path.join(root, 'static', file));
	console.log(`wrote static/${file} (${size}x${size})`);
}
