import Link from "next/link";
import type { Post } from "./load-posts";
import dayjs from "dayjs";

const PostItem = ({ post }: { post: Post }) => {
  const createdAt = dayjs(post.createdAt).format("YYYY년 M월 D일");

  return (
    <li className="flex flex-col">
      <Link
        href={`/posts/${post.id}`}
        className="group flex flex-col rounded p-4 shadow transition-shadow hover:shadow-md"
      >
        <section className="flex flex-col rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-500 dark:text-gray-100 group-hover:dark:text-blue-300">
            {post.title}
          </h3>
          <span className="mb-2 text-gray-700 dark:text-gray-200">
            {post.description}
          </span>
          <time
            className="mb-2 text-gray-700 dark:text-gray-200"
            dateTime={createdAt}
          >
            {createdAt}
          </time>
        </section>
      </Link>
    </li>
  );
};

type PageProps = {
  posts: Post[];
};
export const Posts = ({ posts }: PageProps) => {
  return (
    <ul className="flex flex-col gap-12 p-4" aria-label="글 목록">
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </ul>
  );
};
