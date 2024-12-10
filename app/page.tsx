"use client";
import { useState, useRef } from "react";
import Hls from "hls.js";
import PlayerController from "./components/PlayerController";
import radioStations from "./data/radioStations.json";
import Header from "./components/Header";
import RadioItem from "./components/RadioItem";

export default function Home() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null,
  );
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(
    null,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);

  const playStream = (station: RadioStation) => {
    if (currentAudio) {
      setIsPlay(false);
      currentAudio.pause();
      currentAudio.src = "";
      if (station === currentStation) {
        setCurrentStation(null);
        setCurrentAudio(null);
        return;
      }
    }

    const audioElement = new Audio();
    audioElement.controls = true;
    audioElement.autoplay = true;
    setCurrentAudio(audioElement);
    setCurrentStation(station);

    if (Hls.isSupported() && station.url.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(station.url);
      hls.attachMedia(audioElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audioElement
          .play()
          .catch((err) => console.error("Radyo çalınamadı:", err));
      });
    } else {
      audioElement.src = station.url;
      audioElement
        .play()
        .catch((err) => console.error("Radyo çalınamadı:", err));
    }

    setIsPlay(true);
    audioRef.current = audioElement;
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlay(false);
      setCurrentStation(null);
      setCurrentAudio(null);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      setIsPlay(true);
      audioRef.current
        .play()
        .catch((err) => console.error("Radyo çalınamadı:", err));
    }
  };

  return (
    <div className="grid min-h-dvh select-none grid-rows-[auto_1fr_auto]">
      <Header isPlay={isPlay} />
      <main className="flex flex-col overflow-auto">
        {radioStations.map((station: RadioStation, index) => (
          <RadioItem
            key={index}
            station={station}
            onClick={() => playStream(station)}
            isActive={currentStation?.name === station.name}
          />
        ))}
      </main>

      {currentStation && (
        <PlayerController
          isPlay={isPlay}
          handlePlay={handlePlay}
          handlePause={handlePause}
          station={currentStation}
        />
      )}
    </div>
  );
}
