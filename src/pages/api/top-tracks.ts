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

/**
 * returns top tracks from spotify
 * @return {Promise<Response>}
 */
export default async function handler() {
  const response = await getTopTracks();
  const data = await response.json();

  if (!validateTopTracks(data)) {
    return new Response("Invalid data from spotify", { status: 500 });
  }

  const tracks = data.items.map((track) => ({
    id: track.id,
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
  }));

  return new Response(JSON.stringify({ tracks }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
