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
    <ul className="flex flex-col gap-2">
      {data.tracks.map((track) => (
        <li key={track.id}>
          <TrackCard track={track} />
        </li>
      ))}
    </ul>
  );
};
