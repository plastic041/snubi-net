import Link from "next/link";
import { type Tag } from "~/typings/tags";

type TagChipProps = {
  tag: Tag;
  current: boolean;
  hideCount?: boolean;
};
export const TagChip = ({ tag, current, hideCount }: TagChipProps) => {
  return (
    <Link
      href={tag.name === "모든 글" ? "/posts" : `/posts?tag=${tag.name}`}
      className="flex flex-row gap-2 rounded border border-gray-400 bg-white px-2 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 [&[aria-current='true']]:border-blue-400 [&[aria-current='true']]:bg-blue-400 [&[aria-current='true']]:text-white [&[aria-current='true']]:dark:border-blue-600 [&[aria-current='true']]:dark:bg-blue-600"
    >
      <a aria-current={current}>
        <span>#{tag.name}</span>
        {!hideCount && <span className="tabular-nums">{tag.count}</span>}
      </a>
    </Link>
  );
};

type TagChipsProps = {
  tags: Tag[];
  query?: string;
};
export const TagChips = ({ tags, query }: TagChipsProps) => {
  const tagsAll: Tag = {
    name: "모든 글",
    count: tags.length,
  };
  return (
    <ul className="flex gap-2">
      <li key="all">
        <TagChip tag={tagsAll} current={!query} />
      </li>
      {tags.map((tag) => (
        <li key={tag.name}>
          <TagChip tag={tag} current={tag.name === query} />
        </li>
      ))}
    </ul>
  );
};
