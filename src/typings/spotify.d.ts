import { z } from "zod";

export const SpotifyTopTrackSchema = z.object({
  name: z.string(),
  external_urls: z.object({
    spotify: z.string(),
  }),
  id: z.string(),
  artists: z.array(
    z.object({
      name: z.string(),
    })
  ),
  album: z.object({
    external_urls: z.object({
      spotify: z.string(),
    }),
    images: z.array(
      z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      })
    ),
  }),
});

export const SpotifyTopTracksSchema = z.object({
  items: z.array(SpotifyTopTrackSchema),
});

export type SpotifyTopTrack = z.infer<typeof SpotifyTopTrackSchema>;
export type SpotifyTopTracks = z.infer<typeof SpotifyTopTracksSchema>;

export const SongSchema = z.object({
  id: z.string(),
  artist: z.string(),
  songUrl: z.string(),
  title: z.string(),
  image: z.string(),
});

export type Song = z.infer<typeof SongSchema>;
