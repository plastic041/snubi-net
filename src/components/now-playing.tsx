import { SpotifyIcon } from "./icons";
import { TrackCardProps } from "./track-card";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import { type SpotifyNowPlayingSong } from "~/typings/spotify";

export const NowPlayingIcon = () => {
  const { data } = useSWR<SpotifyNowPlayingSong>("/api/now-playing", fetcher);

  if (!data || !data.isPlaying) {
    return (
      <SpotifyIcon className="h-8 w-8 text-gray-300 transition-colors dark:text-gray-500" />
    );
  }

  return <SpotifyIcon className="h-8 w-8 text-[#1DB954] transition-colors" />;
};

export const NowPlaying = () => {
  const { data } = useSWR<SpotifyNowPlayingSong>("/api/now-playing", fetcher);

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 text-gray-900 dark:text-gray-100">
      <div className="">
        {data.isPlaying ? (
          <TrackCard track={data} />
        ) : (
          <div>현재 노래를 듣고 있지 않습니다.</div>
        )}
      </div>
    </div>
  );
};
