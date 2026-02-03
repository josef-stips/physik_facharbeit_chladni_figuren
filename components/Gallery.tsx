'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import testedFrequencies from '@/types/testesFrequencies';

interface PhotoMetaData {
	fileName: string;
	frequency: number | '???';
	isNote: boolean;
	note?: string;
	noteTuning?: string;
	annotation?: string;
}

export default function Gallery() {
	const [photos, setPhotos] = useState<string[]>([]);

	useEffect(() => {
		fetch('/api/photos')
			.then((res) => res.json())
			.then((data) => setPhotos(data));
	}, []);

	const photoMetaData: PhotoMetaData[] = photos.map((ph, i) => ({
		fileName: ph.slice(87, 100),
		frequency: testedFrequencies[i]?.f,
		isNote: !!testedFrequencies[i]?.n,
		annotation: testedFrequencies[i]?.a,
		note: testedFrequencies[i]?.n,
		noteTuning: testedFrequencies[i]?.t,
	}));

	return (
		<div className="grid grid-cols-3 gap-4">
			{photos.map((url, i) => (
				<div key={url}>
					<Image
						width={200}
						height={200}
						src={url}
						alt="Photo"
						className="w-full h-auto object-cover"
					/>
					<p>{photoMetaData[i]?.frequency}</p>
				</div>
			))}
		</div>
	);
}
