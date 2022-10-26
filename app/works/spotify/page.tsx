import { NowPlaying, NowPlayingIcon } from "./now-playing";
import { SpotifyIcon } from "./spotify-icon";
import { TopTracks } from "./top-tracks";

export const revalidate = 60 * 60 * 24;

const TopTracksPage = async () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">많이 들은 노래</h2>
          <SpotifyIcon className="h-8 w-8 text-[#1DB954]" />
        </div>
        {/* @ts-ignore */}
        <TopTracks />
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">지금 듣고 있는 노래</h2>
          {/* @ts-ignore */}
          <NowPlayingIcon />
        </div>
        {/* @ts-ignore */}
        <NowPlaying />
      </section>
    </div>
    // </Layout>
  );
};

export default TopTracksPage;
