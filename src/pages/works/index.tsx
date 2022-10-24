import Image from "next/future/image";
import Link from "next/link";
import destinyCardThumbnail from "~/../public/images/destiny-card/thumbnail.png";
import Layout from "~/components/layout";
import { OgHead } from "~/components/og";
import { type Og } from "~/typings/og";

const og: Og = {
  title: "Snubi.net",
  description: "Snubi.net",
  image: "https://snubi-net.vercel.app/images/hero-cat.png",
  url: "https://snubi-net.vercel.app",
};

const WorksPage = () => {
  return (
    <Layout>
      <OgHead og={og} />
      <div className="flex flex-col items-center gap-4 p-8">
        <Link href="/works/destiny-card">
          <a className="flex flex-col items-center gap-4 border border-gray-300 p-4 transition-colors dark:border-gray-400 hover:dark:bg-gray-600">
            <Image
              src={destinyCardThumbnail}
              alt="destiny-card"
              width={400}
              height={400}
              className="w-64"
              placeholder="blur"
            />
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl font-bold text-gray-900 dark:text-gray-50">
                데스티니 카드 생성기
              </span>
              <time
                className="text-gray-700 dark:text-gray-300"
                dateTime="2022-09-30"
              >
                2022년 9월 30일
              </time>
            </div>
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default WorksPage;
