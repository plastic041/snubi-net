import { getNowPlaying } from "./spotify";
import { SpotifyIcon } from "./spotify-icon";
import { TrackCard } from "./track-card";

export const NowPlayingIcon = async () => {
  const track = await getNowPlaying();

  if (track) {
    return <SpotifyIcon className="h-8 w-8 text-[#1DB954] transition-colors" />;
  }

  return (
    <SpotifyIcon className="h-8 w-8 text-gray-300 transition-colors dark:text-gray-500" />
  );
};

export const NowPlaying = async () => {
  const track = await getNowPlaying();

  return (
    <div className="flex flex-col gap-4 text-gray-900 dark:text-gray-50">
      <div className="">
        {track ? (
          <TrackCard track={track} />
        ) : (
          <div>현재 노래를 듣고 있지 않습니다.</div>
        )}
      </div>
    </div>
  );
};
