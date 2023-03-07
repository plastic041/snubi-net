import { Posts } from "~/components/post-list";
import { loadPosts } from "./load-posts";

const Page = () => {
  const posts = loadPosts();
  const fms = posts.map((post) => post.frontmatter);

  return (
    <>
      <aside className="hidden flex-col p-8 lg:flex">
        <h1
          className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100"
          aria-hidden
        >
          글
        </h1>
      </aside>
      <div className="absolute inset-x-0 hidden border-b border-b-gray-500 lg:block"></div>
      <Posts fms={fms} />
    </>
  );
};

export default Page;
