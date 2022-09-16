import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehyperSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { readFile, readdir } from "fs/promises";
import type { GetStaticPaths, GetStaticProps } from "next";
import { join } from "path";
import matter from "gray-matter";
import Layout from "../../components/layout";

const md2html = async (md: string) => {
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehyperSanitize)
    .use(rehypeStringify)
    .process(md);

  return html;
};

type Frontmatter = {
  title: string;
  description: string;
  created_at: string;
  is_draft: boolean;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const title = context.params?.title as string | undefined;

  if (!title) {
    return {
      notFound: true,
    };
  }

  const postsPath = join(process.cwd(), "./src/posts/");
  const posts = await readdir(postsPath);
  const filename = posts.find((p) => p === `${title}.md`);

  if (!filename) {
    return {
      notFound: true,
    };
  }

  const text = await readFile(join(postsPath, filename), { encoding: "utf8" });
  const { content, data: frontmatter } = matter(text) as unknown as {
    content: string;
    data: Frontmatter;
  };

  if (frontmatter.is_draft) {
    return {
      notFound: true,
    };
  }

  const html = await md2html(content);

  return {
    props: {
      html: String(html),
      frontmatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsPath = join(process.cwd(), "./src/posts/");
  const posts = await readdir(postsPath);
  const paths = posts
    .map((p) => p.replace(".md", ""))
    .map((p) => ({
      params: { title: p },
    }));

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  html: string;
  frontmatter: Frontmatter;
};
const PostPage = ({ html, frontmatter }: Props) => {
  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-8 p-4 lg:grid lg:grid-cols-3">
        <div className="top-2 col-span-1 flex flex-col gap-2 self-start lg:sticky">
          <h1 className="break-words text-4xl font-extrabold [word-break:keep-all]">
            {frontmatter.title}
          </h1>
          <time dateTime={frontmatter.created_at}>
            {frontmatter.created_at}
          </time>
        </div>
        <div
          className="prose col-span-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
};

export default PostPage;
