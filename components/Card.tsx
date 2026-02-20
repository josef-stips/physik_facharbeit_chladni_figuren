import { CardTopic } from '@/types';
import { ReactNode } from 'react';
import { FaDatabase } from 'react-icons/fa';
import { GiLightningFrequency } from 'react-icons/gi';
import { TbMathPiDivide2 } from 'react-icons/tb';

interface Props {
	title: CardTopic;
}

export default function Card({ title }: Props) {
	const renderIcon = (topic: CardTopic): ReactNode => {
		switch (topic) {
			case 'Experiment Aufbau':
				return <GiLightningFrequency size={'12vh'} />;
			case 'Datenbank':
				return <FaDatabase size={'12vh'} />;

			case 'Facharbeit':
				return <TbMathPiDivide2 size={'12vh'} />;
		}
	};

	const renderHref = (
		topic: CardTopic,
	): { href: string; download?: boolean } => {
		switch (topic) {
			case 'Experiment Aufbau':
				return { href: 'Experiment/' };
			case 'Datenbank':
				return { href: 'Database/' };
			case 'Facharbeit':
				return { href: '/file.svg', download: true };
			default:
				return { href: '#' };
		}
	};

	const { href, download } = renderHref(title);

	return (
		<div className="rounded-xl box-border w-[33vh] h-[33vh] bg-gray border-3 border-white hover:scale-110 transition-transform duration-300">
			<a
				href={href}
				{...(download ? { download: true } : {})}
				className="w-full h-full flex items-center justify-center flex-col gap-12">
				<big className="font-bold">{title}</big>
				{renderIcon(title)}
			</a>
		</div>
	);
}
