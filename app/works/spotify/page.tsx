import type { Metadata } from "next";
import { SpotifyIcon } from "~/components/icons";
import { NowPlaying, NowPlayingIcon } from "app/works/spotify/now-playing";
import { TopTracks } from "./top-tracks";

export const metadata: Metadata = {
  title: "스포티파이 재생 목록 | Snubi",
  description: "Snubi의 스포티파이 재생 목록입니다.",
  openGraph: {
    images: "https://snubi-net.vercel.app/images/hero-cat.png",
    url: "https://snubi-net.vercel.app/works/spotify",
  },
  twitter: {
    images: "https://snubi-net.vercel.app/images/hero-cat.png",
  },
};

export const revalidate = 30;

const TopTracksPage = async () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">많이 들은 노래</h2>
          <SpotifyIcon className="h-8 w-8 text-[#1DB954]" />
        </div>
        {/* @ts-expect-error */}
        <TopTracks />
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">지금 듣고 있는 노래</h2>
          {/* @ts-expect-error */}
          <NowPlayingIcon />
        </div>
        {/* @ts-expect-error */}
        <NowPlaying />
      </section>
    </div>
  );
};

export default TopTracksPage;
