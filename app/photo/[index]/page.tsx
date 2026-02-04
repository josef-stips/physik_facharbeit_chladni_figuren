'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import testedFrequencies, { Plattentyp } from '@/types/testedFrequencies';
import { use } from 'react';
import PageTitle from '@/components/PageTitle';

interface PageProps {
	params: Promise<{ index: string }>;
}

export default function Page({ params }: PageProps) {
	const { index } = use(params);
	const searchParams = useSearchParams();

	const imageUrl = searchParams?.get('src');

	const i = Number(index);
	const data = testedFrequencies[i];

	if (!data || !imageUrl) {
		return <p>Photo not found</p>;
	}

	return (
		<div className="flex flex-col items-center mt-[12vh]">
			<PageTitle title={`Einzelnes Foto, F: ${data.f}Hz`} />

			<div className="flex flex-col items-center gap-6 mt-6">
				<Image src={imageUrl} width={600} height={600} alt="Photo" />

				<div className="flex flex-col gap-2 text-left">
					<p>Platte: {Plattentyp[data.p]}</p>

					{data.n && <p>Note: {data.n}</p>}

					{data.t && <p>Tuning: {data.t}</p>}

					<p>Frequenz: {data.f} Hz</p>

					{data.a && <p>Anmerkung: {data.a}</p>}
				</div>
			</div>
		</div>
	);
}
