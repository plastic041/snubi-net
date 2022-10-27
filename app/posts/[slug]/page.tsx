import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import PostHeader from "~/components/post-header";
import type { Frontmatter } from "~/typings/frontmatter";

const getPost = async (slug: string) => {
  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const posts = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });

      const { data: fm, content } = matter(text);

      const html = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(content);

      return {
        html: String(html),
        fm: fm as Frontmatter,
      };
    })
  );

  const post = posts.find((p) => p.fm.slug === slug)!;

  return post;
};

export const generateStaticParams = async () => {
  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const fms = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });
      const { data: fm } = matter(text);

      return fm;
    })
  );

  const fmsPublished = fms.filter((fm) => !fm.is_draft);

  const paths = fmsPublished.map((fm) => ({
    slug: fm.slug,
  }));

  return paths;
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);

  return (
    <article className="flex flex-1 flex-col gap-16 p-4 lg:grid lg:grid-cols-3">
      <PostHeader frontmatter={post.fm} />
      <div
        className="prose relative col-span-2 flex flex-col whitespace-pre-wrap break-words [word-break:keep-all] dark:prose-invert [&_p+p]:mt-0 [&_pre>code]:rounded"
        dangerouslySetInnerHTML={{
          __html: post.html,
        }}
      >
        {/* <MDXRemote {...mdxSource} components={components} /> */}
      </div>
    </article>
  );
};

export default PostPage;
