'use client';

interface Props {
	title: string;
}

export default function PageTitle({ title }: Props) {
	return <h1 className="text-5xl font-bold text-center">{title}</h1>;
}
