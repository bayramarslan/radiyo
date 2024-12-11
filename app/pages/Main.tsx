"use client";
import Header from "@/components/Header";
import PlayerController from "@/components/PlayerController";
import PlayerList from "@/components/PlayerList";
import radioStations from "@/data/radioStations.json";
import usePlayer from "@/hooks/usePlayer";

export default function Main() {
  const { isPlay, currentStation, playStream } = usePlayer();

  return (
    <div className="grid min-h-dvh select-none grid-rows-[auto_1fr_auto]">
      <Header isPlay={isPlay} />
      <PlayerList
        stations={radioStations}
        currentStation={currentStation}
        playStream={playStream}
        isPlay={isPlay}
      />
      {currentStation && (
        <PlayerController
          isPlay={isPlay}
          playStream={playStream}
          station={currentStation}
        />
      )}
    </div>
  );
}
