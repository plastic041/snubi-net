import { getTopTracks } from "./spotify";
import { TrackCard } from "./track-card";
import React from "react";

export const TopTracks = async () => {
  const tracks = await getTopTracks();

  return (
    <ul
      className="flex flex-col [&>li:not(:last-child)]:border-b"
      aria-label="많이 들은 노래 10곡"
    >
      {tracks ? (
        tracks.map((track, index) => (
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
        ))
      ) : (
        <div>데이터를 불러오지 못했습니다.</div>
      )}
    </ul>
  );
};
