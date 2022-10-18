import useSWR from "swr";
import { SpotifyIcon } from "~/components/icons";
import Layout from "~/components/layout";
import { SongCards } from "~/components/song-card";
import { fetcher } from "~/lib/fetcher";
import { Song } from "~/typings/spotify";

const pageInfo = {
  title: "Top Tracks | Snubi",
  description: "Top Tracks",
};

const TopTracksPage = () => {
  const { data } = useSWR<{ songs: Song[] } | string>(
    "/api/top-tracks",
    fetcher
  );

  console.log(data);

  if (!data) {
    return <Layout {...pageInfo}>Loading...</Layout>;
  }

  if (typeof data === "string") {
    return <Layout {...pageInfo}>{data}</Layout>;
  }

  return (
    <Layout {...pageInfo}>
      <article className="flex flex-col gap-8 p-8">
        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">많이 들은 노래</h2>
          <SpotifyIcon className="h-8 w-8" />
        </div>
        <SongCards songs={data.songs} />
      </article>
    </Layout>
  );
};

export default TopTracksPage;
