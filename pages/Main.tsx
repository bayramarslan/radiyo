import Header from "@/components/Header";
import PlayerController from "@/components/PlayerController";
import PlayerList from "@/components/PlayerList";
import radioStations from "@/data/radioStations.json";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";

const getSortedStations = (): RadioStation[] =>
	radioStations
		.filter((station) => station.active)
		.sort((a, b) => a.name.localeCompare(b.name));

export default function Main() {
	const { isPlay, currentStation, playStream } = usePlayer();
	const allStations = getSortedStations();
	const [nextStation, setNextStation] = useState<RadioStation | undefined>();
	const [prevStation, setPrevStation] = useState<RadioStation | undefined>();

	const [filteredStations, setFilteredStations] =
		useState<RadioStation[]>(allStations);

	useEffect(() => {
		if (!currentStation) return;
		const currentIndex = filteredStations.indexOf(currentStation);
		const nextStation =
			filteredStations[currentIndex + 1] || filteredStations[0];
		const prevStation =
			filteredStations[currentIndex - 1] ||
			filteredStations[filteredStations.length - 1];

		setNextStation(nextStation);
		setPrevStation(prevStation);
	}, [currentStation, filteredStations]);

	const handleSearchChange = (searchTerm: string = "") => {
		if (searchTerm.trim().length === 0) {
			setFilteredStations(getSortedStations());
			return;
		}

		const result = getSortedStations().filter(
			(station) =>
				station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				station.homepage.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		setFilteredStations(result);
	};

	if (!filteredStations) return null;

	return (
		<div className="grid min-h-dvh grid-rows-[auto_1fr_auto] select-none">
			<Header isPlay={isPlay} onSearchChange={handleSearchChange} />
			<PlayerList
				stations={filteredStations}
				currentStation={currentStation}
				playStream={playStream}
				isPlay={isPlay}
			/>
			{currentStation && (
				<PlayerController
					isPlay={isPlay}
					playStream={playStream}
					station={currentStation}
					nextStation={nextStation}
					prevStation={prevStation}
				/>
			)}
		</div>
	);
}
