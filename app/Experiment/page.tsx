'use client';

import PageTitle from '@/components/PageTitle';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Experiment() {
	return (
		<div className="mt-20 px-4 flex justify-center w-full flex-col items-center">
			<PageTitle title="Experiment Aufbau" />
			<Instructions />
		</div>
	);
}

function Instructions() {
	const [files, setFiles] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('/api/experimentPhotos')
			.then((res) => res.json())
			.then((data) => {
				setFiles(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	const formatName = (file: string) => {
		return file.split('/').pop()?.split('.')[0].replace(/_/g, ' ') || '';
	};

	return (
		<section className="w-full max-w-6xl mt-10 sm:mt-14 md:mt-20 flex flex-col items-center">
			<p className="font-bold text-lg sm:text-xl mb-6">Benötigt:</p>

			{loading && <p className="text-gray-500">Lade Bilder...</p>}

			{!loading && files.length === 0 && (
				<p className="text-gray-500">Keine Bilder gefunden.</p>
			)}

			<div
				className="
          w-full
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6 sm:gap-8 md:gap-10
          px-2 sm:px-4
        ">
				{files.map((file) => (
					<div
						key={file}
						className="
              flex flex-col items-center
              bg-white dark:bg-neutral-900
              rounded-xl
              shadow-md
              p-3 sm:p-4
              hover:scale-[1.02]
              transition-all
            ">
						<div className="relative w-full aspect-square">
							<Image
								alt={formatName(file)}
								src={file}
								fill
								className="object-contain rounded-lg"
								sizes="(max-width: 640px) 90vw,
                       (max-width: 1024px) 45vw,
                       25vw"
							/>
						</div>

						<p className="mt-3 text-center text-sm sm:text-base capitalize">
							{formatName(file)}
						</p>
					</div>
				))}
			</div>

			<p className="font-bold text-lg sm:text-xl mt-6 mb-6">Anleitung:</p>

			<p className="mb-[12vh]">
				Bohre in die Mitte der Aluminiumplatte ein Loch, das genau dem
				Durchmesser einer Welle entspricht. Nimm anschließend ein
				zylinderförmiges oder rechteckiges Objekt und bohre auch durch dessen
				Mitte ein passendes Loch. Stecke nun die Welle durch das Loch des
				Objekts und befestige sie mit einer Mutter, sodass die Welle fest mit
				dem Objekt verbunden ist. Klebe dieses Objekt anschließend mittig auf
				den Lautsprecher. Danach befestigst du die Aluminiumplatte: Stecke sie
				über die herausragende Welle und fixiere sie ebenfalls mit einer Mutter.
				Verbinde den Lautsprecher nun mit einem isolierten Kupferkabel mit einem
				Bluetooth-Audioverstärker. Lade dir auf einem Gerät eine App zur
				Frequenz­erzeugung herunter und verbinde das Gerät per Bluetooth mit dem
				Verstärker. Streue anschließend Salz auf die Aluminiumplatte – und
				genieße die entstehenden Chladni-Figuren.
			</p>
		</section>
	);
}
