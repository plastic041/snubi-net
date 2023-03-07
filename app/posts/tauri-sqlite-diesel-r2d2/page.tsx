import TauriPost, {
  // @ts-expect-error
  fm as tauriFm,
} from "app/../posts/tauri-sqlite-diesel-r2d2.mdx";
import { PostHeader } from "./post-header";
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: tauriFm.title,
    description: tauriFm.description,
    openGraph: {
      images: "https://snubi-net.vercel.app/images/hero-cat.png",
      url: `https://snubi-net.vercel.app/posts/${tauriFm.slug}`,
    },
    twitter: {
      images: "https://snubi-net.vercel.app/images/hero-cat.png",
    },
  };
};

const PostPage = () => {
  return (
    <>
      <article className="flex flex-1 flex-col gap-16 p-4 lg:grid lg:grid-cols-3">
        <PostHeader frontmatter={tauriFm} />
        <div className="prose relative col-span-2 flex flex-col whitespace-pre-wrap break-words [word-break:keep-all] dark:prose-invert [&_p+p]:mt-0 [&_pre>code]:rounded">
          <TauriPost />
        </div>
      </article>
    </>
  );
};

export default PostPage;
