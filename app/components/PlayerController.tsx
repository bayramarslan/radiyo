import {
	BackwardIcon,
	ForwardIcon,
	PauseIcon,
	PlayIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";

type PlayerControllerProps = {
	isPlay: boolean;
	playStream: (station: RadioStation) => void;
	nextStation: RadioStation | undefined;
	prevStation: RadioStation | undefined;
	station: RadioStation;
};

export default function PlayerController({
	isPlay,
	playStream,
	station,
	prevStation,
	nextStation,
}: PlayerControllerProps) {
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
						<span className="block xs:hidden">{station.name}</span>
						<span className="hidden xs:block">{station.shortname}</span>
					</p>
					<p className="line-clamp-1 text-sm text-foreground/70">
						{station.homepage}
					</p>
				</div>
			</div>
			<div className="flex items-center justify-center gap-1 text-foreground/70">
				<button
					onClick={() => prevStation && playStream(prevStation)}
					className="flex size-10 items-center justify-center rounded outline-none transition-all hover:bg-secondary/15 focus:bg-secondary/15"
				>
					<BackwardIcon width={16} height={16} />
				</button>
				<button
					onClick={() => playStream(station)}
					className="flex size-12 items-center justify-center rounded outline-none transition-all hover:bg-secondary/15 focus:bg-secondary/15"
				>
					{isPlay ? (
						<PauseIcon className="text-foreground/80" width={20} height={20} />
					) : (
						<PlayIcon className="text-foreground/80" width={20} height={20} />
					)}
				</button>
				<button
					onClick={() => nextStation && playStream(nextStation)}
					className="flex size-10 items-center justify-center rounded outline-none transition-all hover:bg-secondary/15 focus:bg-secondary/15"
				>
					<ForwardIcon width={16} height={16} />
				</button>
			</div>
		</div>
	);
}
