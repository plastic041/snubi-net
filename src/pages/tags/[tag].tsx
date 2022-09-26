import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { join } from "path";
import Layout from "~/components/layout";
import PostItem from "~/components/post-list-item";
import { Frontmatter } from "~/typings/frontmatter";

export const getStaticProps: GetStaticProps = async (context) => {
  const tag = context.params?.tag;

  if (!tag || typeof tag !== "string") {
    return {
      notFound: true,
    };
  }

  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const posts = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });
      const { data: frontmatter } = matter(text) as unknown as {
        data: Frontmatter;
      };

      return {
        fm: frontmatter,
      };
    })
  );

  const postsWithTag = posts
    .filter(({ fm }) => !fm.is_draft)
    .filter(({ fm }) => fm.tags.includes(tag))
    .map(({ fm }) => fm);

  return {
    props: {
      posts: postsWithTag,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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

  const paths = fms
    .filter((fm) => !fm.is_draft)
    .flatMap((fm) => fm.tags)
    .map((tag) => ({ params: { tag } }));

  return {
    paths: [...new Set(paths)],
    fallback: false,
  };
};

type TagPageProps = {
  posts: Frontmatter[];
};
const TagPage = ({ posts }: TagPageProps) => {
  const router = useRouter();
  const { tag } = router.query;

  const title = `${tag} 태그를 가진 글 | snubi`;
  const description = `${tag} 태그를 가진 글`;

  return (
    <Layout title={title} description={description}>
      <>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          {tag} 태그를 가진 글
        </h1>
        <ul className="flex flex-col px-4 lg:px-0">
          {posts.map((post) => (
            <PostItem frontmatter={post} key={post.title} />
          ))}
        </ul>
      </>
    </Layout>
  );
};

export default TagPage;
