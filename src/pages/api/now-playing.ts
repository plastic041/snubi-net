import { type NextRequest } from "next/server";
import { getNowPlaying } from "~/lib/spotify";
import {
  type SpotifyNowPlaying,
  SpotifyNowPlayingSchema,
} from "~/typings/spotify.d";

export const config = {
  runtime: "experimental-edge",
};

const validateTopTracks = (data: unknown): data is SpotifyNowPlaying => {
  const result = SpotifyNowPlayingSchema.safeParse(data);

  return result.success;
};

export default async function handler(req: NextRequest) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const song = await response.json();

  if (song.item === null) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  if (!validateTopTracks(song)) {
    return new Response("Invalid data from spotify", { status: 500 });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song.item.album.name;
  const image = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;
  const id = song.item.id;

  return new Response(
    JSON.stringify({
      album,
      image,
      artist,
      isPlaying,
      songUrl,
      title,
      id,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    }
  );
}
