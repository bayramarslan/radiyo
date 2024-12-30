import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export default function usePlayer() {
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(
    null,
  );
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const initializeAudioElement = () => {
    const audioElement = document.createElement("audio");
    audioElement.id = "audio-player";
    audioElement.preload = "none";
    audioElement.controls = false;
    document.body.appendChild(audioElement);
    audioRef.current = audioElement;

    audioRef.current.addEventListener("play", () => setIsPlay(true));
    audioRef.current.addEventListener("pause", () => setIsPlay(false));
  };

  const cleanUpAudioElement = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current.remove();
      audioRef.current = null;
    }
  };

  const destroyHlsInstance = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  };

  useEffect(() => {
    initializeAudioElement();
    return () => {
      cleanUpAudioElement();
      destroyHlsInstance();
    };
  }, []);

  const playStream = (station: RadioStation) => {
    if (!audioRef.current) return;

    if (isPlay && currentStation === station) {
      handlePause(station);
      return;
    }

    setCurrentStation(station);
    setIsPlay(true);

    if (Hls.isSupported() && station.url.endsWith(".m3u8")) {
      destroyHlsInstance();

      const hls = new Hls();
      hls.loadSource(station.url);
      hls.attachMedia(audioRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, async () => {
        try {
          await audioRef.current?.play();
        } catch (err) {
          console.error("Failed to play radio:", err);
        }
      });

      hlsRef.current = hls;
    } else {
      audioRef.current.src = station.url;
      audioRef.current
        .play()
        .catch((err) => console.error("Failed to play radio:", err));
    }
  };

  const handlePause = (station: RadioStation) => {
    setIsPlay(false);

    if (!audioRef.current) return;

    if (station === currentStation) {
      destroyHlsInstance();
      audioRef.current.pause();
    } else {
      audioRef.current.pause();
    }

    audioRef.current.src = "";
  };

  const handlePlay = async () => {
    if (!audioRef.current) return;

    setIsPlay(true);

    try {
      await audioRef.current.play();
    } catch (err) {
      console.error("Failed to play radio:", err);
    }
  };

  return {
    isPlay,
    currentStation,
    playStream,
    handlePause,
    handlePlay,
  };
}
