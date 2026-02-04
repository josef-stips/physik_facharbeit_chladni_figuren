interface Props {
	query: string;
	setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery }: Props) {
	return (
		<div className="flex justify-center my-6">
			<div className="w-full max-w-xl p-4 rounded-xl shadow-sm">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search frequencies, notes..."
					className="
						w-full
						px-4 py-2
						rounded-lg
						border 
						focus:outline-none
						focus:ring-2
					"
				/>
			</div>
		</div>
	);
}
