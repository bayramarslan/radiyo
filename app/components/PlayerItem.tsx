import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import Image from "next/image";

const RadioItem = ({
  station,
  onClick,
  isActive,
  isPlay,
}: {
  station: RadioStation;
  onClick: () => void;
  isActive: boolean;
  isPlay: boolean;
}) => (
  <button
    data-active={isActive && isPlay}
    className={`flex items-center border-b border-secondary/20 px-4 py-3 outline-primary/50 transition-all duration-200 hover:bg-secondary/15 data-[active=true]:bg-secondary/20`}
    aria-label={station.name}
    onClick={onClick}
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
          <span className="hidden sm:block">{station.name}</span>
          <span className="block sm:hidden">{station.shortname}</span>
        </p>
        <p className="line-clamp-1 text-sm text-foreground/50" aria-hidden>
          {station.homepage}
        </p>
      </div>
      <div className="flex size-12 items-center justify-center p-3.5">
        {isActive && isPlay ? (
          <IconPlayerPauseFilled className="text-foreground/80" />
        ) : (
          <IconPlayerPlayFilled className="text-secondary/80" />
        )}
      </div>
    </div>
  </button>
);

export default RadioItem;
