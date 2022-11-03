import { SpotifyIcon } from "~/components/icons";
import Layout from "~/components/layout";
import { NowPlaying, NowPlayingIcon } from "~/components/now-playing";
import { OgHead } from "~/components/og";
import { TopTracks } from "~/components/top-tracks";
import { type Og } from "~/typings/og";

const og: Og = {
  title: "스포티파이 재생 목록 | Snubi",
  description: "Snubi의 스포티파이 재생 목록입니다.",
  image: "https://snubi-net.vercel.app/images/hero-cat.png",
  url: "https://snubi-net.vercel.app/works/spotify",
};

const TopTracksPage = () => {
  return (
    <Layout {...og}>
      <OgHead og={og} />
      <div className="flex flex-col gap-8 p-8">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
            <h2 className="text-4xl font-extrabold">많이 들은 노래</h2>
            <SpotifyIcon className="h-8 w-8 text-[#1DB954]" />
          </div>
          <TopTracks />
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
            <h2 className="text-4xl font-extrabold">지금 듣고 있는 노래</h2>
            <NowPlayingIcon />
          </div>
          <NowPlaying />
        </section>
      </div>
    </Layout>
  );
};

export default TopTracksPage;
