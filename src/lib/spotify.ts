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

export const getNowPlaying = async () => {
  const { access_token: accessToken } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getTopTracks = async (): Promise<Response> => {
  const { access_token: accessToken } = await getAccessToken();

  const url = new URL(TOP_TRACKS_ENDPOINT);
  url.searchParams.set("limit", "10");

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
