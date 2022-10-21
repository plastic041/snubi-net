import { TrackCard } from "./track-card";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import { Track } from "~/typings/spotify";

export const TopTracks = () => {
  const { data } = useSWR<{ tracks: Track[] } | string>(
    "/api/top-tracks",
    fetcher
  );

  if (!data || typeof data === "string") {
    return null;
  }

  return (
    <ul
      className="flex flex-col [&>li:not(:last-child)]:border-b"
      aria-label="많이 들은 노래 10곡"
    >
      {data.tracks.map((track, index) => (
        <li
          key={track.id}
          className="flex items-center"
          aria-label={`${index + 1}번째로 많이 들은 노래`}
        >
          <div className="w-6 shrink-0 text-right">
            <span className="text-right text-lg tabular-nums text-gray-700 dark:text-gray-300">
              {index + 1}
            </span>
          </div>
          <TrackCard track={track} />
        </li>
      ))}
    </ul>
  );
};
