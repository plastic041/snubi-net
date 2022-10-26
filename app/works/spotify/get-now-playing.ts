import { getNowPlaying } from "~/lib/spotify";
import {
  type SpotifyNowPlaying,
  SpotifyNowPlayingSchema,
} from "~/typings/spotify";

const valiateNowPlaying = (data: unknown): data is SpotifyNowPlaying => {
  const result = SpotifyNowPlayingSchema.safeParse(data);

  return result.success;
};

export const handleNowPlaying = async () => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  const song = await response.json();

  if (song.item === null) {
    return null;
  }

  if (!valiateNowPlaying(song)) {
    return null;
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
    image,
    artist,
    isPlaying,
    songUrl,
    title,
    id,
  };
};
