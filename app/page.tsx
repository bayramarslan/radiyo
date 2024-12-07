"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Hls from "hls.js";
import PlayerController from "./components/PlayerController";

type RadioStation = {
  name: string;
  url: string;
  homepage: string;
  icon: string;
  country: string;
  country_code: string;
};

export default function Home() {
  const radioStations: RadioStation[] = [
    {
      name: "Özel FM",
      url: "https://ozelfm.80.yayin.com.tr/;stream/1",
      homepage: "ozelfm.net",
      icon: "/images/logo/ozelfm-logo.jpg",
      country: "Türkiye",
      country_code: "TR",
    },
    {
      name: "Diyanet Radyo",
      url: "https://eustr73.mediatriple.net/videoonlylive/mtikoimxnztxlive/broadcast_5e3c1171d7d2a.smil/playlist.m3u8",
      homepage: "diyanetradyo.com",
      icon: "/images/logo/diyanet-radyo.jpg",
      country: "Türkiye",
      country_code: "TR",
    },
    {
      name: "Diyanet Kur'an Radyo",
      url: "https://eustr73.mediatriple.net/videoonlylive/mtikoimxnztxlive/broadcast_5e3c14192aa92.smil/playlist.m3u8",
      homepage: "diyanetkuranradyo.com",
      icon: "/images/logo/diyanet-kuran-radyo.jpg",
      country: "Türkiye",
      country_code: "TR",
    },
    {
      name: "Diyanet Risalet Radyo",
      url: "https://eustr76.mediatriple.net/videoonlylive/mtikoimxnztxlive/broadcast_5e3c1520b2626.smil/playlist.m3u8",
      homepage: "risaletradyo.com",
      icon: "/images/logo/diyanet-risalet-radyo.jpg",
      country: "Türkiye",
      country_code: "TR",
    },
    {
      name: "Vav Radyo",
      url:"https://trkvz-radyolar.ercdn.net/radyovav/playlist.m3u8", 
      homepage:"vavtv.com.tr",
      icon:"/images/logo/vav-radyo.jpg",
      country:"Türkiye",
      country_code:"TR",
    },
    {
      name: "Erkam Radyo",
      url:"https://api-tv5.yayin.com.tr:8002/mp3", 
      homepage:"erkamradyo.com",
      icon:"/images/logo/erkam-radyo.jpg",
      country:"Türkiye",
      country_code:"TR",
    },
  ];

  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(
    null
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);

  const playStream = (station: RadioStation) => {
    if (currentAudio) {
      setIsPlay(false);
      currentAudio.pause();
      currentAudio.src = "";
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
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen select-none">
      <div className="dark:bg-white/5 bg-black/5 rounded-lg p-3 mx-4 mt-4 flex flex-row justify-between items-center">
        <p className="">radiyo.vercel.app</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 256 256"
          data-darkreader-inline-fill=""
        >
          <path d="M104,168a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H96A8,8,0,0,1,104,168Zm-8-40H64a8,8,0,0,0,0,16H96a8,8,0,0,0,0-16Zm0-32H64a8,8,0,0,0,0,16H96a8,8,0,0,0,0-16ZM232,80V192a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V72a8,8,0,0,1,5.7-7.66l160-48a8,8,0,0,1,4.6,15.33L86.51,64H216A16,16,0,0,1,232,80ZM216,192V80H40V192H216Zm-16-56a40,40,0,1,1-40-40A40,40,0,0,1,200,136Zm-16,0a24,24,0,1,0-24,24A24,24,0,0,0,184,136Z"></path>
        </svg>
      </div>
      <main className="flex flex-col space-y-2 p-4">
        {radioStations.map((station, index) => (
          <RadiyoItem
            key={index}
            station={station}
            onClick={() => playStream(station)}
            isActive={currentStation?.name === station.name}
          />
        ))}
      </main>

      {currentStation && (
        <div className="dark:bg-white/5 bg-black/5 p-3">
          <PlayerController
            isPlay={isPlay}
            handlePlay={handlePlay}
            handlePause={handlePause}
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
    className={`border hover:border-lime-800/40 transition-all hover:bg-lime-800/10 dark:border-white/15 border-black/15 rounded-lg flex items-center gap-3 w-full overflow-hidden ${
      isActive ? "bg-lime-500/15" : ""
    }`}
    onClick={onClick}
  >
    <Image
      src={station.icon}
      width={60}
      height={60}
      alt={`${station.name} Logo`}
    />
    <div className="flex flex-col items-start space-y-0.5">
      <p className="font-bold dark:text-lime-200 text-lime-800">
        {station.name}
      </p>
      <p className="dark:text-gray-400 text-gray-500 text-sm truncate sm:w-full w-64 text-left">
        {station.homepage}
      </p>
    </div>
  </button>
);
