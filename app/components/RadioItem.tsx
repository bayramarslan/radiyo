import Image from "next/image";

const RadioItem = ({
  station,
  onClick,
  isActive,
}: {
  station: RadioStation;
  onClick: () => void;
  isActive: boolean;
}) => (
  <button
    data-active={isActive}
    className={`group flex items-center overflow-hidden border-b border-black/5 px-4 py-3 outline-0 ring-orange-400/50 transition-all hover:bg-orange-600/10 focus:ring-1 data-[active=true]:bg-orange-600/10 data-[active=true]:shadow-[inset_0px_-10px_40px_-15px_#0a0a0a20] dark:border-white/5 dark:ring-orange-500/30 dark:hover:bg-orange-600/10 data-[active=true]:dark:bg-orange-400/10 data-[active=true]:dark:shadow-[inset_0px_-10px_40px_-15px_#fce2e030]`}
    onClick={onClick}
  >
    <Image
      src={station.icon}
      width={50}
      height={50}
      alt={`${station.name} Logo`}
      className="mr-3 rounded-lg"
    />
    <div className="flex flex-1 items-center">
      <div className="flex-1 text-left">
        <p className="line-clamp-1 font-bold">{station.name}</p>
        <p className="line-clamp-1 text-sm text-black/60 dark:text-white/60">
          {station.homepage}
        </p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center">
        {isActive && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="text-orange-600 dark:text-orange-700"
          >
            <path
              fill="currentColor"
              d="M2 6c0-1.886 0-2.828.586-3.414S4.114 2 6 2s2.828 0 3.414.586S10 4.114 10 6v12c0 1.886 0 2.828-.586 3.414S7.886 22 6 22s-2.828 0-3.414-.586S2 19.886 2 18zm12 0c0-1.886 0-2.828.586-3.414S16.114 2 18 2s2.828 0 3.414.586S22 4.114 22 6v12c0 1.886 0 2.828-.586 3.414S19.886 22 18 22s-2.828 0-3.414-.586S14 19.886 14 18z"
            />
          </svg>
        )}
        {!isActive && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="text-orange-900/30 dark:text-white/40"
          >
            <path
              fill="currentColor"
              d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
            />
          </svg>
        )}
      </div>
    </div>
  </button>
);

export default RadioItem;
