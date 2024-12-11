import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function usePlayer() {
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(
    null,
  );
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Helper function to initialize audio element
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

  // Helper function to clean up audio element
  const cleanUpAudioElement = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current.remove();
      audioRef.current = null;
    }
  };

  // Helper function to destroy HLS instance
  const destroyHlsInstance = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  };

  // Initialize audio and HLS setup on component mount
  useEffect(() => {
    initializeAudioElement();
    return () => {
      cleanUpAudioElement();
      destroyHlsInstance();
    };
  }, []);

  // Function to play stream
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

  // Function to handle pause
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

  // Function to handle direct play
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
