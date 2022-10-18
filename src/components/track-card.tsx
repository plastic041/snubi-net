import Image from "next/future/image";
import { Track } from "~/typings/spotify";

type TrackCardProps = {
  track: Track;
};
export const TrackCard = ({ track }: TrackCardProps) => (
  <article
    className="flex flex-1 gap-4 border-gray-300 p-4"
    aria-label="노래 정보"
  >
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
        aria-label={`spotify의 ${track.title} 곡 페이지로 이동`}
      >
        {track.title}
      </a>
      <span
        className="text-sm text-gray-700 dark:text-gray-300"
        aria-label="아티스트"
      >
        {track.artist}
      </span>
    </div>
  </article>
);
