import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import { Posts } from "~/components/post-list";
import { TagChips } from "~/components/tag-chips";
import type { Frontmatter } from "~/typings/frontmatter";
import type { Tag } from "~/typings/tags";

const getPosts = async () => {
  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const fms = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });
      const { data: fm } = matter(text);
      return fm as Frontmatter;
    })
  );

  const fmsPublished = fms.filter((fm) => !fm.is_draft);

  const flatTags = fmsPublished.map((fm) => fm.tags).flat();

  const tagsCounted = flatTags.reduce((acc, tag) => {
    const found = acc.find((accTag) => accTag.name === tag);

    if (found) {
      found.count += 1;
    } else {
      acc.push({ name: tag, count: 1 });
    }

    return acc;
  }, [] as Tag[]);

  const fmsDateSorted = fmsPublished.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    frontmatters: fmsDateSorted,
    tags: tagsCounted,
  };
};

const Page = async ({ searchParams }: { searchParams: { tag: string } }) => {
  const { frontmatters, tags } = await getPosts();

  const query = searchParams.tag;

  const filteredFms = frontmatters.filter((fm) => {
    if (query) {
      return fm.tags.includes(query as string);
    }

    return true;
  });

  return (
    <>
      <aside className="hidden flex-col p-8 lg:flex">
        <h1
          className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100"
          aria-hidden
        >
          글
        </h1>
        <TagChips tags={tags} query={query} />
      </aside>
      <div className="absolute inset-x-0 hidden border-b border-b-gray-500 lg:block"></div>
      <Posts fms={filteredFms} />
    </>
  );
};

export default Page;
