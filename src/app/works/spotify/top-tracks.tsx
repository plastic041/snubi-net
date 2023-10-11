import { TrackCard } from "~/components/track-card";
import { getTopTracks } from "./fetcher";

export const TopTracks = async () => {
  const topTracks = await getTopTracks();

  return (
    <ul
      className="flex flex-col [&>li:not(:last-child)]:border-b"
      aria-label="많이 들은 노래 10곡"
    >
      {topTracks.map((track, index) => (
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
