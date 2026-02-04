'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import Gallery from '../Gallery';
import SearchBar from '../SearchBar';
import { Filter } from '@/types';

interface FilterBtnsProps {
	setFilters: Dispatch<SetStateAction<Filter[]>>;
	filters: Filter[];
	amount: number;
}

export default function GallerySearch() {
	const [query, setQuery] = useState<string>('');
	const [filters, setFilters] = useState<Filter[]>([]);
	const [amount, setAmount] = useState<number>(0);

	return (
		<div className="flex justify-center w-full">
			<div className="w-[70vw] max-w-7xl">
				<SearchBar query={query} setQuery={setQuery} />

				<FilterBtns setFilters={setFilters} filters={filters} amount={amount} />

				<Gallery query={query} filters={filters} setAmount={setAmount} />
			</div>
		</div>
	);
}

function FilterBtns({ setFilters, filters, amount }: FilterBtnsProps) {
	const alterFilters = (filter: Filter) => {
		console.log(filters.includes(filter));

		if (filters.includes(filter)) {
			setFilters((prev) => prev.filter((f) => f !== filter));
			return;
		}

		setFilters((prev) => [...prev, filter]);
	};

	const getButtonClass = (filter: Filter) =>
		`cursor-pointer transition-colors ${
			filters.includes(filter)
				? 'text-blue-300'
				: 'text-gray-400 hover:text-gray-500'
		}`;

	return (
		<div className="flex flex-row gap-12 w-full items-center justify-between mt-4">
			<p className="font-medium">Filter:</p>

			<div className="gap-8 flex">
				<button
					className={getButtonClass('Plate 1')}
					onClick={() => alterFilters('Plate 1')}>
					Platte 1 (Kleine dicke Platte)
				</button>
				<button
					className={getButtonClass('Plate 2')}
					onClick={() => alterFilters('Plate 2')}>
					Platte 2 (Große dünne Platte)
				</button>
				<button
					className={getButtonClass('Notes (432Hz)')}
					onClick={() => alterFilters('Notes (432Hz)')}>
					Noten (432Hz Tuning)
				</button>
				<button
					className={getButtonClass('Notes (440Hz)')}
					onClick={() => alterFilters('Notes (440Hz)')}>
					Noten (440Hz Tuning)
				</button>
			</div>

			<p className="font-medium">Anzahl: {amount}</p>
		</div>
	);
}
