import Image from "next/future/image";
import { Song } from "~/typings/spotify";

type SongCardProps = {
  song: Song;
};
const SongCard = ({ song }: SongCardProps) => (
  <a
    href={song.songUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col gap-4 border border-gray-300 transition-colors hover:bg-gray-100 dark:border-gray-400 hover:dark:bg-gray-600"
  >
    <div className="flex flex-row items-center">
      <Image
        src={song.image}
        width={80}
        height={80}
        aria-hidden="true"
        alt=""
        className="aspect-square"
      />
      <div className="flex flex-col justify-center p-4">
        <span className="overflow-hidden text-base font-bold text-gray-900 [-webkit-line-clamp:1] [display:-webkit-box] [-webkit-box-orient:vertical] dark:text-gray-50 md:text-xl">
          {song.title}
        </span>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {song.artist}
        </span>
      </div>
    </div>
  </a>
);

type SongCardsProps = {
  songs: Song[];
};
export const SongCards = ({ songs }: SongCardsProps) => (
  <ul className="flex flex-col gap-2">
    {songs.map((song) => (
      <li key={song.id}>
        <SongCard song={song} />
      </li>
    ))}
  </ul>
);
