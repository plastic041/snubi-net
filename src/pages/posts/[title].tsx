import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehyperSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { readFile, readdir } from "fs/promises";
import type { GetStaticPaths, GetStaticProps } from "next";
import PostLayout from "../../components/post-layout";
import { join } from "path";
import matter from "gray-matter";

const md2html = async (md: string) => {
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehyperSanitize)
    .use(rehypeStringify)
    .process(md);

  return html;
};

type Matter = {
  title: string;
  description: string;
  created_at: string;
  is_draft: boolean;
  // title: "첫 번째 글",
  // description: "첫 번째로 쓰는 글",
  // created_at: "2022-09-15",
  // is_draft: "false",
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
  const { content, data } = matter(text) as unknown as {
    content: string;
    data: Matter;
  };

  if (data.is_draft) {
    return {
      notFound: true,
    };
  }

  const html = await md2html(content);

  return {
    props: {
      html: String(html),
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
};
const PostPage = ({ html }: Props) => {
  return (
    <PostLayout>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </PostLayout>
  );
};

export default PostPage;
