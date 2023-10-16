import { getNowPlaying } from "./fetcher";
import type { SpotifyNowPlayingSong } from "./spotify";

export const validateIsPlaying = (
  nowPlaying: Awaited<ReturnType<typeof getNowPlaying>>
): nowPlaying is SpotifyNowPlayingSong => {
  const isPlaying = nowPlaying ? nowPlaying.isPlaying : false;
  return isPlaying;
};
