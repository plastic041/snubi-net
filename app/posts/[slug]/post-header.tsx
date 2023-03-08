import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Frontmatter } from "~/typings/frontmatter";

type PostHeaderProps = {
  frontmatter: Frontmatter;
};
export const PostHeader = ({ frontmatter }: PostHeaderProps) => {
  return (
    <div className="top-[5rem] col-span-1 flex animate-fade-in-down flex-col gap-4 self-start lg:sticky">
      <Link
        href="/posts"
        className="flex items-center gap-2 self-start text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
      >
        <ArrowUturnLeftIcon className="h-4 w-4" />
        <span>목록으로</span>
      </Link>
      <h1 className="break-words text-4xl font-extrabold text-gray-900 [word-break:keep-all] dark:text-gray-100">
        {frontmatter.title}
      </h1>
      <p className="hidden text-gray-700 dark:text-gray-200 lg:block">
        {frontmatter.description}
      </p>
      <time
        dateTime={frontmatter.created_at}
        className="text-gray-700 dark:text-gray-200"
      >
        {frontmatter.created_at}
      </time>
    </div>
  );
};
