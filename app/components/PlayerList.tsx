import PlayerItem from "@/components/PlayerItem";

interface PlayerListProps {
	stations: RadioStation[];
	currentStation: RadioStation | null;
	playStream: (station: RadioStation) => void;
	isPlay: boolean;
}

export default function PlayerList({
	stations,
	currentStation,
	playStream,
	isPlay,
}: PlayerListProps) {
	return (
		<main className="flex flex-col overflow-hidden">
			{stations.map((station, index) => (
				<PlayerItem
					key={index}
					station={station}
					playStream={playStream}
					currentStation={currentStation}
					isActive={currentStation === station}
					isPlay={isPlay}
				/>
			))}
		</main>
	);
}
