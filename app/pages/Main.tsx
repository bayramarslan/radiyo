"use client";
import Header from "@/components/Header";
import PlayerController from "@/components/PlayerController";
import PlayerList from "@/components/PlayerList";
import radioStations from "@/data/radioStations.json";
import usePlayer from "@/hooks/usePlayer";
import { useState } from "react";

const getSortedStations = (): RadioStation[] =>
  radioStations
    .filter((station) => station.active)
    .sort((a, b) => a.name.localeCompare(b.name));

export default function Main() {
  const { isPlay, currentStation, playStream } = usePlayer();

  const [filteredStations, setFilteredStations] =
    useState<RadioStation[]>(getSortedStations());

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

  if (!filteredStations) return;

  return (
    <div className="grid min-h-dvh select-none grid-rows-[auto_1fr_auto]">
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
        />
      )}
    </div>
  );
}
