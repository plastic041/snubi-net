import Image from "next/future/image";
import { Track } from "~/typings/spotify";

type TrackCard = {
  track: Track;
};
export const TrackCard = ({ track }: TrackCard) => (
  <article className="flex flex-1 gap-4 border-gray-300 p-4">
    <Image
      src={track.image}
      width={60}
      height={60}
      aria-hidden="true"
      alt=""
      className="rounded md:rounded-lg"
    />
    <div className="flex flex-col justify-center">
      <a
        className="overflow-hidden text-base font-bold text-gray-900 transition-colors [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] hover:text-blue-500 dark:text-gray-100 hover:dark:text-blue-400 md:text-xl"
        href={track.songUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {track.title}
      </a>
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {track.artist}
      </span>
    </div>
  </article>
);
