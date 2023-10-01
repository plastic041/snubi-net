import { PostHeader } from "./post-header";
import { loadPosts } from "../load-posts";
import type { Metadata } from "next";
import rehypeShikiji from "rehype-shikiji";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const posts = await loadPosts();
  const post = posts.find((p) => p.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return {
    title: `${post.title} - Snubi.net`,
    description: post.description,
    openGraph: {
      images: "https://snubi-net.vercel.app/images/hero-cat.png",
      url: `https://snubi-net.vercel.app/posts/${post.id}`,
    },
    twitter: {
      images: "https://snubi-net.vercel.app/images/hero-cat.png",
    },
  };
};

const PostPage = async ({ params }: { params: { id: string } }) => {
  const pages = await loadPosts();
  const post = pages.find((page) => page.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="flex flex-1 flex-col gap-16 p-4 lg:grid lg:grid-cols-3">
        <PostHeader post={post} />
        <div
          className={`
            prose relative col-span-2 flex max-w-full flex-col whitespace-pre-wrap break-words break-keep
            dark:prose-invert prose-blockquote:flex prose-blockquote:flex-col prose-pre:bg-white prose-pre:text-gray-900
            prose-ol:flex prose-ol:flex-col
            prose-ul:flex prose-ul:flex-col prose-pre:dark:bg-gray-900 prose-pre:dark:text-gray-100
          `}
        >
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    // @ts-ignore
                    rehypeShikiji,
                    {
                      themes: {
                        light: "vitesse-light",
                        dark: "vitesse-dark",
                      },
                    },
                  ],
                ],
              },
              // If you use `MDXProvider`, uncomment the following line.
              // providerImportSource: "@mdx-js/react",
            }}
          />
        </div>
      </article>
    </>
  );
};

export default PostPage;
