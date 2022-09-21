import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { Frontmatter } from "~/typings/frontmatter";

type PostHeaderProps = {
  frontmatter: Frontmatter;
};
const PostHeader = ({ frontmatter }: PostHeaderProps) => {
  return (
    <motion.div
      className="top-[5rem] col-span-1 -mt-8 flex flex-col gap-2 self-start lg:sticky"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href="/posts">
        <a className="transition-color flex items-center gap-2 self-start text-gray-500 duration-200 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400">
          <ArrowUturnLeftIcon className="h-4 w-4" />
          <span>목록으로</span>
        </a>
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
    </motion.div>
  );
};

export default PostHeader;
