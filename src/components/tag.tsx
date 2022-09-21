import Link from "next/link";

type TagProps = {
  tag: string;
  isAnchor?: boolean;
};
const Tag = ({ tag, isAnchor }: TagProps): React.ReactElement => {
  if (isAnchor) {
    return (
      <Link href={`/tags/${tag}`}>
        <a>
          <span className="rounded border border-gray-400 bg-white px-4 py-1 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 dark:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600">
            #{tag}
          </span>
        </a>
      </Link>
    );
  }
  return (
    <span className="rounded border border-gray-400 bg-white px-4 py-1 text-sm font-medium text-gray-500 transition-colors dark:border-gray-300 dark:bg-gray-800 dark:text-gray-300">
      #{tag}
    </span>
  );
};

export default Tag;
