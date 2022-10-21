import { readFile, readdir } from "fs/promises";
import type { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import { join } from "path";
import Layout from "~/components/layout";
import PostItem from "~/components/post-list-item";
import TagChip from "~/components/tag-chip";
import type { Frontmatter } from "~/typings/frontmatter";
import type { Tag } from "~/typings/tags";

export const getStaticProps: GetStaticProps = async () => {
  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const fms = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });
      const { frontmatter } = (await serialize(text, {
        parseFrontmatter: true,
      })) as unknown as {
        frontmatter: Frontmatter;
      };

      return frontmatter;
    })
  );

  const fmsPublished = fms.filter((fm) => !fm.is_draft);

  const flatTags = fmsPublished.map((fm) => fm.tags).flat();

  const tagsCounted = flatTags.reduce((acc, tag) => {
    const found = acc.find((accTag) => accTag.name === tag);

    if (found) {
      found.count += 1;
    } else {
      acc.push({ name: tag, count: 1 });
    }

    return acc;
  }, [] as Tag[]);

  const fmsDateSorted = fmsPublished.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    props: {
      frontmatters: fmsDateSorted,
      tags: tagsCounted,
    },
  };
};

type PageProps = {
  frontmatters: Frontmatter[];
  tags: Tag[];
};
const Posts = ({ tags, frontmatters }: PageProps) => {
  const title = `글 목록 | Snubi`;
  const description = `글 목록`;

  const router = useRouter();
  const { tag: tagQuery } = router.query;

  const filteredFms = frontmatters.filter((fm) => {
    if (tagQuery) {
      return fm.tags.includes(tagQuery as string);
    }

    return true;
  });

  return (
    <Layout title={title} description={description}>
      <aside className="hidden flex-col p-8 lg:flex">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          글
        </h1>
        <ul className="flex gap-2">
          <li key="all">
            <TagChip
              tag="모든 글"
              count={frontmatters.length}
              current={!tagQuery}
            />
          </li>
          {tags.map((tag) => (
            <li key={tag.name}>
              <TagChip
                tag={tag.name}
                count={tag.count}
                current={tag.name === tagQuery}
              />
            </li>
          ))}
        </ul>
      </aside>
      <div className="absolute inset-x-0 hidden border-b border-b-gray-500 lg:block"></div>
      <ul className="flex flex-col gap-12 p-8">
        {filteredFms.map((fm) => (
          <PostItem frontmatter={fm} key={fm.title} />
        ))}
      </ul>
    </Layout>
  );
};

export default Posts;
