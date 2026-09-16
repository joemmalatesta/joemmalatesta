import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { filmImages, filmSlug } from '../src/lib/film';

const root = path.resolve(process.cwd());

async function main() {
	let made = 0;
	for (const image of filmImages) {
		const input = path.join(root, 'static', image.source.replace(/^\//, ''));
		const outRel = path.join('images/thumbnails', image.category, `${filmSlug(image)}.webp`);
		const output = path.join(root, 'static', outRel);
		if (!fs.existsSync(input)) {
			console.warn('missing', image.source);
			continue;
		}
		fs.mkdirSync(path.dirname(output), { recursive: true });
		let quality = 62;
		let buffer = await sharp(input).resize(96, 96, { fit: 'cover' }).webp({ quality }).toBuffer();
		while (buffer.length > 12_000 && quality > 28) {
			quality -= 8;
			buffer = await sharp(input).resize(96, 96, { fit: 'cover' }).webp({ quality }).toBuffer();
		}
		fs.writeFileSync(output, buffer);
		made += 1;
		console.log(`${outRel} ${(buffer.length / 1024).toFixed(1)}kb`);
	}
	console.log(`wrote ${made} thumbnails`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
