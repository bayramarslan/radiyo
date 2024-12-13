import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

type PlayerControllerProps = {
  isPlay: boolean;
  playStream: (station: RadioStation) => void;
  station: RadioStation;
};

const PlayerController: React.FC<PlayerControllerProps> = ({
  isPlay,
  playStream,
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
          <p className="line-clamp-2 font-bold">
            <span className="xs:hidden block">{station.name}</span>
            <span className="xs:block hidden">{station.shortname}</span>
          </p>
          <p className="line-clamp-1 text-sm text-foreground/70">
            {station.homepage}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 text-foreground/70">
        {isPlay && (
          <button
            onClick={() => playStream(station)}
            className="flex size-12 items-center justify-center rounded-lg p-3.5 outline-secondary/50 transition-all hover:bg-secondary/50"
          >
            <IconPlayerPauseFilled className="text-foreground/80" />
          </button>
        )}
        {!isPlay && (
          <button
            onClick={() => playStream(station)}
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
