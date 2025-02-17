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
		<div className="border-secondary bg-primary/30 sticky bottom-0 flex flex-row items-center justify-between gap-2 border-t-4 px-4 py-3 backdrop-blur-3xl">
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
					<p className="text-foreground/70 line-clamp-1 text-sm">
						{station.homepage}
					</p>
				</div>
			</div>
			<div className="text-foreground/70 flex items-center justify-center gap-1">
				<button
					onClick={() => prevStation && playStream(prevStation)}
					className="hover:bg-secondary/15 focus:bg-secondary/15 flex size-10 items-center justify-center rounded-sm outline-hidden transition-all"
				>
					<BackwardIcon width={16} height={16} />
				</button>
				<button
					onClick={() => playStream(station)}
					className="hover:bg-secondary/15 focus:bg-secondary/15 flex size-12 items-center justify-center rounded-sm outline-hidden transition-all"
				>
					{isPlay ? (
						<PauseIcon className="text-foreground/80" width={20} height={20} />
					) : (
						<PlayIcon className="text-foreground/80" width={20} height={20} />
					)}
				</button>
				<button
					onClick={() => nextStation && playStream(nextStation)}
					className="hover:bg-secondary/15 focus:bg-secondary/15 flex size-10 items-center justify-center rounded-sm outline-hidden transition-all"
				>
					<ForwardIcon width={16} height={16} />
				</button>
			</div>
		</div>
	);
}
