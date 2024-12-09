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
    <div className="border-borderBrand sticky bottom-0 z-10 flex flex-1 flex-row items-center justify-between gap-2 border-t-4 bg-black/5 px-4 py-3 shadow-[0px_-10px_40px_-15px_#00000050] backdrop-blur-3xl dark:bg-white/5 dark:shadow-[0px_-10px_40px_-15px_#f9721550]">
      <div className="flex items-center justify-center">
        <Image
          src={station.icon}
          width={50}
          height={50}
          alt={`${station.name} Logo`}
          className="mr-3 rounded-lg"
        />
        <div className="">
          <p className="font-bold">{station.name}</p>
          <p className="text-sm opacity-70">{station.homepage}</p>
        </div>
      </div>
      <div className="text-textBrand flex items-center justify-center gap-4">
        {isPlay && (
          <button
            onClick={handlePause}
            className="hover:bg-backgroundBrand flex size-12 items-center justify-center rounded-lg transition-all hover:text-background dark:hover:text-foreground"
          >
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
          </button>
        )}
        {!isPlay && (
          <button
            onClick={handlePlay}
            className="hover:bg-backgroundBrand flex size-12 items-center justify-center rounded-lg transition-all hover:text-background dark:hover:text-foreground"
          >
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
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerController;
