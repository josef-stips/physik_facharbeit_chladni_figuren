import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const photosDir = path.join(process.cwd(), 'public/photos');

	const files = fs.readdirSync(photosDir);

	const photoUrls = files.map((file) => `/photos/${file}`);

	res.status(200).json(photoUrls);
}
