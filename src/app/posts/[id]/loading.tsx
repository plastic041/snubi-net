import type { Metadata } from "next";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "불러오는 중... - Snubi.net",
    description: "불러오는 중...",
    openGraph: {
      images: "https://snubi-net.vercel.app/images/hero-cat.png",
      url: "https://snubi-net.vercel.app/posts/",
    },
    twitter: {
      images: "https://snubi-net.vercel.app/images/hero-cat.png",
    },
  };
};

export const PostHeaderLoader = () => {
  return (
    <div className="top-[5rem] col-span-1 flex flex-col gap-4 self-start lg:sticky">
      <Link
        href="/posts"
        className="flex items-center gap-2 self-start text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
      >
        <ArrowUturnLeftIcon className="h-4 w-4" />
        <span>목록으로</span>
      </Link>
      <h1 className="h-20 animate-pulse bg-gray-200 text-4xl text-gray-900 [word-break:keep-all] dark:text-gray-100"></h1>
      <span className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></span>
    </div>
  );
};

const PostPage = () => {
  return (
    <>
      <article className="flex flex-1 flex-col gap-16 p-4 lg:grid lg:grid-cols-3">
        <PostHeaderLoader />
        <div className="col-span-2">
          <div className="h-96 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </article>
    </>
  );
};

export default PostPage;
