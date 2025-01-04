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
  const activeNode = station.node?.find((item) => item === currentStation);

  return (
    <div
      className="group flex flex-col border-b border-secondary/20"
      data-active={(isActive && isPlay) || activeNode != undefined}
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
        <div className="hidden w-screen items-center overflow-auto border-t border-secondary/20 bg-secondary/15 group-data-[active=true]:flex">
          {station.node.map((node, index) => (
            <button
              key={index}
              data-active={activeNode === node && isPlay}
              className={`h-14 min-w-28 border-b-2 border-r border-t-2 border-secondary/15 border-b-transparent border-t-transparent px-5 text-sm text-foreground/50 outline-none transition-all hover:bg-background/50 data-[active=true]:border-b-2 data-[active=true]:border-b-secondary/50 data-[active=true]:bg-background/50 data-[active=true]:text-foreground`}
              onClick={() => playStream(node)}
            >
              <div className="flex items-center justify-center">
                {isPlay && activeNode === node ? (
                  <PauseIcon width={14} height={14} />
                ) : (
                  <PlayIcon width={14} height={14} />
                )}
                <span className="mx-1.5">{node.shortname}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
