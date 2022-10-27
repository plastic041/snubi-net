import { getAccessToken } from "./spotify";
import {
  SpotifyTopTracksSchema,
  type SpotifyTopTracks,
  type Track,
} from "~/typings/spotify";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

if (!(clientId && clientSecret && refreshToken)) {
  throw new Error("Missing Spotify credentials");
}

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

const validateTopTracks = (data: unknown): data is SpotifyTopTracks => {
  const result = SpotifyTopTracksSchema.safeParse(data);

  return result.success;
};

export const getTopTracks = async (): Promise<Track[] | null> => {
  const { access_token: accessToken } = await getAccessToken();

  const url = new URL(TOP_TRACKS_ENDPOINT);
  url.searchParams.set("limit", "10");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      revalidate: 86400,
    },
  });

  console.log("TopTracks", response.status);

  if (response.status !== 200) {
    return null;
  }

  const json = await response.json();

  if (!validateTopTracks(json)) {
    return [];
  }

  const tracks: Track[] = json.items.map((track) => ({
    id: track.id,
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
  }));

  return tracks;
};
