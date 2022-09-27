import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/future/image";
import { join } from "path";
import Layout from "~/components/layout";
import PostHeader from "~/components/post-header";
import type { Frontmatter } from "~/typings/frontmatter";

export const getStaticProps: GetStaticProps = async (context) => {
  const title = context.params?.title as string | undefined;

  if (!title) {
    return {
      notFound: true,
    };
  }

  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const postsAll = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });
      const { data: frontmatter } = matter(text) as unknown as {
        data: Frontmatter;
      };

      return {
        filename,
        frontmatter,
      };
    })
  );

  const post = postsAll.find(({ frontmatter }) => frontmatter.slug === title);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const text = await readFile(join(postsPath, post.filename), {
    encoding: "utf8",
  });
  const { content, data: frontmatter } = matter(text) as unknown as {
    content: string;
    data: Frontmatter;
  };

  if (frontmatter.is_draft) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(content);

  return {
    props: {
      source: mdxSource,
      frontmatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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

  const paths = frontmattersPublished.map((fm) => ({
    params: { title: fm.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
const components = {
  Image: ({ src, alt, width, height }: ImageProps) => (
    <Image
      alt={alt}
      src={src}
      width={width || 512}
      height={height || 512}
      style={{
        maxHeight: `${height || 512}px`,
        maxWidth: `${width || 512}px`,
      }}
      className="rounded object-contain"
    />
  ),
};

type Props = {
  source: MDXRemoteSerializeResult;
  frontmatter: Frontmatter;
};
const PostPage = ({ source, frontmatter }: Props) => {
  const title = `${frontmatter.title} | Snubi`;

  return (
    <Layout title={title} description={frontmatter.description}>
      <article className="flex flex-1 flex-col gap-16 p-4 lg:grid lg:grid-cols-3">
        <PostHeader frontmatter={frontmatter} />
        <div className="prose relative col-span-2 flex flex-col whitespace-pre-wrap break-words [word-break:keep-all] dark:prose-invert [&_p+p]:mt-0 [&_p+p]:indent-2">
          <MDXRemote {...source} components={components} />
        </div>
      </article>
    </Layout>
  );
};

export default PostPage;
