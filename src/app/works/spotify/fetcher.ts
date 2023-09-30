import {
  type SpotifyTopTracks,
  type Track,
  type SpotifyNowPlaying,
  type SpotifyNowPlayingSong,
  SpotifyTopTracksSchema,
  SpotifyNowPlayingSchema,
} from "~/typings/spotify";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

if (!(clientId && clientSecret && refreshToken)) {
  throw new Error("Missing Spotify credentials");
}

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
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

const validateNowPlaying = (data: unknown): data is SpotifyNowPlaying => {
  const result = SpotifyNowPlayingSchema.safeParse(data);

  return result.success;
};

export const getNowPlaying = async (): Promise<
  false | SpotifyNowPlayingSong
> => {
  const { access_token: accessToken } = await getAccessToken();

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      return false;
    }

    const song = await response.json();

    if (!validateNowPlaying(song)) {
      return false;
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
    const album = song.item.album.name;
    const image = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;
    const id = song.item.id;

    return {
      album,
      artist,
      id,
      image,
      isPlaying,
      songUrl,
      title,
    };
  } catch (error) {
    return false;
  }
};

const validateTopTracks = (data: unknown): data is SpotifyTopTracks => {
  const result = SpotifyTopTracksSchema.safeParse(data);

  return result.success;
};

export const getTopTracks = async (): Promise<Track[]> => {
  const { access_token: accessToken } = await getAccessToken();

  const url = new URL(TOP_TRACKS_ENDPOINT);
  url.searchParams.set("limit", "10");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = await response.json();

  if (!validateTopTracks(json)) {
    throw new Error("Invalid response from Spotify");
  }

  const tracks = json.items.map((track) => ({
    id: track.id,
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
  }));

  return tracks;
};
