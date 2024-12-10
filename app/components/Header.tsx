import React from "react";

export default function Header({ isPlay }: { isPlay: boolean }) {
  return (
    <div className="flex flex-1 items-stretch p-4 bg-primary/10">
      <div className="mr-3 flex h-[50px] w-[50px] items-center justify-center rounded-lg shadow">
        <svg
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          data-is-play={isPlay}
          className="size-full p-1 hover:animate-spin active:animate-spin data-[is-play=true]:animate-spin"
        >
          <g transform="matrix(1.19999965 0 0 1.19999965 3.135861 -1208.242317)">
            <path
              d="m19 12c0 1.971-.838 3.862-2.3 5.188-.287.261-.647.39-1.008.39-.408 0-.814-.166-1.11-.492-.557-.613-.511-1.562.103-2.118.836-.76 1.315-1.841 1.315-2.968 0-1.13-.478-2.21-1.31-2.965-.614-.556-.661-1.505-.104-2.119.556-.615 1.504-.661 2.118-.104 1.459 1.322 2.296 3.213 2.296 5.188zm1.514-8.466c-.584-.587-1.535-.589-2.121-.005-.588.584-.59 1.534-.006 2.122 1.685 1.692 2.613 3.947 2.613 6.349 0 2.396-.93 4.649-2.618 6.347-.584.587-.582 1.537.006 2.121.292.291.675.437 1.058.437.385 0 .771-.147 1.063-.442 2.251-2.264 3.491-5.269 3.491-8.463 0-3.2-1.238-6.207-3.486-8.466zm-8.514 6.653c-1.003 0-1.812.809-1.812 1.813 0 1 .81 1.813 1.813 1.813s1.812-.813 1.812-1.813c0-1.004-.81-1.813-1.813-1.813zm-2.581-3.273c-.557-.614-1.505-.66-2.119-.103-1.462 1.326-2.3 3.218-2.3 5.189 0 1.977.837 3.867 2.297 5.188.287.26.647.388 1.006.388.409 0 .816-.166 1.113-.493.556-.614.508-1.563-.106-2.119-.832-.753-1.31-1.833-1.31-2.964 0-1.127.479-2.208 1.316-2.967.614-.557.66-1.506.103-2.119zm-6.419 5.086c0-2.396.93-4.649 2.618-6.346.584-.587.583-1.537-.005-2.121-.586-.585-1.536-.582-2.121.005-2.252 2.262-3.492 5.268-3.492 8.462 0 3.199 1.238 6.206 3.486 8.466.293.295.678.442 1.063.442.383 0 .765-.146 1.058-.437.587-.584.589-1.534.005-2.121-1.684-1.694-2.612-3.949-2.612-6.35z"
              fill="currentColor"
              transform="matrix(1.1805559 0 0 1.1805559 3.220117 1012.702)"
            />
          </g>
        </svg>
      </div>
      <div className="relative flex flex-1 rounded-lg shadow has-[input:focus]:bg-white/20">
        <input
          readOnly
          type="text"
          placeholder="radiyo.vercel.app"
          className="flex flex-1 bg-transparent px-4 text-foreground outline-none placeholder:text-foreground"
        />
        <div className="pointer-events-none absolute right-0 flex h-full w-12 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 9H2V7h5zm0 3H2v2h5zm13.59 7l-3.83-3.83c-.8.52-1.74.83-2.76.83c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3M2 19h10v-2H2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
