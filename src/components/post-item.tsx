import Link from "next/link";
import type { Frontmatter } from "~/typings/frontmatter";

type PostItemProps = {
  frontmatter: Frontmatter;
};
const PostItem = ({ frontmatter }: PostItemProps) => {
  return (
    <Link href={`/posts/${frontmatter.slug}`}>
      <a className="flex gap-2 flex-col p-8 transition-colors rounded-lg hover:bg-gray-100">
        <li>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {frontmatter.title}
          </h3>
          <span className="text-gray-700 dark:text-gray-300">
            {frontmatter.description}
          </span>
        </li>
      </a>
    </Link>
  );
};

export default PostItem;
