import Link from "next/link";
import { TagChip } from "~/components/tag-chips";
import type { Frontmatter } from "~/typings/frontmatter";

type PostItemProps = {
  frontmatter: Frontmatter;
};
const PostItem = ({ frontmatter }: PostItemProps) => {
  return (
    <li className="flex flex-col">
      <section className="flex flex-col rounded-lg">
        <Link href={`/posts/${frontmatter.slug}`}>
          <a className="group flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-500 dark:text-gray-100 group-hover:dark:text-blue-300">
              {frontmatter.title}
            </h3>
            <span className="mb-2 text-gray-700 dark:text-gray-200">
              {frontmatter.description}
            </span>
            <time
              className="mb-2 text-gray-700 dark:text-gray-200"
              dateTime={frontmatter.created_at}
            >
              {frontmatter.created_at}
            </time>
          </a>
        </Link>
        <div className="flex flex-row gap-2">
          {frontmatter.tags.map((name) => {
            const tag = {
              name,
              count: 0,
            };
            return <TagChip tag={tag} key={name} hideCount current={false} />;
          })}
        </div>
      </section>
    </li>
  );
};

type PageProps = {
  fms: Frontmatter[];
};
export const Posts = ({ fms }: PageProps) => {
  return (
    <ul className="flex flex-col gap-12 p-8" aria-label="글 목록">
      {fms.map((fm) => (
        <PostItem frontmatter={fm} key={fm.title} />
      ))}
    </ul>
  );
};
