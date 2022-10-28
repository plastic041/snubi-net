import { readFile, readdir } from "fs/promises";
import type { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { useRouter } from "next/router";
import { join } from "path";
import Layout from "~/components/layout";
import { OgHead } from "~/components/og";
import { Posts } from "~/components/post-list";
import { TagChips } from "~/components/tag-chips";
import type { Frontmatter } from "~/typings/frontmatter";
import { type Og } from "~/typings/og";
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

const og: Og = {
  title: "글 목록 | Snubi",
  description: "글 목록",
  image: "https://snubi-net.vercel.app/images/hero-cat.png",
  url: "https://snubi-net.vercel.app/posts",
};

type PageProps = {
  frontmatters: Frontmatter[];
  tags: Tag[];
};
const Page = ({ tags, frontmatters }: PageProps) => {
  const router = useRouter();
  const { tag: query } = router.query as { tag?: string };

  const filteredFms = frontmatters.filter((fm) => {
    if (query) {
      return fm.tags.includes(query as string);
    }

    return true;
  });

  return (
    <Layout>
      <OgHead og={og} />
      <aside className="hidden flex-col p-8 lg:flex">
        <h1
          className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100"
          aria-hidden
        >
          글
        </h1>
        <TagChips tags={tags} query={query} />
      </aside>
      <div className="absolute inset-x-0 hidden border-b border-b-gray-500 lg:block"></div>
      <Posts fms={filteredFms} />
    </Layout>
  );
};

export default Page;
