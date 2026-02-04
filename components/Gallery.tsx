'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import testedFrequencies from '@/types/testedFrequencies';
import Link from 'next/link';
import { Filter } from '@/types';

interface PhotoMetaData {
	index: number;
	fileName: string;
	frequency: number | '???';
	isNote: boolean;
	note?: string;
	noteTuning?: '432Hz' | '440Hz';
	annotation?: string;
	plate: 1 | 2;
	url: string;
}

type Props = {
	query: string;
	filters: Filter[];
	setAmount: Dispatch<SetStateAction<number>>;
};

export default function Gallery({ query, filters, setAmount }: Props) {
	const [photos, setPhotos] = useState<string[]>([]);

	useEffect(() => {
		fetch('/api/photos', { cache: 'force-cache' })
			.then((res) => res.json())
			.then((data) => setPhotos(data));
	}, []);

	const photoMetaData: PhotoMetaData[] = useMemo(() => {
		return photos.map((ph, i) => ({
			url: ph,
			index: i,
			fileName: ph.slice(87, 100),
			frequency: testedFrequencies[i]?.f,
			isNote: !!testedFrequencies[i]?.n,
			annotation: testedFrequencies[i]?.a,
			note: testedFrequencies[i]?.n,
			noteTuning: testedFrequencies[i]?.t,
			plate: testedFrequencies[i].p,
		}));
	}, [photos]);

	const filteredPhotos = useMemo(() => {
		return photoMetaData.filter((ph) => {
			// Query match
			const matchQuery = query.length === 0 || ph.frequency == query;

			// Plate filter
			const plateFilters = filters.filter(
				(f) => f === 'Plate 1' || f === 'Plate 2',
			);
			const matchPlate =
				plateFilters.length === 0 || plateFilters.includes(`Plate ${ph.plate}`);

			// Note filter
			const noteFilters = filters.filter(
				(f) => f === 'Notes (432Hz)' || f === 'Notes (440Hz)',
			);
			const matchNote =
				noteFilters.length === 0 ||
				noteFilters.some((f) => f === `Notes (${ph.noteTuning})`);

			return matchQuery && matchPlate && matchNote;
		});
	}, [photoMetaData, query, filters]);

	useEffect(() => {
		setAmount(filteredPhotos.length);
	}, [filteredPhotos]);

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-4">
			{filteredPhotos.map((photo) => (
				<Link
					key={photo.index}
					href={`/photo/${photoMetaData[photo.index].index}?src=${encodeURIComponent(photo.url)}`}>
					<Image
						width={250}
						height={250}
						src={photo.url}
						alt="Photo"
						loading="lazy"
					/>
					<p>Frequenz: {photoMetaData[photo.index].frequency}</p>
					<p>Platte: {photoMetaData[photo.index].plate}</p>
				</Link>
			))}
		</div>
	);
}
