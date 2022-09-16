import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import type { GetStaticProps } from "next";
import { join } from "path";
import Layout from "~/components/layout";
import PostItem from "~/components/post-item";
import type { Frontmatter } from "~/typings/frontmatter";

export const getStaticProps: GetStaticProps = async () => {
  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const frontmattersAll = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });
      const { data: frontmatter } = matter(text) as unknown as {
        data: Frontmatter;
      };

      return frontmatter;
    })
  );

  const frontmattersPublished = frontmattersAll.filter(
    (frontmatter) => !frontmatter.is_draft
  );

  return {
    props: {
      frontmatters: frontmattersPublished,
    },
  };
};

type PageProps = {
  frontmatters: Frontmatter[];
};
const Posts = ({ frontmatters }: PageProps) => {
  const title = `글 목록 | Snubi.net`;
  const description = `Snubi.net의 글 목록`;

  return (
    <Layout title={title} description={description}>
      <ul className="flex flex-col">
        {frontmatters.map((frontmatter) => (
          <PostItem frontmatter={frontmatter} key={frontmatter.title} />
        ))}
      </ul>
    </Layout>
  );
};

export default Posts;
