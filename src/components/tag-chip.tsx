import Link from "next/link";

type TagChipProps = {
  tag: string;
  count?: number;
  current?: boolean;
};
const TagChip = ({ tag, count, current }: TagChipProps) => {
  return (
    <Link href={tag === "모든 글" ? "/posts" : `/posts?tag=${tag}`}>
      <a
        className={`${
          current
            ? "border-blue-400 bg-blue-400 text-white dark:border-blue-600 dark:bg-blue-600"
            : "border-gray-400 bg-white text-gray-700 hover:bg-gray-200 dark:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600"
        } flex flex-row gap-2 rounded border px-2 py-1 text-sm font-medium transition-colors`}
      >
        <span>#{tag}</span>
        {count && <span className="tabular-nums">{count}</span>}
      </a>
    </Link>
  );
};

export default TagChip;
