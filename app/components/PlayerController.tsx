import React from "react";

type PlayerControllerProps = {
  isPlay: boolean;
  handlePlay: () => void;
  handlePause: () => void;
};

const PlayerController: React.FC<PlayerControllerProps> = ({
  isPlay,
  handlePlay,
  handlePause,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <div className="flex gap-4 items-center justify-center">
        {isPlay && (
          <button
            onClick={handlePause}
            className="dark:bg-gray-700 bg-gray-300 px-8 py-3 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              data-darkreader-inline-fill=""
            >
              <path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"></path>
            </svg>
          </button>
        )}

        {!isPlay && (
          <button
            onClick={handlePlay}
            className="dark:bg-gray-700 bg-gray-300 px-8 py-3 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              data-darkreader-inline-fill=""
            >
              <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerController;
