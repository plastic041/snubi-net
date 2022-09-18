import Link from "next/link";
import type { Frontmatter } from "~/typings/frontmatter";

type PostItemProps = {
  frontmatter: Frontmatter;
};
const PostItem = ({ frontmatter }: PostItemProps) => {
  return (
    <Link href={`/posts/${frontmatter.slug}`}>
      <a className="p-8 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        <li className="flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {frontmatter.title}
          </h3>
          <span className="text-gray-700 dark:text-gray-200 mb-2">
            {frontmatter.description}
          </span>
          <time
            className="text-gray-700 dark:text-gray-200"
            dateTime={frontmatter.created_at}
          >
            {frontmatter.created_at}
          </time>
        </li>
      </a>
    </Link>
  );
};

export default PostItem;
