import Image from "next/future/image";
import { Track } from "~/typings/spotify";

type TrackCard = {
  track: Track;
};
export const TrackCard = ({ track }: TrackCard) => (
  <a
    href={track.songUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col gap-4 border border-gray-300 transition-colors hover:bg-gray-100 dark:border-gray-400 hover:dark:bg-gray-600"
  >
    <div className="flex flex-row items-center">
      <Image
        src={track.image}
        width={80}
        height={80}
        aria-hidden="true"
        alt=""
        className="aspect-square"
      />
      <div className="flex flex-col justify-center p-4">
        <span className="overflow-hidden text-base font-bold text-gray-900 [-webkit-line-clamp:1] [display:-webkit-box] [-webkit-box-orient:vertical] dark:text-gray-50 md:text-xl">
          {track.title}
        </span>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {track.artist}
        </span>
      </div>
    </div>
  </a>
);
