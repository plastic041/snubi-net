import { NowPlaying, NowPlayingIcon } from "./now-playing";
import { SpotifyIcon } from "./spotify-icon";
import { TopTracks } from "./top-tracks";

const TopTracksPage = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <section className="flex flex-col gap-4">
        <div className="text-g-900 flex items-center gap-4">
          <h2 className="text-4xl font-extrabold">많이 들은 노래</h2>
          <SpotifyIcon className="h-8 w-8 text-[#1DB954]" />
        </div>
        <TopTracks />
      </section>
      <section className="flex flex-col gap-4">
        <div className="text-g-900 flex items-center gap-4">
          <h2 className="text-4xl font-extrabold">지금 듣고 있는 노래</h2>
          <NowPlayingIcon />
        </div>
        <NowPlaying />
      </section>
    </div>
  );
};

export default TopTracksPage;
