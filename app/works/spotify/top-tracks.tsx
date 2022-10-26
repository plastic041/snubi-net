import { TrackCard } from "./track-card";
import React from "react";
import { getTopTracks } from "~/lib/spotify";
import {
  SpotifyTopTracksSchema,
  type SpotifyTopTracks,
} from "~/typings/spotify.d";

export const config = {
  runtime: "experimental-edge",
};

const validateTopTracks = (data: unknown): data is SpotifyTopTracks => {
  const result = SpotifyTopTracksSchema.safeParse(data);

  return result.success;
};

export const TopTracks = async () => {
  if (!data) {
    return <div>error</div>;
  }

  return (
    <ul
      className="flex flex-col [&>li:not(:last-child)]:border-b"
      aria-label="많이 들은 노래 10곡"
    >
      {data.map((track, index) => (
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
