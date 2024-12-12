import { IconAccessPoint, IconListSearch } from "@tabler/icons-react";

export default function Header({ isPlay }: { isPlay: boolean }) {
  return (
    <div className="flex flex-1 items-stretch bg-primary bg-gradient-to-t from-primary to-secondary p-4">
      <div
        className="group mr-3 flex size-[50px] items-center justify-center rounded-lg border-b-2 border-secondary bg-background/70 shadow"
        data-is-play={isPlay}
      >
        <IconAccessPoint className="size-full p-1.5 group-hover:animate-spin group-active:animate-spin group-data-[is-play=true]:animate-spin" />
      </div>
      <div className="relative flex flex-1 rounded-lg border-b-2 border-transparent bg-background/30 shadow has-[input:focus]:border-secondary has-[input:focus]:bg-background/50">
        <input
          type="text"
          placeholder="radiyo.vercel.app"
          className="flex flex-1 bg-transparent px-4 text-foreground outline-0 placeholder:text-foreground"
        />
        <div className="pointer-events-none absolute right-0 flex h-full w-12 items-center justify-center p-3.5">
          <IconListSearch />
        </div>
      </div>
    </div>
  );
}
