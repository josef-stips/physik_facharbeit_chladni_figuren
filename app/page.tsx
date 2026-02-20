import Card from '@/components/Card';
import Quote from '@/components/Quote';

export default function Home() {
	return (
		<div className="min-h-screen flex justify-center pt-24 sm:pt-32 lg:pt-[8vh]">
			<main className="w-full max-w-5xl px-6 flex flex-col items-center gap-[6vh]">
				<div className="flex flex-col gap-6 items-center text-center">
					<h1 className="text-6xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
						Chladnische Klangfiguren
					</h1>
					<p className="max-w-md text-xl leading-8 text-zinc-600 dark:text-zinc-400">
						Die geheimen Botschaften des Universums
					</p>
				</div>

				<p className="text-xl leading-8 text-zinc-600 dark:text-zinc-400 text-center">
					Chladni Figuren sind wahrlich einer der faszinierensten Beobachtungen
					der Physik. Sie wurden nach &quot;Ernst Florens Friedrich
					Chladni&quot; benannt, der sie um 1800 in Europa bekannt machte. Erst
					bis zum Jahre 1909 wurde die theoretische Grundlage für Chladnische
					Klangfiguren vollständig erarbeitet und seit dem nur vereinzelt
					aufgegriffen was die Figuren bis heute interessant macht. Sie
					entstehen auf einer mit Sand oder Salz bestreuten Platte die mit einer
					Frequenz resoniert. Jede Frequenz besitzt ihre eigene einzigartige
					Chladni-Figur wobei die Figuren umso komplexer werden umso höher die
					Frequenz ist.
				</p>

				<div className="flex flex-col gap-10 sm:flex-row justify-center">
					<Card title="Experiment Aufbau" />
					<Card title="Datenbank" />
					<Card title="Facharbeit" />
				</div>

				<div className="mt-[1vh] pb-[6vh]">
					<Quote />
				</div>
			</main>
		</div>
	);
}
