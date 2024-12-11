import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

type PlayerControllerProps = {
  isPlay: boolean;
  handlePlay: () => void;
  handlePause: () => void;
  station: RadioStation;
};

const PlayerController: React.FC<PlayerControllerProps> = ({
  isPlay,
  handlePlay,
  handlePause,
  station,
}) => {
  return (
    <div className="sticky bottom-0 flex flex-row items-center justify-between gap-2 border-t-4 border-secondary bg-primary/30 px-4 py-3 backdrop-blur-3xl">
      <div className="flex items-center justify-center">
        <Image
          src={station.icon}
          width={50}
          height={50}
          alt={`${station.name} Logo`}
          className="mr-3 rounded-lg"
        />
        <div className="">
          <p className="line-clamp-2 font-bold">{station.name}</p>
          <p className="line-clamp-1 text-sm text-foreground/70">
            {station.homepage}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 text-foreground/70">
        {isPlay && (
          <button
            onClick={handlePause}
            className="flex size-12 items-center justify-center rounded-lg p-3.5 transition-all hover:bg-secondary/50"
          >
            <IconPlayerPauseFilled className="text-foreground/80" />
          </button>
        )}
        {!isPlay && (
          <button
            onClick={handlePlay}
            className="flex size-12 items-center justify-center rounded-lg p-3.5 transition-all hover:bg-secondary/50"
          >
            <IconPlayerPlayFilled className="text-foreground/80" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerController;
