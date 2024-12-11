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
    <main className="flex flex-col">
      {stations
        .filter(({ active }) => active)
        .map((station, index) => (
          <PlayerItem
            key={index}
            station={station}
            onClick={() => playStream(station)}
            isActive={currentStation === station}
            isPlay={isPlay}
          />
        ))}
    </main>
  );
}
