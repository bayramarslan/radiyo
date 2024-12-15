import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import Image from "next/image";

interface RadioItemProps {
  station: RadioStation;
  playStream: (station: RadioStation) => void;
  isActive: boolean;
  isPlay: boolean;
}

export default function RadioItem({
  station,
  playStream,
  isActive,
  isPlay,
}: RadioItemProps) {
  return (
    <button
      data-active={isActive && isPlay}
      className={`flex items-center border-b border-secondary/20 px-4 py-3 outline-none transition-all duration-200 hover:bg-secondary/15 focus:bg-secondary/15 data-[active=true]:bg-secondary/20`}
      aria-label={station.name}
      onClick={() => playStream(station)}
    >
      <Image
        src={station.icon}
        width={50}
        height={50}
        alt={`${station.name} Logo`}
        className="mr-3 rounded-lg"
        aria-hidden
      />
      <div className="flex flex-1 items-center">
        <div className="flex flex-1 flex-col items-start">
          <p className="line-clamp-1 text-start font-bold">
            <span className="block xs:hidden">{station.name}</span>
            <span className="hidden xs:block">{station.shortname}</span>
          </p>
          <p className="line-clamp-1 text-sm text-foreground/50" aria-hidden>
            {station.homepage}
          </p>
        </div>
        <div className="flex size-12 items-center justify-center">
          {isActive && isPlay ? (
            <IconPlayerPauseFilled
              className="text-foreground/80"
              width={20}
              height={20}
            />
          ) : (
            <IconPlayerPlayFilled
              className="text-secondary/80"
              width={20}
              height={20}
            />
          )}
        </div>
      </div>
    </button>
  );
}
