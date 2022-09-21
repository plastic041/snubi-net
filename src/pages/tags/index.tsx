import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import type { GetStaticProps } from "next";
import { join } from "path";
import Layout from "~/components/layout";
import Tag from "~/components/tag";
import type { Frontmatter } from "~/typings/frontmatter";

export const getStaticProps: GetStaticProps = async () => {
  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const fms = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });
      const { data: fm } = matter(text) as unknown as {
        data: Frontmatter;
      };

      return fm;
    })
  );

  const flatTags = fms
    .filter((fm) => !fm.is_draft)
    .map((fm) => fm.tags)
    .flat();

  // count tags like { name: "tag", count: 1 }[];
  const tagsCounted = flatTags.reduce((acc, tag) => {
    const found = acc.find((accTag) => accTag.name === tag);

    if (found) {
      found.count += 1;
    } else {
      acc.push({ name: tag, count: 1 });
    }

    return acc;
  }, [] as { name: string; count: number }[]);

  return {
    props: {
      tags: tagsCounted,
    },
  };
};

type PageProps = {
  tags: { name: string; count: number }[];
};
const TagsPage = ({ tags }: PageProps) => {
  return (
    <Layout title="tags | snubi" description="tags">
      <>
        <h1 className="mb-8 text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Tags
        </h1>
        <ul className="flex gap-8">
          {tags.map((tag) => (
            <li key={tag.name} className="flex items-center gap-2">
              <a href={`/tags/${tag.name}`}>
                <Tag tag={tag.name} />
              </a>
              <span
                title={`${tag.name} 태그를 가진 글 수`}
                className="text-sm text-gray-700 dark:text-gray-200"
              >
                {tag.count}
              </span>
            </li>
          ))}
        </ul>
      </>
    </Layout>
  );
};

export default TagsPage;
