import { SpotifyIcon } from "~/components/icons";
import { TrackCard } from "~/components/track-card";
import { getNowPlaying } from "./fetcher";
import { type SpotifyNowPlayingSong } from "~/typings/spotify";

export const NowPlayingIcon = async () => {
  const nowPlaying = await getNowPlaying();

  if (!nowPlaying) {
    return (
      <SpotifyIcon className="h-8 w-8 text-gray-300 transition-colors dark:text-gray-500" />
    );
  }

  return <SpotifyIcon className="h-8 w-8 text-[#1DB954] transition-colors" />;
};

const validateIsPlaying = (
  nowPlaying: Awaited<ReturnType<typeof getNowPlaying>>
): nowPlaying is SpotifyNowPlayingSong => {
  const isPlaying = nowPlaying ? nowPlaying.isPlaying : false;
  return isPlaying;
};

export const NowPlaying = async () => {
  const nowPlaying = await getNowPlaying();
  const isPlaying = validateIsPlaying(nowPlaying);

  return (
    <div className="flex flex-col gap-4 text-gray-900 dark:text-gray-50">
      <div className="">
        {isPlaying ? (
          <TrackCard track={nowPlaying} />
        ) : (
          <div>현재 노래를 듣고 있지 않습니다.</div>
        )}
      </div>
    </div>
  );
};
