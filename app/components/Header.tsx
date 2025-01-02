import {
  BackspaceIcon,
  MagnifyingGlassIcon,
  SignalIcon,
} from "@heroicons/react/16/solid";
import { useRef, useState } from "react";

interface HeaderProps {
  isPlay: boolean;
  onSearchChange: (value: string) => void;
}

export default function Header({ isPlay, onSearchChange }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchTerm("");
      onSearchChange("");
    }
  };

  return (
    <div className="flex items-stretch bg-primary bg-gradient-to-t from-primary to-secondary p-4">
      <div
        className="group mr-3 flex size-[50px] items-center justify-center rounded-lg border-b-2 border-secondary bg-background/70 shadow"
        data-is-play={isPlay}
      >
        <SignalIcon className="size-full p-2 group-hover:animate-spin group-active:animate-spin group-data-[is-play=true]:animate-spin" />
      </div>

      <div className="relative flex flex-1 rounded-lg border-b-2 border-transparent bg-background/30 shadow focus-within:border-secondary focus-within:bg-background/50">
        <input
          type="text"
          placeholder="radiyo.vercel.app"
          className="flex-1 bg-transparent px-4 text-foreground outline-none placeholder:text-foreground"
          onChange={handleSearchInputChange}
          ref={inputRef}
        />
        {searchTerm ? (
          <button
            className="absolute right-0 flex items-center justify-center p-3.5"
            onClick={handleClearSearch}
          >
            <BackspaceIcon className="h-5 w-5 text-foreground" />
          </button>
        ) : (
          <div className="pointer-events-none absolute right-0 flex items-center justify-center p-3.5">
            <MagnifyingGlassIcon className="h-5 w-5 text-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
