import Tag from "./tag";
import Link from "next/link";
import type { Frontmatter } from "~/typings/frontmatter";

type PostItemProps = {
  frontmatter: Frontmatter;
};
const PostItem = ({ frontmatter }: PostItemProps) => {
  return (
    <li className="flex">
      <Link href={`/posts/${frontmatter.slug}`}>
        <a className="flex flex-col rounded-lg p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 lg:p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {frontmatter.title}
          </h3>
          <span className="mb-2 text-gray-700 dark:text-gray-200">
            {frontmatter.description}
          </span>
          <time
            className="text-gray-700 dark:text-gray-200"
            dateTime={frontmatter.created_at}
          >
            {frontmatter.created_at}
          </time>
          <div className="flex flex-row gap-1">
            {frontmatter.tags.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
