import { handleTopTracks } from "./get-top-tracks";
import { TopTracks } from "./top-tracks";
import { use } from "react";
import { SpotifyIcon } from "~/components/icons";
import { NowPlayingIcon } from "~/components/now-playing";

const TopTracksPage = async () => {
  const t = await handleTopTracks();
  console.log(t, "Asasdads");
  t.text().then(console.log);
  console.log("asdas");
  return (
    // <Layout {...pageInfo}>
    <div className="flex flex-col gap-8 p-8">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">많이 들은 노래</h2>
          <SpotifyIcon className="h-8 w-8 text-[#1DB954]" />
        </div>
        {/* <TopTracks /> */}
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">지금 듣고 있는 노래</h2>
          {/* <NowPlayingIcon /> */}
        </div>
        {/* <NowPlaying /> */}
      </section>
    </div>
    // </Layout>
  );
};

export default TopTracksPage;
