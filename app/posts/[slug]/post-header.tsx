"use client";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { TagChip } from "~/components/tag-chips";
import { Frontmatter } from "~/typings/frontmatter";

type PostHeaderProps = {
  frontmatter: Frontmatter;
};
const PostHeader = ({ frontmatter }: PostHeaderProps) => {
  return (
    <motion.div
      className="top-[5rem] col-span-1 flex flex-col gap-4 self-start lg:sticky lg:-mt-8"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href="/posts"
        className="text-g-500 flex items-center gap-2 self-start transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <ArrowUturnLeftIcon className="h-4 w-4" />
        <span>목록으로</span>
      </Link>
      <h1 className="text-g-900 break-words text-4xl font-extrabold [word-break:keep-all]">
        {frontmatter.title}
      </h1>
      <p className="text-g-700 hidden lg:block">{frontmatter.description}</p>
      <time dateTime={frontmatter.created_at} className="text-g-700">
        {frontmatter.created_at}
      </time>
      <div className="flex flex-row gap-1">
        {frontmatter.tags.map((name) => {
          const tag = {
            name,
            count: 0,
          };
          return <TagChip tag={tag} key={name} hideCount current={false} />;
        })}
      </div>
    </motion.div>
  );
};

export default PostHeader;
