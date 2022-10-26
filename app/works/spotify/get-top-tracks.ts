import { getTopTracks } from "./spotify";
import {
  SpotifyTopTracksSchema,
  type SpotifyTopTracks,
  Track,
} from "~/typings/spotify";

const validateTopTracks = (data: unknown): data is SpotifyTopTracks => {
  const result = SpotifyTopTracksSchema.safeParse(data);

  return result.success;
};

export const handleTopTracks = async () => {
  const data = await getTopTracks();

  if (!validateTopTracks(data)) {
    return [];
  }

  const tracks: Track[] = data.items.map((track) => ({
    id: track.id,
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
  }));

  return tracks;
};
