import { Posts } from "./post-list";
import { loadPosts } from "./load-posts";
import type { Metadata } from "next";

export const revalidate = 60 * 60 * 24; // 24 hours

export const metadata: Metadata = {
  title: "Snubi.net - 글",
  description: "Snubi.net의 글 목록입니다.",
  openGraph: {
    images: "https://snubi-net.vercel.app/images/hero-cat.png",
    url: "https://snubi-net.vercel.app/posts",
  },
  twitter: {
    images: "https://snubi-net.vercel.app/images/hero-cat.png",
  },
};

const Page = async () => {
  const posts = await loadPosts();

  return (
    <>
      <aside className="hidden flex-col p-8 lg:flex">
        <h1
          className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100"
          aria-hidden
        >
          글
        </h1>
      </aside>
      <div className="absolute inset-x-0 hidden border-b border-b-gray-500 lg:block"></div>
      <Posts posts={posts} />
    </>
  );
};

export default Page;
