import destinyCardThumbnail from "./thumbnail.png";
import Image from "next/image";
import Link from "next/link";

const WorksPage = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-4 p-8">
        <Link
          href="/works/destiny-card"
          className="flex w-40 flex-col items-center gap-4 border border-gray-300 p-4 transition-colors dark:border-gray-400 hover:dark:bg-gray-600 md:w-64"
        >
          <Image
            src={destinyCardThumbnail}
            alt="destiny-card"
            width={400}
            height={400}
            className="w-64"
            placeholder="blur"
          />
          <div className="flex flex-col items-center gap-2">
            <span className="text-g-900 text-center text-xl font-bold">
              데스티니 카드 생성기
            </span>
            <time className="text-g-700" dateTime="2022-09-30">
              2022년 9월 30일
            </time>
          </div>
        </Link>
        <Link
          href="/works/spotify"
          className="flex w-40 flex-col items-center gap-4 border border-gray-300 p-4 transition-colors dark:border-gray-400 hover:dark:bg-gray-600 md:w-64"
        >
          <div className="aspect-square w-full" />
          <div className="flex flex-col items-center gap-2">
            <span className="text-g-900 break-words text-center text-xl font-bold [word-break:keep-all]">
              Spotify 재생목록
            </span>
            <time className="text-g-700" dateTime="2022-09-30">
              2022년 10월 26일
            </time>
          </div>
        </Link>
      </div>
    </>
  );
};

export default WorksPage;
