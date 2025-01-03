import { PauseIcon, PlayIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

interface RadioItemProps {
  station: RadioStation;
  currentStation: RadioStation | null;
  playStream: (station: RadioStation) => void;
  isActive: boolean;
  isPlay: boolean;
}

export default function RadioItem({
  station,
  playStream,
  currentStation,
  isActive,
  isPlay,
}: RadioItemProps) {
  const nodeActive = station.node?.find((item) => item === currentStation);

  return (
    <div
      className="group flex flex-col border-b border-secondary/20"
      data-active={(isActive && isPlay) || nodeActive != undefined}
    >
      <button
        className={`flex items-center px-4 py-3 outline-none transition-all duration-200 hover:bg-secondary/15 focus:bg-secondary/15 group-data-[active=true]:bg-secondary/20`}
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
              <PauseIcon
                className="text-foreground/80"
                width={20}
                height={20}
              />
            ) : (
              <PlayIcon className="text-secondary/80" width={20} height={20} />
            )}
          </div>
        </div>
      </button>

      {station.node && (
        <div className="hidden w-svw items-center overflow-auto border-t border-secondary/20 bg-secondary/30 group-data-[active=true]:flex">
          {station.node.map((node, index) => (
            <button
              key={index}
              className={`flex items-center justify-center border-b-2 border-r border-secondary/15 border-b-transparent px-5 pb-2 pt-2.5 text-sm text-foreground/80 transition-all hover:bg-background/30 ${nodeActive === node && "border-b-secondary/60 bg-background/40"}`}
              onClick={() => playStream(node)}
            >
              {nodeActive === node ? (
                <PauseIcon
                  width={16}
                  height={16}
                  className="text-foreground/50"
                />
              ) : (
                <PlayIcon
                  width={16}
                  height={16}
                  className="text-foreground/50"
                />
              )}

              <span className="ml-1.5">{node.shortname}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
