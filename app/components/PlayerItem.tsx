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
			className="group border-secondary/20 flex flex-col border-b"
			data-active={(isActive && isPlay) || activeNode != undefined}
		>
			<button
				className={`group-data-[active=false]:hover:bg-secondary/15 group-data-[active=false]:focus:bg-secondary/15 group-data-[active=true]:bg-secondary/25 flex items-center px-4 py-3 outline-hidden transition-all duration-200`}
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
							<span className="xs:hidden block">{station.name}</span>
							<span className="xs:block hidden">{station.shortname}</span>
						</p>
						<p className="text-foreground/50 line-clamp-1 text-sm" aria-hidden>
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
				<div className="border-secondary/20 bg-secondary/15 hidden w-screen items-center overflow-auto border-t group-data-[active=true]:flex">
					{station.node.map((node, index) => (
						<button
							key={index}
							data-active={activeNode === node && isPlay}
							className={`text-foreground/50 hover:border-b-secondary/50 hover:bg-background/50 hover:text-foreground/70 data-[active=true]:border-b-secondary/50 data-[active=true]:bg-background/50 data-[active=true]:text-foreground h-14 min-w-28 border-t-2 border-r border-b-2 border-transparent border-b-transparent px-5 text-sm outline-hidden transition-all`}
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
