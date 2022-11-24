import { nodeTypes } from "@mdx-js/mdx";
import { readFile, readdir } from "fs/promises";
import type { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import { join } from "path";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkTwoslash from "remark-shiki-twoslash";
import Layout from "~/components/layout";
import { OgHead } from "~/components/og";
import { PostHeader } from "~/components/post-header";
import { validateFrontmatter } from "~/lib/validate-fm";
import type { Frontmatter } from "~/typings/frontmatter";
import { type Og } from "~/typings/og";

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string | undefined;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const mdxSources = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });

      const mdxSource = await serialize(text, {
        mdxOptions: {
          rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
          remarkPlugins: [remarkGfm, [remarkTwoslash, { theme: "dracula" }]],
        },
        parseFrontmatter: true,
      });

      return mdxSource;
    })
  );

  const mdxSource = mdxSources.find(
    (source) => source.frontmatter?.slug === slug
  );

  if (!mdxSource) {
    return {
      notFound: true,
    };
  }

  const fm = mdxSource.frontmatter;
  const isValid = validateFrontmatter(fm);

  if (!isValid) {
    return {
      notFound: true,
    };
  }

  if (fm.is_draft) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mdxSource,
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
      const { frontmatter } = (await serialize(text, {
        parseFrontmatter: true,
      })) as unknown as {
        frontmatter: Frontmatter;
      };

      return frontmatter;
    })
  );

  const fmsPublished = fms.filter((fm) => !fm.is_draft);

  const paths = fmsPublished.map((fm) => ({
    params: { slug: fm.slug },
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
  mdxSource: MDXRemoteSerializeResult & { frontmatter: Frontmatter };
};
const PostPage = ({ mdxSource }: Props) => {
  const og: Og = {
    title: `${mdxSource.frontmatter.title} | Snubi`,
    description: mdxSource.frontmatter.description,
    image: "https://snubi-net.vercel.app/images/hero-cat.png",
    url: `https://snubi-net.vercel.app/posts/${mdxSource.frontmatter.slug}`,
  };

  return (
    <Layout>
      <OgHead og={og} />
      <article className="flex flex-1 flex-col gap-16 p-4 lg:grid lg:grid-cols-3">
        <PostHeader frontmatter={mdxSource.frontmatter} />
        <div className="prose relative col-span-2 flex flex-col whitespace-pre-wrap break-words [word-break:keep-all] dark:prose-invert [&_p+p]:mt-0 [&_pre>code]:rounded">
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </article>
    </Layout>
  );
};

export default PostPage;
