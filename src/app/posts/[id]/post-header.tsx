import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { Post } from "../load-posts";
import dayjs from "dayjs";

type PostHeaderProps = {
  post: Post;
};
export const PostHeader = ({ post }: PostHeaderProps) => {
  const createdAt = dayjs(post.createdAt).format("YYYY년 M월 D일");

  return (
    <div className="top-[5rem] col-span-1 flex flex-col gap-4 self-start lg:sticky">
      <Link
        href="/posts"
        className="flex items-center gap-2 self-start text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
      >
        <ArrowUturnLeftIcon className="h-4 w-4" />
        <span>목록으로</span>
      </Link>
      <h1 className="break-words text-4xl font-extrabold text-gray-900 [word-break:keep-all] dark:text-gray-100">
        {post.title}
      </h1>
      <p className="hidden text-gray-700 dark:text-gray-200 lg:block">
        {post.description}
      </p>
      <time className="text-gray-700 dark:text-gray-200" dateTime={createdAt}>
        {createdAt}
      </time>
    </div>
  );
};
