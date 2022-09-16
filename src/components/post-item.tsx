import Link from "next/link";
import type { Frontmatter } from "~/typings/frontmatter";

type PostItemProps = {
  frontmatter: Frontmatter;
};
const PostItem = ({ frontmatter }: PostItemProps) => {
  return (
    <Link href={`/posts/${frontmatter.slug}`}>
      <a className="flex gap-2 flex-col p-4 transition-colors">
        <li>
          <h3 className="text-2xl font-bold">{frontmatter.title}</h3>
          <span className="text-gray-700">{frontmatter.description}</span>
        </li>
      </a>
    </Link>
  );
};

export default PostItem;
