import {
  type SpotifyNowPlaying,
  SpotifyNowPlayingSchema,
  SpotifyNowPlayingSong,
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

const basic = btoa(`${clientId}:${clientSecret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  return response.json();
};

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
  });

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
