import { getAccessToken } from "./spotify";
import {
  type SpotifyNowPlaying,
  SpotifyNowPlayingSchema,
  SpotifyNowPlayingSong,
} from "~/typings/spotify";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

if (!(clientId && clientSecret && refreshToken)) {
  throw new Error("Missing Spotify credentials");
}

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const valiateNowPlaying = (data: unknown): data is SpotifyNowPlaying => {
  const result = SpotifyNowPlayingSchema.safeParse(data);

  return result.success;
};

export const getNowPlaying = async (): Promise<
  SpotifyNowPlayingSong | "no data"
> => {
  const { access_token: accessToken } = await getAccessToken();

  const url = new URL(NOW_PLAYING_ENDPOINT);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      revalidate: 60,
    },
  });

  if (response.status !== 200) {
    return "no data";
  }

  const json = await response.json();

  if (!valiateNowPlaying(json)) {
    return "no data";
  }

  const isPlaying = json.is_playing;
  const title = json.item.name;
  const artist = json.item.artists.map((_artist) => _artist.name).join(", ");
  const album = json.item.album.name;
  const image = json.item.album.images[0].url;
  const songUrl = json.item.external_urls.spotify;
  const id = json.item.id;

  const song: SpotifyNowPlayingSong = {
    album,
    artist,
    id,
    title,
    image,
    songUrl,
    isPlaying,
  };

  return song;
};
