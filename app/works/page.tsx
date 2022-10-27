import destinyCardThumbnail from "./thumbnail.png";
import Image from "next/image";
import Link from "next/link";

const WorksPage = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-4 p-8">
        <Link
          href="/works/destiny-card"
          className="flex flex-col items-center gap-4 border border-gray-300 p-4 transition-colors dark:border-gray-400 hover:dark:bg-gray-600"
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
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              데스티니 카드 생성기
            </span>
            <time
              className="text-gray-700 dark:text-gray-300"
              dateTime="2022-09-30"
            >
              2022년 9월 30일
            </time>
          </div>
        </Link>
        <Link
          href="/works/spotify"
          className="flex flex-col items-center gap-4 border border-gray-300 p-4 transition-colors dark:border-gray-400 hover:dark:bg-gray-600"
        >
          <div className="h-64 w-64 bg-slate-400"></div>
          {/* <Image
            src={destinyCardThumbnail}
            alt="destiny-card"
            width={400}
            height={400}
            className="w-64"
            placeholder="blur"
          /> */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Spotify 재생목록
            </span>
            <time
              className="text-gray-700 dark:text-gray-300"
              dateTime="2022-09-30"
            >
              2022년 10월 26일
            </time>
          </div>
        </Link>
      </div>
    </>
  );
};

export default WorksPage;
