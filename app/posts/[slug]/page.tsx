import { PostHeader } from "./post-header";
import { loadPosts } from "../load-posts";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const pages = loadPosts();
  const page = pages.find((page) => page.frontmatter.slug === params.slug);

  if (!page) {
    throw new Error("No page found");
  }

  return {
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    openGraph: {
      images: "https://snubi-net.vercel.app/images/hero-cat.png",
      url: `https://snubi-net.vercel.app/posts/${page.frontmatter.slug}`,
    },
    twitter: {
      images: "https://snubi-net.vercel.app/images/hero-cat.png",
    },
  };
};

const PostPage = ({ params }: { params: { slug: string } }) => {
  const pages = loadPosts();
  const page = pages.find((page) => page.frontmatter.slug === params.slug);

  if (!page) {
    throw new Error("No page found");
  }

  return (
    <>
      <article className="flex flex-1 flex-col gap-16 p-4 lg:grid lg:grid-cols-3">
        <PostHeader frontmatter={page.frontmatter} />
        <div className="prose relative col-span-2 flex flex-col whitespace-pre-wrap break-words [word-break:keep-all] dark:prose-invert [&_p+p]:mt-0 [&_pre>code]:rounded">
          {page.content}
        </div>
      </article>
    </>
  );
};

export default PostPage;
