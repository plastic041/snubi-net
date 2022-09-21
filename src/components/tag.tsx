type TagProps = {
  tag: React.ReactNode;
};
const Tag = ({ tag: children }: TagProps): React.ReactElement => {
  return (
    <span className="rounded border border-gray-400 bg-white text-sm font-medium text-gray-500 dark:border-gray-300 dark:bg-gray-800 dark:text-gray-300">
      px-4 py-1 #{children}
    </span>
  );
};

export default Tag;
