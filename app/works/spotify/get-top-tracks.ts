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

export const handleTopTracks = async (): Promise<Response> => {
  const response = await getTopTracks();
  // const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  console.log(response);
  return response;
  const data = await response.json();

  if (!validateTopTracks(data)) {
    return null;
  }

  const tracks = data.items.map((track) => ({
    id: track.id,
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
  }));

  return tracks;
};
