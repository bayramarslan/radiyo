"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Hls from "hls.js";
import PlayerController from "./components/PlayerController";
import radioStations from "./data/radioStations.json";

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
    <div className="grid max-h-dvh select-none grid-rows-[auto_auto_auto]">
      {/* navbar */}
      <div className="mx-4 mb-2 mt-6 flex flex-1 flex-row items-center overflow-hidden rounded-lg border border-white/10 bg-black/5 dark:bg-white/5">
        <div className="flex items-center">
          <div className="mr-3 flex h-12 w-[60px] items-center justify-center bg-orange-600">
            <svg
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
            >
              <g transform="matrix(1.19999965 0 0 1.19999965 3.135861 -1208.242317)">
                <path
                  d="m19 12c0 1.971-.838 3.862-2.3 5.188-.287.261-.647.39-1.008.39-.408 0-.814-.166-1.11-.492-.557-.613-.511-1.562.103-2.118.836-.76 1.315-1.841 1.315-2.968 0-1.13-.478-2.21-1.31-2.965-.614-.556-.661-1.505-.104-2.119.556-.615 1.504-.661 2.118-.104 1.459 1.322 2.296 3.213 2.296 5.188zm1.514-8.466c-.584-.587-1.535-.589-2.121-.005-.588.584-.59 1.534-.006 2.122 1.685 1.692 2.613 3.947 2.613 6.349 0 2.396-.93 4.649-2.618 6.347-.584.587-.582 1.537.006 2.121.292.291.675.437 1.058.437.385 0 .771-.147 1.063-.442 2.251-2.264 3.491-5.269 3.491-8.463 0-3.2-1.238-6.207-3.486-8.466zm-8.514 6.653c-1.003 0-1.812.809-1.812 1.813 0 1 .81 1.813 1.813 1.813s1.812-.813 1.812-1.813c0-1.004-.81-1.813-1.813-1.813zm-2.581-3.273c-.557-.614-1.505-.66-2.119-.103-1.462 1.326-2.3 3.218-2.3 5.189 0 1.977.837 3.867 2.297 5.188.287.26.647.388 1.006.388.409 0 .816-.166 1.113-.493.556-.614.508-1.563-.106-2.119-.832-.753-1.31-1.833-1.31-2.964 0-1.127.479-2.208 1.316-2.967.614-.557.66-1.506.103-2.119zm-6.419 5.086c0-2.396.93-4.649 2.618-6.346.584-.587.583-1.537-.005-2.121-.586-.585-1.536-.582-2.121.005-2.252 2.262-3.492 5.268-3.492 8.462 0 3.199 1.238 6.206 3.486 8.466.293.295.678.442 1.063.442.383 0 .765-.146 1.058-.437.587-.584.589-1.534.005-2.121-1.684-1.694-2.612-3.949-2.612-6.35z"
                  fill="#fce2e0"
                  transform="matrix(1.1805559 0 0 1.1805559 3.220117 1012.702)"
                />
              </g>
            </svg>
          </div>
          <p className="">radiyo.vercel.app</p>
        </div>
        <div className="ml-auto flex px-3 text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 9H2V7h5zm0 3H2v2h5zm13.59 7l-3.83-3.83c-.8.52-1.74.83-2.76.83c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3M2 19h10v-2H2z"
            />
          </svg>
        </div>
      </div>

      {/* radio list */}
      <main className="flex flex-col space-y-2 overflow-auto p-4">
        {radioStations.map((station, index) => (
          <RadiyoItem
            key={index}
            station={station}
            onClick={() => playStream(station)}
            isActive={currentStation?.name === station.name}
          />
        ))}
      </main>

      {/* media control */}
      {currentStation && (
        <div className="sticky bottom-0 z-10 flex flex-1 items-center bg-black/5 backdrop-blur-3xl dark:bg-white/10">
          <PlayerController
            isPlay={isPlay}
            handlePlay={handlePlay}
            handlePause={handlePause}
            station={currentStation}
          />
        </div>
      )}
    </div>
  );
}

const RadiyoItem = ({
  station,
  onClick,
  isActive,
}: {
  station: RadioStation;
  onClick: () => void;
  isActive: boolean;
}) => (
  <button
    data-active={isActive}
    className={`flex w-full items-center overflow-hidden rounded-lg border border-black/15 bg-white/30 transition-all hover:bg-white/10 data-[active=true]:border-orange-500/60 data-[active=true]:bg-white/60 dark:bg-white/5 data-[active=true]:dark:border-white/20 data-[active=true]:dark:bg-white/10`}
    onClick={onClick}
  >
    <Image
      src={station.icon}
      width={60}
      height={60}
      alt={`${station.name} Logo`}
      className="mr-3"
    />
    <div className="flex flex-1 items-center">
      <div className="flex flex-1 flex-col items-start">
        <p className="font-bold">{station.name}</p>
        <p className="w-64 truncate text-left text-sm text-gray-500 sm:w-full dark:text-gray-400">
          {station.homepage}
        </p>
      </div>
      <div className="flex px-4 text-orange-600 dark:text-zinc-500">
        {isActive && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M2 6c0-1.886 0-2.828.586-3.414S4.114 2 6 2s2.828 0 3.414.586S10 4.114 10 6v12c0 1.886 0 2.828-.586 3.414S7.886 22 6 22s-2.828 0-3.414-.586S2 19.886 2 18zm12 0c0-1.886 0-2.828.586-3.414S16.114 2 18 2s2.828 0 3.414.586S22 4.114 22 6v12c0 1.886 0 2.828-.586 3.414S19.886 22 18 22s-2.828 0-3.414-.586S14 19.886 14 18z"
            />
          </svg>
        )}
        {!isActive && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
            />
          </svg>
        )}
      </div>
    </div>
  </button>
);
