import { getNowPlaying } from "./get-now-playing";
import { SpotifyIcon } from "./spotify-icon";
import { TrackCard } from "./track-card";
import { use } from "react";

export const NowPlayingIcon = () => {
  const track = use(getNowPlaying());

  if (track) {
    return <SpotifyIcon className="h-8 w-8 text-[#1DB954] transition-colors" />;
  }

  return (
    <SpotifyIcon className="h-8 w-8 text-gray-300 transition-colors dark:text-gray-500" />
  );
};

export const NowPlaying = () => {
  const track = use(getNowPlaying());

  return (
    <div className="text-g-900 flex flex-col gap-4">
      <div className="">
        {track !== "no data" ? (
          <TrackCard track={track} />
        ) : (
          <div>현재 노래를 듣고 있지 않습니다.</div>
        )}
      </div>
    </div>
  );
};
