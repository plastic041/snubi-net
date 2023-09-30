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
  const pages = await loadPosts();
  const page = pages.find((page) => page.id.toString() === params.id);

  if (!page) {
    notFound();
  }

  return {
    title: `${page.title} - Snubi.net`,
    description: page.description,
    openGraph: {
      images: "https://snubi-net.vercel.app/images/hero-cat.png",
      url: `https://snubi-net.vercel.app/posts/${page.id}`,
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
        <div className="prose relative col-span-2 flex max-w-full flex-col whitespace-pre-wrap break-words [word-break:keep-all] dark:prose-invert [&_p+p]:mt-0 [&_pre>code]:rounded">
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
