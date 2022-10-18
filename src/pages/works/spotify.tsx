import { SpotifyIcon } from "~/components/icons";
import Layout from "~/components/layout";
import { NowPlaying, NowPlayingIcon } from "~/components/now-playing";
import { TopTracks } from "~/components/top-tracks";

const pageInfo = {
  title: "Top Tracks | Snubi",
  description: "Top Tracks",
};

const TopTracksPage = () => {
  return (
    <Layout {...pageInfo}>
      <div className="flex flex-col gap-8 p-8">
        <article className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
            <h2 className="text-4xl font-extrabold">많이 들은 노래</h2>
            <SpotifyIcon className="h-8 w-8 text-[#1DB954]" />
          </div>
          <TopTracks />
        </article>
        <article className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
            <h2 className="text-4xl font-extrabold">지금 듣고 있는 노래</h2>
            <NowPlayingIcon />
          </div>
          <NowPlaying />
        </article>
      </div>
    </Layout>
  );
};

export default TopTracksPage;
